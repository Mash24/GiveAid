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
import { toast } from 'react-toastify';

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

const presetAmounts = [500, 1000, 5000];
const paymentMethods = [
  { value: '', label: 'Select payment method' },
  { value: 'mpesa', label: 'M-Pesa' },
  { value: 'card', label: 'Card' },
  { value: 'bank', label: 'Bank Transfer' },
];

const DonateMoneyForm = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [totalDonations, setTotalDonations] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [donationSummary, setDonationSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      frequency: 'one-time',
      category: 'other',
      amount: '',
      message: ''
    }
  });

  // Watch the amount field
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

  const handlePreset = (val) => {
    setValue('amount', val, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      // Create donation record
      const donationId = await donationOperations.createMoneyDonation({
        userId: user.uid,
        ...data,
        paymentMethod
      });

      setDonationSummary({
        id: donationId,
        amount: data.amount,
        frequency: data.frequency,
        category: data.category
      });
      setShowSuccess(true);
      setSubmitted(true);
      reset();
      toast.success('Donation submitted! Thank you ❤️');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to submit donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-fade-in-fast">
        <span className="text-6xl mb-4">🎉</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank you for your donation!</h2>
        <p className="text-gray-600 mb-4 text-center">Your generosity is making a real difference. You can view your donation history in the dashboard.</p>
        <button
          className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          onClick={() => setSubmitted(false)}
        >
          Make Another Donation
        </button>
        <div className="mt-6 text-4xl animate-bounce">🎊</div>
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 animate-fade-in-fast">
          <div className="flex flex-col items-center mb-4">
            <span className="text-3xl">💳</span>
            <h2 className="text-xl font-bold text-gray-700 mt-2 mb-1">Make a Donation</h2>
          </div>
          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <div className="flex gap-2 mt-1 mb-2">
              {presetAmounts.map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => handlePreset(amt)}
                  className={`px-3 py-1 rounded-full border text-sm font-semibold transition-all duration-150 ${Number(amount) === amt ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'}`}
                  aria-label={`Donate ${amt}`}
                >
                  {amt.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 text-lg">KSh</span>
              <input
                id="amount"
                type="number"
                min="1"
                step="any"
                placeholder="Enter amount (KES or USD)"
                {...register('amount')}
                className={`pl-12 pr-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.amount ? 'border-red-400' : ''}`}
                aria-invalid={!!errors.amount}
                aria-describedby="amount-error"
              />
            </div>
            {errors.amount && <p id="amount-error" className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
          </div>
          {/* Donation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Donation Type</label>
            <div className="flex gap-4">
              <label className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition ${watch('frequency') === 'one-time' ? 'bg-blue-50 border-blue-400' : 'border-gray-200 hover:border-blue-300'}`}>
                <input
                  type="radio"
                  value="one-time"
                  {...register('frequency')}
                  className="accent-blue-600"
                />
                <span>One-time</span>
              </label>
              <label className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition ${watch('frequency') === 'monthly' ? 'bg-blue-50 border-blue-400' : 'border-gray-200 hover:border-blue-300'}`}>
                <input
                  type="radio"
                  value="monthly"
                  {...register('frequency')}
                  className="accent-blue-600"
                />
                <span>Monthly</span>
              </label>
            </div>
            {errors.frequency && <p className="text-red-500 text-xs mt-1">{errors.frequency.message}</p>}
          </div>
          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Personal Message <span className="text-gray-400">(optional)</span></label>
            <textarea
              id="message"
              rows={3}
              placeholder="Add a personal note (optional)"
              {...register('message')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>
          {/* Payment Method */}
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.paymentMethod ? 'border-red-400' : ''}`}
              aria-invalid={!!errors.paymentMethod}
              aria-describedby="paymentMethod-error"
            >
              {paymentMethods.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.paymentMethod && <p id="paymentMethod-error" className="text-red-500 text-xs mt-1">{errors.paymentMethod.message}</p>}
          </div>
          {/* Agreement */}
          <div className="flex items-center">
            <input
              id="agreed"
              type="checkbox"
              {...register('agreed', { required: 'You must agree to the terms' })}
              className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${errors.agreed ? 'border-red-400' : ''}`}
              aria-invalid={!!errors.agreed}
              aria-describedby="agreed-error"
            />
            <label htmlFor="agreed" className="ml-2 block text-sm text-gray-600">
              I agree to the <a href="/terms" className="underline text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">donation terms</a> and <a href="/privacy" className="underline text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">privacy policy</a>.
            </label>
          </div>
          {errors.agreed && <p id="agreed-error" className="text-red-500 text-xs mt-1">{errors.agreed.message}</p>}
          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 transition"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Donate Now'
              )}
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default DonateMoneyForm;