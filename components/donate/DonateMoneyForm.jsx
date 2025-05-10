// /components/donate/DonateMoneyForm.jsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Elements } from '@stripe/react-stripe-js';
import { auth } from '../../firebase/config';
import { donationOperations } from '../../firebase/donations';
import { stripePromise, formatCurrency, donationCategories } from '../../utils/paymentUtils';
import ProtectedRoute from '../layout/ProtectedRoute';

// Form validation schema
const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required')
    .min(1, 'Minimum donation is $1'),
  frequency: yup.string().required('Donation frequency is required'),
  category: yup.string().required('Donation category is required'),
  message: yup.string().max(500, 'Message must be less than 500 characters')
});

const DonateMoneyForm = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [totalDonations, setTotalDonations] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [donationSummary, setDonationSummary] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      frequency: 'one-time',
      category: 'other'
    }
  });

  const amount = watch('amount');

  // Fetch total donations
  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
        const total = await donationOperations.getTotalDonations();
        setTotalDonations(total);
      } catch (error) {
        console.error('Error fetching total donations:', error);
      }
    };
    fetchTotalDonations();
  }, []);

  const handleStripePayment = async (data) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Create donation record
      const donationId = await donationOperations.createMoneyDonation({
        userId: user.uid,
        ...data,
        paymentMethod: 'stripe'
      });

      // Here you would typically create a Stripe Checkout session
      // and redirect to Stripe's hosted checkout page
      // For this example, we'll simulate a successful payment
      
      setDonationSummary({
        id: donationId,
        amount: data.amount,
        frequency: data.frequency,
        category: data.category
      });
      setShowSuccess(true);
      reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayPalPayment = async (data, actions) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Create donation record
      const donationId = await donationOperations.createMoneyDonation({
        userId: user.uid,
        ...data,
        paymentMethod: 'paypal'
      });

      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: data.amount.toString()
            }
          }
        ]
      });
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const onPayPalSuccess = async (data, actions) => {
    try {
      await actions.order.capture();
      setShowSuccess(true);
      reset();
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Thank You!</h3>
          <p className="mt-2 text-sm text-gray-500">
            Your donation of {formatCurrency(donationSummary.amount)} has been received.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowSuccess(false)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Make Another Donation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto p-6">
        {/* Total Donations Display */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Total Donations: {formatCurrency(totalDonations)}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Help us reach our goal of making a difference in people's lives
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(handleStripePayment)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              {...register('fullName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                step="0.01"
                {...register('amount')}
                className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
            )}
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Donation Frequency</label>
            <div className="space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="one-time"
                  {...register('frequency')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">One-Time</span>
              </label>
              <br />
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="monthly"
                  {...register('frequency')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Monthly</span>
              </label>
            </div>
            {errors.frequency && (
              <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Donation Category</label>
            <select
              {...register('category')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {donationCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Message (Optional)</label>
            <textarea
              {...register('message')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Share why you're making this donation..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('stripe')}
                className={`flex-1 py-2 px-4 border rounded-md ${
                  paymentMethod === 'stripe'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`flex-1 py-2 px-4 border rounded-md ${
                  paymentMethod === 'paypal'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                PayPal
              </button>
            </div>
          </div>

          {/* Payment Buttons */}
          {paymentMethod === 'stripe' ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : `Donate ${formatCurrency(amount || 0)}`}
            </button>
          ) : (
            <div className="w-full">
              <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => handlePayPalPayment(watch(), actions)}
                onApprove={onPayPalSuccess}
                onError={(err) => {
                  setError('PayPal payment failed. Please try again.');
                  setIsSubmitting(false);
                }}
              />
            </div>
          )}
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default DonateMoneyForm;