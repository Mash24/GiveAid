// /pages/donate-money.jsx
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import DonateMoneyForm from '../components/donate/DonateMoneyForm';
import ProtectedRoute from '../components/layout/ProtectedRoute';

const DonateMoneyPage = () => {
  const [user] = useAuthState(auth);

  return (
    <ProtectedRoute>
      <Head>
        <title>Donate Money | CharityConnect</title>
        <meta
          name="description"
          content="Support our cause by making a monetary donation. Your contribution helps provide education, food, shelter, and healthcare to those in need."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Gradient Background */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 mix-blend-multiply" />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Donate Money
              </h1>
              <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
                Support children's education, food, shelter, and health. Every contribution makes a real difference in someone's life.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <a href="/" className="hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <a href="/donate" className="hover:text-blue-600">
                  Donate
                </a>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900">Donate Money</li>
            </ol>
          </nav>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Secure Payments Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-blue-600 mb-2">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Secure Payments</h3>
              <p className="mt-2 text-sm text-gray-500">
                Your donations are processed through secure payment gateways with industry-standard encryption.
              </p>
            </div>

            {/* Transparent Usage Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-blue-600 mb-2">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Transparent Usage</h3>
              <p className="mt-2 text-sm text-gray-500">
                We provide detailed reports on how your donations are used to make a real impact.
              </p>
            </div>

            {/* Tax-Deductible Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-blue-600 mb-2">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Tax-Deductible</h3>
              <p className="mt-2 text-sm text-gray-500">
                All donations are tax-deductible. You'll receive a receipt for your records.
              </p>
            </div>
          </div>

          {/* Donation Form Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <DonateMoneyForm />
          </div>

          {/* Support Section */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Need Help?</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Contact our support team for any donation-related queries. We're here to help you make a difference.
                </p>
                <div className="mt-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Contact Support
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            <div className="pt-6">
              <dt className="text-lg">
                <span className="font-medium text-gray-900">
                  How is my donation used?
                </span>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                Your donation directly supports our programs in education, food security, shelter, and healthcare. We ensure that at least 90% of all donations go directly to helping those in need.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg">
                <span className="font-medium text-gray-900">
                  Is my donation secure?
                </span>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                Yes, we use industry-standard encryption and secure payment processors (Stripe and PayPal) to ensure your donation is processed safely and securely.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg">
                <span className="font-medium text-gray-900">
                  Can I make recurring donations?
                </span>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                Yes, you can choose between one-time donations or monthly recurring donations. You can manage your recurring donations from your dashboard at any time.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DonateMoneyPage;