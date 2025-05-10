// /utils/paymentUtils.js
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const donationCategories = [
  { id: 'school', label: 'School Fees' },
  { id: 'food', label: 'Food' },
  { id: 'shelter', label: 'Shelter' },
  { id: 'medical', label: 'Medical' },
  { id: 'other', label: 'Other' }
];