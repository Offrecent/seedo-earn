
'use client';
import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { verifyPaymentAndCreateUser } from '@/ai/flows/payment-flow';
import { useToast } from '@/components/ui/use-toast';


const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Fill Details', 'Pay', 'Verify'];
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index + 1 < currentStep
                ? 'bg-primary text-primary-foreground'
                : index + 1 === currentStep
                ? 'bg-primary border-2 border-primary-foreground ring-2 ring-primary'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {index + 1 < currentStep ? <CheckCircle size={20} /> : index + 1}
          </div>
          <p className={`mt-2 text-sm ${index + 1 <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>{step}</p>
          {index < steps.length - 1 && (
            <div className="absolute top-4 left-1/2 w-full h-0.5 bg-muted -translate-x-1/2">
                <div className={`h-0.5 ${ index + 1 < currentStep ? 'bg-primary' : 'bg-muted'}`} style={{width: 'calc(100% - 2rem)'}}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    gender: '',
    email: '',
    phone: '',
    whatsapp: '',
    referralCode: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setFormData((prev) => ({ ...prev, referralCode: ref }));
    }
  }, [searchParams]);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'username') {
      setUsernameStatus('checking');
      // debounce this in a real app
      setTimeout(() => {
        if (value.length > 3) {
          setUsernameStatus(value === 'takenuser' ? 'taken' : 'available');
        } else {
          setUsernameStatus('idle');
        }
      }, 1000);
    }
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreedToTerms) {
        setError("You must agree to the Terms and Conditions to proceed.");
        return;
    }
    
    startTransition(() => {
        setStep(2); // Move to payment step
    });
  };
  
    const flutterwaveConfig = {
      public_key: 'FLWPUBK-1fb69b0ab36fbfbb5de021819aa12b9c-X',
      tx_ref: Date.now().toString(),
      amount: 3000,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: formData.email,
        phone_number: formData.phone,
        name: formData.fullName,
      },
      customizations: {
        title: 'Seedo Subscription',
        description: 'Monthly subscription for Seedo',
        logo: 'https://www.seedo.com/logo.png', // Replace with your logo
      },
    };

    const handleFlutterwavePayment = useFlutterwave(flutterwaveConfig);

    const handlePayment = () => {
        handleFlutterwavePayment({
            callback: (response) => {
                console.log(response);
                if (response.status === 'successful' && response.transaction_id) {
                    setStep(3); // Move to verification step
                    startTransition(async () => {
                        try {
                             const result = await verifyPaymentAndCreateUser({
                                transactionId: String(response.transaction_id),
                                userData: {
                                    fullName: formData.fullName,
                                    username: formData.username,
                                    gender: formData.gender,
                                    email: formData.email,
                                    phone: formData.phone,
                                    whatsapp: formData.whatsapp,
                                    referralCode: formData.referralCode,
                                    password: formData.password,
                                }
                            });

                            if (result.success) {
                               // The UI already shows success, maybe just a toast
                               toast({
                                   title: "Verification Complete",
                                   description: "Your account has been created.",
                               });
                            } else {
                                setError(result.message || "An unknown error occurred during verification.");
                                setStep(2); // Go back to payment step on error
                            }
                        } catch (e: any) {
                             setError(e.message || "An unexpected error occurred.");
                             setStep(2);
                        }
                    });
                } else {
                    setError('Payment was not successful. Please try again.');
                }
                closePaymentModal();
            },
            onClose: () => {
                // This is called when the user closes the payment modal
                console.log('Payment modal closed');
            },
        });
    }

  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center h-14 max-w-screen-2xl">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg">Seedo</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm ml-auto">
             <Link
              href="/login"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Login
            </Link>
            <Button asChild variant="outline" size="sm">
                <Link href="/">Back to Home</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Create your Seedo Account</CardTitle>
            <CardDescription>Join the community and start earning.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
                 <StepIndicator currentStep={step} />
            </div>

            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" name="fullName" required onChange={handleInputChange} value={formData.fullName} disabled={isPending}/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <div className="relative">
                            <Input id="username" name="username" required onChange={handleInputChange} value={formData.username} disabled={isPending}/>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {usernameStatus === 'checking' && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                                {usernameStatus === 'available' && <CheckCircle className="h-5 w-5 text-green-500" />}
                                {usernameStatus === 'taken' && <AlertCircle className="h-5 w-5 text-destructive" />}
                            </div>
                        </div>
                         {usernameStatus === 'taken' && <p className="text-sm text-destructive">Username is already taken.</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" required onChange={handleInputChange} value={formData.email} disabled={isPending}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select name="gender" onValueChange={handleGenderChange} required value={formData.gender} disabled={isPending}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" required onChange={handleInputChange} value={formData.phone} disabled={isPending}/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp Number</Label>
                        <Input id="whatsapp" name="whatsapp" type="tel" required onChange={handleInputChange} value={formData.whatsapp} disabled={isPending}/>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                    <Input id="referralCode" name="referralCode" onChange={handleInputChange} value={formData.referralCode} disabled={isPending}/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input id="password" name="password" type={showPassword ? 'text' : 'password'} required onChange={handleInputChange} value={formData.password} disabled={isPending}/>
                            <Button type="button" variant="ghost" size="icon" className="absolute inset-y-0 right-0 h-full" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                            <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required onChange={handleInputChange} value={formData.confirmPassword} disabled={isPending}/>
                            <Button type="button" variant="ghost" size="icon" className="absolute inset-y-0 right-0 h-full" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} disabled={isPending} />
                    <Label htmlFor="terms" className="text-sm">
                        I agree to the 
                        <Dialog>
                            <DialogTrigger asChild>
                               <Button variant="link" className="p-1 h-auto">Terms and Conditions</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
                                <DialogHeader>
                                    <DialogTitle>Terms and Conditions</DialogTitle>
                                    <DialogDescription>Please review the terms and conditions before proceeding.</DialogDescription>
                                </DialogHeader>
                                <div className="flex-grow overflow-y-auto pr-4">
                                   <div className="prose prose-sm dark:prose-invert max-w-none">
                                        <TermsContent />
                                   </div>
                                </div>
                                 <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" onClick={() => setAgreedToTerms(true)}>Accept & Close</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </Label>
                </div>

                <Button type="submit" className="w-full" disabled={isPending || !agreedToTerms || usernameStatus === 'taken' || usernameStatus === 'checking'}>
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Proceed to Payment
                </Button>
              </form>
            )}
             {step === 2 && (
                <div className="text-center space-y-4">
                    <h3 className="text-xl font-semibold">Complete Your Registration</h3>
                    <p className="text-muted-foreground">A monthly subscription fee of ₦3,000 is required to activate your account.</p>
                    <div className="p-6 bg-muted rounded-lg">
                        <p className="text-sm">You are about to pay</p>
                        <p className="text-4xl font-bold">₦3,000</p>
                    </div>
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Next Steps</AlertTitle>
                        <AlertDescription>
                            You will be redirected to our secure payment partner, Flutterwave, to complete the transaction.
                        </AlertDescription>
                    </Alert>
                    <Button onClick={handlePayment} className="w-full" size="lg">
                        Pay with Flutterwave
                    </Button>
                     <Button variant="outline" className="w-full" onClick={() => setStep(1)} disabled={isPending}>
                        Back to Form
                    </Button>
                </div>
            )}
            {step === 3 && (
                 <div className="text-center space-y-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">Registration Almost Complete!</h3>
                    { isPending ? (
                        <>
                         <p className="text-muted-foreground">Verifying your payment... please wait.</p>
                         <Loader2 className="mr-2 h-8 w-8 animate-spin mx-auto" />
                        </>
                    ) : (
                        <>
                             <p className="text-muted-foreground">Welcome to the Seedo community. Your account is now active.</p>
                             <Alert className="text-left bg-green-500/10 border-green-500/50">
                                <CheckCircle className="h-4 w-4" />
                                <AlertTitle>Welcome Bonus Added!</AlertTitle>
                                <AlertDescription>
                                   A welcome bonus of <strong>₦4,500</strong> has been credited to your account. This bonus is locked until you successfully refer 3 valid users.
                                </AlertDescription>
                            </Alert>
                            <div className="space-y-2">
                                <Button className="w-full" size="lg" onClick={() => router.push('/dashboard')}>
                                    Go to Dashboard
                                </Button>
                                 <Button variant="secondary" className="w-full">
                                    <a href="#" target="_blank" rel="noopener noreferrer">Join WhatsApp Group</a>
                                </Button>
                            </div>
                        </>
                    )}
                 </div>
            )}
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
             <p>Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link></p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

function TermsContent() {
    return (
        <>
        <section>
            <h2 className="text-lg font-semibold">1. Introduction</h2>
            <p>Welcome to Seedo. These Terms and Conditions govern your use of our platform and services. By registering on Seedo, you agree to comply with and be bound by these terms.</p>
        </section>
        <section>
            <h2 className="text-lg font-semibold mt-4">2. Subscription Policy</h2>
            <p>Access to the Seedo earning platform requires an active monthly subscription of <strong>₦3,000</strong>. This fee grants you access to daily tasks, raffles, and all other earning features for the subscription period. Subscriptions are recurring and must be renewed monthly to maintain access.</p>
        </section>
        <section>
            <h2 className="text-lg font-semibold mt-4">3. Welcome Bonus</h2>
            <p>Upon successful registration and payment, a welcome bonus of <strong>₦4,500</strong> will be credited to your account. This bonus is initially locked. To unlock the bonus and make it available for withdrawal, you must successfully refer a minimum of <strong>three (3)</strong> valid users who complete their registration and subscription payment.</p>
        </section>
        <section>
            <h2 className="text-lg font-semibold mt-4">4. Raffle Rules</h2>
             <ul className="list-disc pl-6 space-y-2">
              <li>Raffle tickets can be purchased for <strong>₦1,000</strong> each.</li>
              <li>Each ticket requires you to select a unique number between <strong>1 and 5,000</strong>.</li>
              <li>The number of tickets a user can purchase per draw may be limited.</li>
              <li>Winners are selected through a verifiable random draw process.</li>
            </ul>
        </section>
        <section>
            <h2 className="text-lg font-semibold mt-4">5. Withdrawal Policy</h2>
             <ul className="list-disc pl.6 space-y-2">
              <li>A minimum withdrawal amount of <strong>₦5,000</strong> is required.</li>
              <li>A non-refundable processing fee of <strong>₦200</strong> will be deducted.</li>
              <li>Withdrawals may take up to 48 hours to be processed.</li>
              <li>Locked funds are not eligible for withdrawal.</li>
            </ul>
        </section>
        <section>
            <h2 className="text-lg font-semibold mt-4">6. Prohibited Behavior</h2>
             <ul className="list-disc pl-6 space-y-2">
              <li>Creating multiple accounts for a single individual.</li>
              <li>Using bots, scripts, or any automated means.</li>
              <li>Engaging in fraudulent activities.</li>
              <li>Harassing, spamming, or abusing other users.</li>
            </ul>
        </section>
        <section>
            <h2 className="text-lg font-semibold mt-4">7. Privacy and Data Use</h2>
            <p>We are committed to protecting your privacy... All user-uploaded data, such as proof for task submissions, is stored securely...</p>
        </section>
        <section>
            <h2 className="text-lg font-semibold mt-4">8. Changes to Terms</h2>
            <p>Seedo reserves the right to modify these Terms and Conditions at any time...</p>
        </section>
        </>
    );
}
