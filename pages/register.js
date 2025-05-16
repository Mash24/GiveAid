import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Add reCAPTCHA
import ReCAPTCHA from 'react-google-recaptcha';

const passwordStrength = (password) => {
  if (!password) return { label: '', color: '' };
  if (password.length < 6) return { label: 'Too short', color: 'bg-red-400' };
  if (password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
    if (password.length >= 10 && /[!@#$%^&*]/.test(password)) {
      return { label: 'Strong', color: 'bg-green-500' };
    }
    return { label: 'Medium', color: 'bg-yellow-400' };
  }
  return { label: 'Weak', color: 'bg-red-400' };
};

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef();
  const router = useRouter();

  const strength = passwordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Enter a valid email address.');
      return;
    }
    if (name.trim().length < 2) {
      toast.error('Name must be at least 2 characters.');
      return;
    }
    if (!agreed) {
      toast.error('You must agree to the terms and privacy policy.');
      return;
    }
    if (password !== confirm) {
      toast.error('Passwords do not match.');
      return;
    }
    // TODO: Add reCAPTCHA validation here in the future
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
        role: 'user',
        provider: 'email'
      });
      await sendEmailVerification(user);
      toast.success('Registration successful! Please check your email to verify your account.');
      setTimeout(() => router.push('/login'), 3000);
    } catch (error) {
      const message =
        error?.code === 'auth/email-already-in-use'
          ? 'This email is already registered.'
          : error?.message || 'Registration failed.';
      toast.error(message);
      setError(message);
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
      if (recaptchaRef.current) recaptchaRef.current.reset();
      setRecaptchaToken(null);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        createdAt: new Date().toISOString(),
        role: 'user',
        provider: 'google'
      }, { merge: true });
      toast.success('Google sign-in successful!');
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (error) {
      const message = error?.message || 'Google sign-in failed.';
      toast.error(message);
      setError(message);
      console.error('Google sign-in error:', error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left: Branding / Hero */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center p-12 animate-slide-in-left">
        <div className="max-w-md text-white space-y-8">
          <div className="flex items-center space-x-3">
            <svg className="h-10 w-10 text-white animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-3xl font-bold tracking-tight">CharityConnect</span>
          </div>
          <h2 className="text-4xl font-extrabold animate-fade-in">Join Our Community</h2>
          <p className="text-lg animate-fade-in delay-100">
            Create your account and start making a real impact. Donate, volunteer, and connect with others who care.
          </p>
          <ul className="space-y-2 animate-fade-in delay-200">
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Secure &amp; private
            </li>
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Fast &amp; easy signup
            </li>
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              1000+ lives changed
            </li>
          </ul>
        </div>
      </div>

      {/* Right: Registration Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white animate-fade-in">
        <div className="max-w-md w-full space-y-8">
          <ToastContainer position="top-center" autoClose={4000} />
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6 md:hidden">
            <div className="flex items-center justify-center space-x-2">
              <svg className="h-8 w-8 text-blue-600 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-2xl font-bold text-blue-700">CharityConnect</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us and start making a difference today
          </p>
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4 transition"
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
            {googleLoading ? 'Signing in...' : 'Sign up with Google'}
          </button>
          <form className="mt-4 space-y-6" onSubmit={handleSubmit} autoComplete="off">
            {/* TODO: Add reCAPTCHA here in the future */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create a password"
                />
                {/* Password strength meter */}
                {password && (
                  <div className="mt-1 flex items-center space-x-2">
                    <div className={`h-2 w-24 rounded ${strength.color} transition-all`}></div>
                    <span className="text-xs text-gray-500">{strength.label}</span>
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <input
                  id="confirm"
                  name="confirm"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Re-enter your password"
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
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="underline text-blue-600 hover:text-blue-800" target="_blank">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="underline text-blue-600 hover:text-blue-800" target="_blank">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        .animate-slide-in-left {
          animation: slideInLeft 1s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px);}
          to { opacity: 1; transform: translateX(0);}
        }
      `}</style>
    </div>
  );
}