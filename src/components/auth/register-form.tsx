"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle, Circle, Loader2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const formSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  username: z.string().min(3, "Username must be at least 3 characters.").refine(val => /^[a-zA-Z0-9_]+$/.test(val), { message: "Username can only contain letters, numbers, and underscores."}),
  gender: z.enum(["Male", "Female", "Other"]),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, "Please enter a valid phone number."),
  whatsapp: z.string().min(10, "Please enter a valid WhatsApp number."),
  referralCode: z.string().optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type UserFormValue = z.infer<typeof formSchema>;
type Step = 'form' | 'paying' | 'verifying' | 'success' | 'error';
type UsernameStatus = 'idle' | 'checking' | 'available' | 'unavailable';

// Mocked Cloud Function calls
const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return !['admin', 'root', 'user'].includes(username.toLowerCase());
};

const WHATSAPP_SUPPORT_LINK = "https://chat.whatsapp.com/your-group-link"; // Placeholder

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = React.useState<Step>('form');
  const [usernameStatus, setUsernameStatus] = React.useState<UsernameStatus>('idle');
  const usernameTimeoutRef = React.useRef<NodeJS.Timeout>();

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: { terms: false }
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    form.setValue('username', username);
    setUsernameStatus('checking');
    if (usernameTimeoutRef.current) {
        clearTimeout(usernameTimeoutRef.current);
    }
    usernameTimeoutRef.current = setTimeout(async () => {
        if (username.length < 3) {
            setUsernameStatus('idle');
            return;
        }
        const isAvailable = await checkUsernameAvailability(username);
        setUsernameStatus(isAvailable ? 'available' : 'unavailable');
    }, 800);
  };
  
  const onSubmit = async (data: UserFormValue) => {
    setStep('paying');
    // 2. call createRegistrationPayload
    await new Promise(resolve => setTimeout(resolve, 1500));
    // 3. Open Flutterwave
    setStep('verifying');
    await new Promise(resolve => setTimeout(resolve, 2500));
    // 4. On Flutterwave success, call verifyFlutterwavePayment
    // 5. If verify success, show success screen
    setStep('success');
  };

  if (step === 'success') {
    return (
        <div className="text-center space-y-4 p-4">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold">Registration Successful!</h2>
            <p className="text-muted-foreground">Welcome to Seedo! A welcome bonus of ₦4,500 has been added to your account (locked until 3 valid referrals).</p>
            <Button asChild className="w-full">
                <a href={WHATSAPP_SUPPORT_LINK} target="_blank" rel="noopener noreferrer">Join WhatsApp Group</a>
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push('/login')}>Go to Login</Button>
        </div>
    )
  }

  const isLoading = step === 'paying' || step === 'verifying';
  const loadingText = step === 'paying' ? 'Redirecting to payment...' : 'Verifying payment...';

  return (
    <div>
        <div className="flex justify-between items-center mb-4 px-2">
            {['Fill', 'Pay', 'Verify'].map((s, i) => {
                const stepIndex = ['form', 'paying', 'verifying'].indexOf(step);
                const isActive = i <= stepIndex;
                return (
                    <React.Fragment key={s}>
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-border'}`}>
                                {i < stepIndex ? <CheckCircle className="w-5 h-5"/> : i+1}
                            </div>
                            <p className={`text-xs mt-1 ${isActive ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>{s}</p>
                        </div>
                        {i < 2 && <Separator className={`flex-1 mx-2 ${isActive && i < stepIndex ? 'bg-primary' : ''}`}/>}
                    </React.Fragment>
                )
            })}
        </div>
        
        {isLoading && (
            <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center space-y-4 z-10">
                <Loader2 className="w-12 h-12 animate-spin text-primary"/>
                <p className="text-lg font-semibold">{loadingText}</p>
            </div>
        )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="fullName" render={({ field }) => (
            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={form.control} name="username" render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="relative">
                    <Input {...field} onChange={handleUsernameChange} />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        {usernameStatus === 'checking' && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                        {usernameStatus === 'available' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {usernameStatus === 'unavailable' && <XCircle className="h-4 w-4 text-destructive" />}
                    </div>
                </div>
              </FormControl>
              {usernameStatus === 'unavailable' && <p className="text-sm font-medium text-destructive">Username is already taken.</p>}
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="gender" render={({ field }) => (
            <FormItem><FormLabel>Gender</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select your gender" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem>
          )}/>
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={form.control} name="whatsapp" render={({ field }) => (
            <FormItem><FormLabel>WhatsApp Number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={form.control} name="referralCode" render={({ field }) => (
            <FormItem><FormLabel>Referral Code (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={form.control} name="confirmPassword" render={({ field }) => (
            <FormItem><FormLabel>Confirm Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Accept terms and conditions
                  </FormLabel>
                  <FormDescription>
                    You agree to our{" "}
                     <Dialog>
                        <DialogTrigger asChild><Button variant="link" type="button" className="p-0 h-auto">Terms & Conditions</Button></DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader><DialogTitle>Terms & Conditions</DialogTitle><DialogDescription>Last updated: {new Date().toLocaleDateString()}</DialogDescription></DialogHeader>
                            <ScrollArea className="h-96">
                            <div className="prose prose-sm dark:prose-invert p-4">
                                <p>Welcome to Seedo. These terms and conditions outline the rules and regulations for the use of Seedo's Website.</p>
                                <h3 id="subscription">Subscription Policy</h3>
                                <p>A non-refundable subscription fee of ₦3,000 is required monthly to access our platform's earning features.</p>
                                <h3 id="welcome-bonus">Welcome Bonus</h3>
                                <p>A welcome bonus of ₦4,500 is credited to new users. This bonus is locked and will be released to your main wallet upon successfully referring 3 new, active users.</p>
                                <h3 id="raffle">Raffle Rules</h3>
                                <p>Raffle tickets cost ₦1000 each. Users can select unique numbers between 1 and 5000. Winnings are subject to the prize pool of each draw.</p>
                                <h3 id="withdrawal">Withdrawal Policy</h3>
                                <p>The minimum withdrawal amount is ₦5,000. A flat fee of ₦200 applies to all withdrawals. Withdrawals are processed within 24-48 hours.</p>
                                <h3 id="privacy">Privacy & Data Use</h3>
                                <p>We are committed to protecting your privacy. All user data is securely stored and managed using Firebase services. We do not share your personal information with third parties without your consent.</p>
                            </div>
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                    .
                  </FormDescription>
                   <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button disabled={isLoading} className="w-full" type="submit">
            Create Account & Pay ₦3,000
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-primary">
          Login
        </Link>
      </div>
    </div>
  );
}
