// /pages/donate-item.jsx
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import DonateItemForm from '../components/donate/DonateItemForm';
import ProtectedRoute from '../components/layout/ProtectedRoute';

const DonateItemPage = () => {
  const [user] = useAuthState(auth);

  return (
    <ProtectedRoute>
      <Head>
        <title>Donate an Item | CharityConnect</title>
        <meta
          name="description"
          content="Donate your items to those in need through CharityConnect. Help make a difference in your community."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Donate an Item
              </h1>
              <p className="mt-4 text-xl text-blue-100">
                Your generosity can make a real difference in someone's life
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
              <li className="text-gray-900">Donate an Item</li>
            </ol>
          </nav>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Quality Check</h3>
              <p className="mt-2 text-sm text-gray-500">
                Please ensure your items are in good condition and suitable for donation.
              </p>
            </div>

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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Pickup or Drop-off</h3>
              <p className="mt-2 text-sm text-gray-500">
                Choose between having your items picked up or dropping them off at a location.
              </p>
            </div>

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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Photo Upload</h3>
              <p className="mt-2 text-sm text-gray-500">
                Upload up to 3 clear photos of your items to help recipients.
              </p>
            </div>
          </div>

          {/* Donation Form */}
          <div className="bg-white rounded-lg shadow-sm">
            <DonateItemForm />
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Need Help?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              If you have any questions about the donation process or need assistance,
              please don't hesitate to contact our support team.
            </p>
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
    </ProtectedRoute>
  );
};

export default DonateItemPage;