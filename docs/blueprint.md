# **App Name**: Seedo: Plant Tasks, Grow Earnings

## Core Features:

- Landing Page with Dynamic Content: Display a modern landing page with dynamic content fetched from Firestore, including the WhatsApp support link. The 'How it works' CTA uses client-side navigation to scroll through the sections of the landing page.
- Registration with Payment Verification: Enable user registration with a multi-step flow that includes username availability check, Flutterwave payment integration, and server-side payment verification. A terms and conditions modal is displayed on the registration page. Also generates referral codes for each user.
- Login with Firebase Authentication: Implement user login using Firebase Authentication (email + password) with password reset functionality. Successfully logs in users are directed to their personal dashboard page.
- Personalized Dashboard: Create a personalized user dashboard that displays earnings summary, referral statistics, active tasks, and a raffle countdown timer. Theme is managed via real-time Firestore updates with a dark/light mode toggle and saves preference to users.
- Task Management with Proof Submission: Allow users to view and filter tasks, submit proof of completion (image/video) via Firebase Storage, and track submission status. Also adds small streaks as part of a user login button, which credits rewards daily.
- Raffle Ticket Purchase System: Set up a raffle page where users can purchase tickets by selecting numbers, using a modal window for purchasing numbers in the 1-5000 range, complete with Flutterwave payment integration and reservation management. Displays past winners and allows the frontend to handle expiring tickets.
- AI-Powered Customer Support Chat: Integrate a floating support widget powered by Firebase AI Builder to provide customer support via chat. It is able to analyze requests and, acting as a tool, knows when to escalate requests for assistance to a human operator, in which case a ticket is created.

## Style Guidelines:

- Primary color: Mint green (#00B894) to reflect growth and financial prosperity.
- Background color: Light cyan (#E0F8F7), a desaturated version of mint green, for a soft, modern backdrop.
- Accent color: Gold (#D4AF37) to highlight prize winnings, bonuses, and calls to action, injecting prestige.
- Font: 'PT Sans' (sans-serif) for both body text and headlines; chosen for its warmth and readability in multiple sizes.
- Use minimalist, custom icons with a glassmorphism effect to represent key features and actions.
- Employ a mobile-first design approach with a soft blue to mint-green gradient background and glassmorphism cards for a modern, engaging user experience.
- Incorporate subtle animations for feedback and engagement, such as ticket animations, progress ribbons, and loading sequences.