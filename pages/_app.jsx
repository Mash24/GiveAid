import '../styles/globals.css';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';

const MyApp = ({ Component, pageProps }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (!response.ok) {
          throw new Error('Auth check failed');
        }
        const data = await response.json();
        setIsLoggedIn(data.isAuthenticated);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp; 