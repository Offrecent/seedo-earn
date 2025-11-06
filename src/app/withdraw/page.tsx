'use client';

import { useState } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/firebase/auth/use-user';

export default function WithdrawPage() {
  const [amount, setAmount] = useState('');
  const [status, setStatus<"idle" | "loading" | "success">('idle');
  
  const { user, userData, loading } = useUser();
  const availableBalance = userData?.wallet?.balance || 0;
  const withdrawalFee = 200;
  const minWithdrawal = 5000;

  const handleRequest = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount < minWithdrawal || numericAmount > availableBalance) {
        alert(`Invalid amount. Please enter a value between ₦${minWithdrawal} and ₦${availableBalance}.`);
        return;
    }

    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
        setStatus('success');
    }, 2000);
  };

  const finalAmount = amount ? Math.max(0, parseFloat(amount) - withdrawalFee) : 0;

  const history: any[] = [];

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-16 h-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Withdraw Earnings</h1>
            <p className="text-muted-foreground">
              Request a withdrawal of your available balance.
            </p>
          </div>

        {status === 'success' ? (
            <Alert variant="default" className="mb-8 bg-green-500/10 border-green-500/50">
                <AlertTitle>Request Submitted!</AlertTitle>
                <AlertDescription>
                    Your withdrawal request for <strong>₦{amount}</strong> is now pending admin approval. It may take up to 48 hours to process.
                </AlertDescription>
            </Alert>
        ) : (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>New Withdrawal Request</CardTitle>
              <CardDescription>
                Your available balance is <strong>₦{availableBalance.toLocaleString()}</strong>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount to Withdraw (₦)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder={`Minimum ₦${minWithdrawal}`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={status === 'loading'}
                />
              </div>
              <div className="p-4 bg-muted rounded-lg text-sm space-y-2">
                  <div className="flex justify-between">
                      <span>Processing Fee:</span>
                      <span>- ₦{withdrawalFee.toLocaleString()}</span>
                  </div>
                   <div className="flex justify-between font-bold">
                      <span>You Will Receive:</span>
                      <span>₦{finalAmount.toLocaleString()}</span>
                  </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRequest} disabled={status === 'loading' || !amount || parseFloat(amount) < minWithdrawal}>
                 {status === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Request Withdrawal
              </Button>
            </CardFooter>
          </Card>
        )}


          <Card>
            <CardHeader>
              <CardTitle>Withdrawal History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.length > 0 ? history.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>₦{item.amount.toLocaleString()}</TableCell>
                      <TableCell>₦{item.fee.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                         <span className={`text-xs font-semibold py-1 px-2 rounded-full ${
                             item.status === 'Completed' ? 'bg-green-500/20 text-green-500' 
                             : item.status === 'Rejected' ? 'bg-destructive/20 text-destructive' 
                             : 'bg-yellow-500/20 text-yellow-500'
                         }`}>
                            {item.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">No withdrawal history.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
