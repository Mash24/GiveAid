import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Enter a valid email address.');
      setShake(true); setTimeout(() => setShake(false), 500);
      return;
    }
    setLoading(true);
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (error) {
      let message = 'Failed to sign in. Please check your credentials.';
      if (error?.code === 'auth/user-not-found') message = 'No account found with this email.';
      if (error?.code === 'auth/wrong-password') message = 'Incorrect password.';
      if (error?.code === 'auth/too-many-requests') message = 'Too many failed attempts. Please try again later.';
      toast.error(message);
      setShake(true); setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Signed in with Google!');
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (error) {
      toast.error('Google sign-in failed.');
      setShake(true); setTimeout(() => setShake(false), 500);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      toast.error('Enter a valid email address.');
      return;
    }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success('Password reset email sent!');
      setShowReset(false);
      setResetEmail('');
    } catch (error) {
      toast.error('Failed to send reset email.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left: Story, Trust, and Visuals */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden">
        {/* Vibrant Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 opacity-90 z-0" />
        {/* Heartwarming Photo Overlay */}
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="People helping each other"
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-10"
        />
        {/* Content */}
        <div className="relative z-20 max-w-lg mx-auto text-white p-10 rounded-3xl bg-black bg-opacity-20 backdrop-blur-md shadow-2xl animate-fade-in">
          <div className="flex items-center space-x-3 mb-4">
            <svg className="h-10 w-10 text-white animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-3xl font-bold tracking-tight drop-shadow-lg">CharityConnect</span>
          </div>
          <h2 className="text-4xl font-extrabold mb-2 animate-fade-in">Every login helps change a life</h2>
          <p className="text-lg mb-6 animate-fade-in delay-100">
            "Last month, <span className='font-bold text-yellow-200'>1,200+ donors</span> helped Jane get life-saving surgery. Join us and make a difference every day."
          </p>
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 mb-6 animate-fade-in delay-200">
            <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold shadow-md backdrop-blur-sm">
              <svg className="h-5 w-5 text-green-300 mr-2 animate-pulse" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              1000+ lives changed
            </div>
            <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold shadow-md backdrop-blur-sm">
              <svg className="h-5 w-5 text-blue-200 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 0c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z" /></svg>
              Secure & Private
            </div>
            <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold shadow-md backdrop-blur-sm">
              <svg className="h-5 w-5 text-yellow-200 mr-2 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
              As seen on
              <span className="ml-1 font-bold">GoFundMe</span>
            </div>
          </div>
          {/* Subtle confetti (optional) */}
          <div className="absolute bottom-4 right-4 animate-float">
            <svg width="32" height="32" fill="none"><circle cx="16" cy="16" r="16" fill="#fff" fillOpacity="0.2" /></svg>
          </div>
        </div>
      </div>
      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white animate-slide-in-right">
        <div className={`max-w-md w-full space-y-8 transition-all duration-500 bg-white rounded-2xl shadow-2xl p-8 ${shake ? 'animate-shake' : ''}`} ref={formRef}>
          <ToastContainer position="top-center" autoClose={4000} />
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6 md:hidden flex items-center justify-center space-x-2">
            <svg className="h-8 w-8 text-blue-600 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-2xl font-bold text-blue-700">CharityConnect</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 animate-fade-in">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600 animate-fade-in delay-100">
            Welcome back! Please enter your details.
          </p>
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4 transition animate-fade-in delay-200"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48">
              <g>
                <path fill="#4285F4" d="M24 9.5c3.54 0 6.36 1.53 7.82 2.81l5.75-5.75C34.64 3.36 29.8 1 24 1 14.82 1 6.98 6.98 3.69 15.09l6.68 5.19C12.13 14.09 17.56 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.91-2.18 5.38-4.66 7.04l7.19 5.59C43.98 37.02 46.1 31.23 46.1 24.5z"/>
                <path fill="#FBBC05" d="M10.37 28.28A14.48 14.48 0 019.5 24c0-1.49.25-2.93.7-4.28l-6.68-5.19A23.97 23.97 0 001 24c0 3.77.9 7.34 2.5 10.47l6.87-6.19z"/>
                <path fill="#EA4335" d="M24 46.5c6.48 0 11.93-2.15 15.9-5.85l-7.19-5.59c-2.01 1.35-4.59 2.14-8.71 2.14-6.44 0-11.87-4.59-13.63-10.78l-6.87 6.19C6.98 41.02 14.82 46.5 24 46.5z"/>
                <path fill="none" d="M1 1h46v46H1z"/>
              </g>
            </svg>
            {googleLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>
          <form className="mt-4 space-y-6 animate-fade-in-fast" onSubmit={handleSubmit} autoComplete="off">
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:scale-105"
                  placeholder="you@email.com"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:scale-105"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center mb-2">
                <input
                  id="show-password"
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="show-password" className="ml-2 block text-sm text-gray-600">
                  Show password
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
                >
                  Forgot your password?
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          {/* Why join CharityConnect? */}
          <div className="mt-8 bg-gray-50 rounded-xl p-4 text-gray-700 shadow-inner animate-fade-in delay-300">
            <h3 className="font-semibold mb-2 text-lg text-blue-700">Why join CharityConnect?</h3>
            <ul className="space-y-1 text-sm">
              <li>🌍 Make a real impact in your community</li>
              <li>🤝 Connect with donors, volunteers, and causes</li>
              <li>🔒 Safe, secure, and trusted by thousands</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full absolute bottom-0 left-0 py-4 bg-white bg-opacity-80 text-center text-gray-500 text-xs z-50 border-t border-gray-100 animate-fade-in delay-500">
        <span>© {new Date().getFullYear()} CharityConnect. All rights reserved. · </span>
        <Link href="/privacy" className="underline">Privacy Policy</Link>
        <span> · </span>
        <Link href="/terms" className="underline">Terms</Link>
        <span> · </span>
        <Link href="/support" className="underline">Support</Link>
      </footer>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        .animate-fade-in-fast {
          animation: fadeIn 0.4s;
        }
        .animate-slide-in-right {
          animation: slideInRight 1s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .animate-shake {
          animation: shake 0.4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
} 