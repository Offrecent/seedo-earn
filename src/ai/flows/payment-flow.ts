'use server';
/**
 * @fileOverview A Genkit flow for handling payment verification and user registration.
 *
 * - verifyPaymentAndCreateUser - A function that verifies a Flutterwave transaction and creates a new user.
 * - PaymentVerificationInput - The input type for the verifyPaymentAndCreateUser function.
 * - PaymentVerificationOutput - The return type for the verifyPaymentAndCreateUser function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import fetch from 'node-fetch';

const PaymentVerificationInputSchema = z.object({
  transactionId: z.string().describe('The transaction ID from Flutterwave.'),
  userData: z.object({
    fullName: z.string(),
    username: z.string(),
    gender: z.string(),
    email: z.string(),
    phone: z.string(),
    whatsapp: z.string(),
    referralCode: z.string().optional(),
    password: z.string(),
  }),
});
export type PaymentVerificationInput = z.infer<typeof PaymentVerificationInputSchema>;

const PaymentVerificationOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  userId: z.string().optional(),
});
export type PaymentVerificationOutput = z.infer<typeof PaymentVerificationOutputSchema>;


export async function verifyPaymentAndCreateUser(
  input: PaymentVerificationInput
): Promise<PaymentVerificationOutput> {
  return verifyPaymentAndCreateUserFlow(input);
}


const verifyPaymentAndCreateUserFlow = ai.defineFlow(
  {
    name: 'verifyPaymentAndCreateUserFlow',
    inputSchema: PaymentVerificationInputSchema,
    outputSchema: PaymentVerificationOutputSchema,
  },
  async (input) => {
    const { transactionId, userData } = input;

    // IMPORTANT: Store your secret key in an environment variable
    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY || 'YOUR_FLUTTERWAVE_SECRET_KEY';

    if (secretKey === 'YOUR_FLUTTERWAVE_SECRET_KEY') {
        console.error("Flutterwave secret key is not set. Please set the FLUTTERWAVE_SECRET_KEY environment variable.");
        return {
            success: false,
            message: "Payment verification service is not configured. Please contact support.",
        };
    }

    try {
      const response = await fetch(
        `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
        }
      );

      const verificationData = await response.json();

      if (
        verificationData.status === 'success' &&
        verificationData.data?.status === 'successful' &&
        verificationData.data?.amount === 3000 &&
        verificationData.data?.currency === 'NGN'
      ) {
        // Payment is valid. Now, create the user account.
        // This is where you would integrate with Firebase Auth and Firestore.
        // For now, we will simulate user creation.
        console.log('Payment successful for:', userData.email);
        console.log('Simulating user creation...');
        const newUserId = `user_${Date.now()}`;

        // Here you would:
        // 1. firebaseAdmin.auth().createUser({ email, password })
        // 2. firebaseAdmin.firestore().collection('users').doc(newUserId).set({ ... })

        return {
          success: true,
          message: 'User created successfully.',
          userId: newUserId,
        };
      } else {
        // Payment is not valid
        return {
          success: false,
          message: 'Payment verification failed. Please contact support.',
        };
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      return {
        success: false,
        message: 'An unexpected error occurred during payment verification.',
      };
    }
  }
);
