
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center h-14 max-w-screen-2xl">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg">Seedo</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-12 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          Terms and Conditions
        </h1>
        <div className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-semibold border-b pb-2">
              1. Introduction
            </h2>
            <p>
              Welcome to Seedo. These Terms and Conditions govern your use of our
              platform and services. By registering on Seedo, you agree to
              comply with and be bound by these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold border-b pb-2">
              2. Subscription Policy
            </h2>
            <p>
              Access to the Seedo earning platform requires an active monthly
              subscription of <strong>₦3,000</strong>. This fee grants you
              access to daily tasks, raffles, and all other earning features
              for the subscription period. Subscriptions are recurring and must be
              renewed monthly to maintain access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold border-b pb-2">
              3. Welcome Bonus
            </h2>
            <p>
              Upon successful registration and payment, a welcome bonus of{' '}
              <strong>₦4,500</strong> will be credited to your account. This
              bonus is initially locked. To unlock the bonus and make it
              available for withdrawal, you must successfully refer a minimum of{' '}
              <strong>three (3)</strong> valid users who complete their
              registration and subscription payment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold border-b pb-2">
              4. Raffle Rules
            </h2>
            <p>
              Seedo offers daily raffles with various prizes.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Raffle tickets can be purchased for <strong>₦1,000</strong> each.
              </li>
              <li>
                Each ticket requires you to select a unique number between{' '}
                <strong>1 and 5,000</strong>.
              </li>
              <li>
                The number of tickets a user can purchase per draw may be limited.
                Please see the raffle page for specific limits.
              </li>
              <li>
                Winners are selected through a verifiable random draw process.
                Draw times and prize announcements will be made on the raffle page.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold border-b pb-2">
              5. Withdrawal Policy
            </h2>
            <p>
              You may request to withdraw your earnings subject to the following
              conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                A minimum withdrawal amount of <strong>₦5,000</strong> is required
                for each request.
              </li>
              <li>
                A non-refundable processing fee of <strong>₦200</strong> will be
                deducted from each withdrawal request.
              </li>
              <li>
                Withdrawals are processed by our administrative team and may take
                up to 48 hours to be completed.
              </li>
              <li>
                Locked funds, including the initial welcome bonus, are not
                eligible for withdrawal until their specific unlock conditions
                are met.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold border-b pb-2">
              6. Prohibited Behavior
            </h2>
            <p>
              To maintain a fair and secure platform for all users, the
              following activities are strictly prohibited:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Creating multiple accounts for a single individual.
              </li>
              <li>
                Using bots, scripts, or any automated means to complete tasks or
                participate in raffles.
              </li>
              <li>
                Engaging in fraudulent activities, including but not limited to
                fake referrals and payment fraud.
              </li>
              <li>
                Harassing, spamming, or abusing other users in the chatroom or
                any other part of the platform.
              </li>
            </ul>
            <p className="mt-4">
              Violation of these rules may result in penalties including account
              suspension, forfeiture of earnings, and a permanent ban from the
              Seedo platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold border-b pb-2">
              7. Privacy and Data Use
            </h2>
            <p>
              We are committed to protecting your privacy. Your personal data,
              including your name, email, and phone number, is collected to
              provide and improve our services. All user-uploaded data, such as
              proof for task submissions, is stored securely using{' '}
              <strong>Firebase Storage</strong>. We will not share your personal
              information with third parties without your consent, except as
              required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold border-b pb-2">
              8. Changes to Terms
            </h2>
            <p>
              Seedo reserves the right to modify these Terms and Conditions at
              any time. We will notify users of any significant changes.
              Continued use of the platform after such changes constitutes your
              acceptance of the new terms.
            </p>
          </section>
        </div>
        <footer className="border-t mt-12 pt-8">
            <div className="container flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Seedo. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="hover:text-primary">WhatsApp Support</a>
                <a href="mailto:seedo.earn@gmail.com" className="hover:text-primary">seedo.earn@gmail.com</a>
                <Link href="/terms" className="hover:text-primary">Terms</Link>
            </div>
            </div>
        </footer>
      </main>
    </div>
  );
}
