import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Terms & Conditions</CardTitle>
              <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>Welcome to Seedo. These terms and conditions outline the rules and regulations for the use of Seedo's Website and services. By accessing this website we assume you accept these terms and conditions. Do not continue to use Seedo if you do not agree to take all of the terms and conditions stated on this page.</p>
                
                <h3 id="subscription">Subscription Policy</h3>
                <p>A non-refundable subscription fee of ₦3,000 is required monthly to access our platform's earning features, including tasks, raffles, and referral bonuses. This subscription renews automatically unless canceled. Failure to renew will result in temporary suspension of earning capabilities.</p>
                
                <h3 id="welcome-bonus">Welcome Bonus</h3>
                <p>A welcome bonus of ₦4,500 is credited to new users upon successful registration and payment. This bonus is locked and will be released to your main wallet, becoming available for withdrawal, only after you have successfully referred 3 new users who complete their own registration and payment.</p>
                
                <h3 id="raffle">Raffle Rules</h3>
                <p>Raffle tickets cost ₦1000 each. Users can select unique numbers between 1 and 5000 for each draw. The number of tickets a user can buy per draw may be limited. Winnings are determined by the prize pool of each specific raffle draw and will be credited to the winner's wallet. Prizes may be revealed shortly before the draw time.</p>
                
                <h3 id="withdrawal">Withdrawal Policy</h3>
                <p>The minimum amount for a withdrawal request is ₦5,000 from your unlocked wallet balance. A flat processing fee of ₦200 applies to all withdrawals. All withdrawal requests are subject to admin approval and are typically processed within 24-48 business hours.</p>
                
                <h3 id="prohibited-behavior">Prohibited Behavior & Penalties</h3>
                <p>Users are prohibited from creating multiple accounts, using automated scripts or bots, engaging in fraudulent activities, or posting abusive content in the chatroom. Violation of these rules may result in immediate account suspension, forfeiture of all earnings, and a permanent ban from the platform without a refund.</p>
                
                <h3 id="privacy">Privacy & Data Use</h3>
                <p>We are committed to protecting your privacy. All user data, including personal information and media uploads for task verification, is securely stored and managed using Firebase services. We do not share your personal information with third parties without your explicit consent, except as required by law. All data is handled in accordance with our Privacy Policy.</p>

                <h4>Contact Us</h4>
                <p>If you have any questions about these Terms, please contact us at seedo.earn@gmail.com.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
