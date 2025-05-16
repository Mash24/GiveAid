// /components/layout/Navbar.jsx
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch by only showing auth-dependent UI after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">CharityConnect</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/donate-item" className="text-gray-600 hover:text-gray-900">
              Donate Items
            </Link>
            <Link href="/donate-money" className="text-gray-600 hover:text-gray-900">
              Donate Money
            </Link>
            {!mounted ? (
              // Show loading state during SSR and initial client render
              <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;