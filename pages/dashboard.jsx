import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Notification from '../../components/Notification';

export default function Dashboard() {
  const router = useRouter();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Check for registration success notification
    if (router.query.registered) {
      setNotification({
        type: 'success',
        message: 'Registration successful! Welcome to your dashboard.',
      });
      // Clear the query parameter after showing the notification
      router.replace('/dashboard', undefined, { shallow: true });
    }
  }, [router.query, router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard - Charity Connect</title>
        <meta name="description" content="User dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Your dashboard content goes here */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome!</h2>
            <p className="text-gray-600">This is your personalized dashboard. Explore the menu in the navigation bar to manage your activities.</p>
            {/* Add more sections for My Campaigns, Donations, etc. later */}
          </div>
        </div>
      </main>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
} 