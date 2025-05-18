import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Campaigns from '../components/Campaigns';

const categories = [
  { name: 'Medical', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd23?auto=format&fit=crop&w=200&q=80', stat: '4,200+ lives saved' },
  { name: 'Emergency', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80', stat: 'Rapid response in 30+ cities' },
  { name: 'Education', img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=200&q=80', stat: '1,500 scholarships funded' },
  { name: 'Animal', img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=200&q=80', stat: '900+ animals rescued' },
  { name: 'Business', img: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=200&q=80', stat: '200+ small businesses revived' },
  { name: 'Your Cause', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80', stat: 'Every story matters' },
];

const featuredStories = [
  {
    title: 'Help John with Surgery',
    category: 'Medical',
    location: 'Nairobi',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd23?auto=format&fit=crop&w=400&q=80',
    raised: 4200,
    goal: 8000,
    donors: 120,
    trending: true,
    description: 'John needs urgent surgery. Your support can save his life.'
  },
  {
    title: 'Sponsor a Student',
    category: 'Education',
    location: 'Kisumu',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    raised: 1500,
    goal: 3000,
    donors: 45,
    trending: false,
    description: 'Help a bright student stay in school and achieve their dreams.'
  },
  {
    title: 'Rescue Stray Animals',
    category: 'Animal',
    location: 'Mombasa',
    img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
    raised: 900,
    goal: 2000,
    donors: 30,
    trending: true,
    description: 'Support our mission to rescue and care for stray animals.'
  },
];

const howItWorks = [
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#34d399" opacity=".2"/><path d="M8 12h8m-4-4v8" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: 'Create Your Fundraiser',
    desc: 'Set your goal, tell your story, and add a photo. It only takes a few minutes.'
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#6366f1" opacity=".2"/><path d="M8 12h8m-4-4v8" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: 'Share with Friends',
    desc: 'Share your fundraiser via social media, email, or text to reach more people.'
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fbbf24" opacity=".2"/><path d="M8 12h8m-4-4v8" stroke="#f59e42" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: 'Receive Donations',
    desc: 'Donations go directly to you or your beneficiary, quickly and securely.'
  },
];

const impactStats = [
  { icon: '🌍', label: 'Countries Supported', value: '30+' },
  { icon: '🤝', label: 'Lives Changed', value: '10,000+' },
  { icon: '💰', label: 'Raised This Year', value: '$2.5M+' },
  { icon: '⏱️', label: 'Avg. Time to First Donation', value: '6 min' },
];

const wallOfThanks = [
  { name: 'Jane', message: 'Thank you for helping my son get surgery!', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Samuel', message: 'Your support kept my business alive.', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Amina', message: 'I finished school thanks to donors like you.', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
];

const transparency = [
  { icon: '💸', label: '90% to Causes', desc: '90% of every donation goes directly to the cause.' },
  { icon: '🔍', label: 'Open Books', desc: 'All transactions are transparent and auditable.' },
  { icon: '🛡️', label: 'Verified Fundraisers', desc: 'Every fundraiser is verified for authenticity.' },
];

// Sample campaign data - replace with real data from your backend
const sampleCampaigns = [
  {
    id: 1,
    title: "Help Sarah's Medical Treatment",
    description: "Sarah needs urgent surgery to treat her rare condition. Your support can make a difference in her life.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    category: "Medical",
    raised: 25000,
    goal: 50000,
    donors: 156,
    daysLeft: 15
  },
  {
    id: 2,
    title: "Community Library Project",
    description: "Building a new library to provide educational resources for underprivileged children in our community.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
    category: "Education",
    raised: 15000,
    goal: 30000,
    donors: 89,
    daysLeft: 30
  },
  {
    id: 3,
    title: "Emergency Relief Fund",
    description: "Supporting families affected by recent natural disasters with immediate relief and long-term recovery.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
    category: "Emergency",
    raised: 75000,
    goal: 100000,
    donors: 234,
    daysLeft: 7
  }
];

export default function Home() {
  const [ticker, setTicker] = useState({ amount: 0, donors: 0, lives: 0 });
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth check

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setTicker(t => ({
        amount: t.amount + Math.floor(Math.random() * 20),
        donors: t.donors + Math.floor(Math.random() * 2),
        lives: t.lives + Math.floor(Math.random() * 1.2),
      }));
    }, 1200);
    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-purple-50">
      <Head>
        <title>Charity Connect - Make a Difference Today</title>
        <meta name="description" content="Connect with meaningful causes and make a difference in people's lives" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 z-10">
          {/* Left: Headline & CTA */}
          <div className="flex-1 z-10 text-center md:text-left">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 leading-tight animate-gradient-text bg-gradient-to-r from-teal-500 via-emerald-500 to-purple-500 bg-clip-text text-transparent">
              Change lives.<br className="hidden sm:inline" /> Start hope.<br className="hidden sm:inline" /> Connect hearts.
            </h1>
            <p className="text-lg text-gray-600 mb-8 animate-fade-in delay-100">
              The most trusted, transparent, and joyful way to give and get help.<br />
              <span className="font-semibold text-emerald-600">Be the reason someone smiles today.</span>
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/auth/register" className="inline-block px-10 py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 hover:from-teal-600 hover:to-purple-600 transition animate-pulse">
                Start a Fundraiser
              </Link>
              <Link href="/campaigns" className="inline-block px-10 py-4 bg-white text-gray-700 rounded-full font-bold text-lg shadow-lg hover:scale-105 hover:bg-gray-50 transition">
                Browse Campaigns
              </Link>
            </div>
            {/* Live Impact Ticker */}
            <div className="flex flex-wrap gap-6 mt-10 items-center justify-center md:justify-start animate-fade-in delay-300">
              <div className="flex items-center gap-2 text-gray-700 text-sm bg-white bg-opacity-80 px-4 py-2 rounded-full shadow">
                <span className="text-emerald-500 font-bold">${mounted ? (ticker.amount * 100).toLocaleString() : '0'}</span> raised today
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm bg-white bg-opacity-80 px-4 py-2 rounded-full shadow">
                <span className="text-purple-500 font-bold">{mounted ? ticker.donors : '0'}</span> donors online now
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm bg-white bg-opacity-80 px-4 py-2 rounded-full shadow">
                <span className="text-yellow-500 font-bold">{mounted ? ticker.lives : '0'}</span> lives changed this week
              </div>
            </div>
          </div>
        </section>

        {/* Featured Campaigns Section */}
        <Campaigns campaigns={sampleCampaigns} isLoggedIn={isLoggedIn} />

        {/* Trust Indicators Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Charity Connect?</h2>
              <p className="text-lg text-gray-600">Transparent, secure, and impactful giving platform</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Campaigns</h3>
                <p className="text-gray-600">Every campaign is thoroughly vetted to ensure legitimacy</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Donations</h3>
                <p className="text-gray-600">Your donations are protected with bank-level security</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Real Impact</h3>
                <p className="text-gray-600">Track how your contributions make a difference</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
