import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

export default function Home() {
  // Live ticker effect
  const [ticker, setTicker] = useState({ amount: 0, donors: 0, lives: 0 });
  const [mounted, setMounted] = useState(false);
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
    <>
      <Head>
        <title>CharityConnect | Change lives. Start hope. Connect hearts.</title>
        <meta name="description" content="Raise money for yourself, loved ones, or causes you care about. CharityConnect makes it easy to give and get help." />
      </Head>
      <main className="relative min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-purple-50 overflow-x-hidden">
        {/* Organic SVG blobs */}
        <svg className="absolute -top-32 -left-32 w-[500px] h-[500px] opacity-30 z-0" viewBox="0 0 500 500"><defs><radialGradient id="g1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#6ee7b7"/><stop offset="100%" stopColor="#a5b4fc"/></radialGradient></defs><ellipse cx="250" cy="250" rx="250" ry="200" fill="url(#g1)"/></svg>
        <svg className="absolute top-0 right-0 w-[400px] h-[400px] opacity-20 z-0" viewBox="0 0 400 400"><ellipse cx="200" cy="200" rx="200" ry="160" fill="#fbbf24"/></svg>
        {/* Floating icons */}
        <span className="absolute left-10 top-10 text-5xl opacity-10 animate-float">💚</span>
        <span className="absolute right-16 top-24 text-4xl opacity-10 animate-float-slow">🤲</span>
        <span className="absolute left-1/3 bottom-12 text-6xl opacity-10 animate-float">🕊️</span>
        <span className="absolute right-1/4 bottom-20 text-5xl opacity-10 animate-float-slow">💸</span>
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
            <Link href="/dashboard/donate-money" className="inline-block px-10 py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 hover:from-teal-600 hover:to-purple-600 transition animate-pulse">
              Start a Fundraiser
            </Link>
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
          {/* Right: Spiral Category Layout */}
          <div className="flex-1">
            {mounted ? (
              <div className="flex flex-wrap justify-center gap-8 relative animate-fade-in delay-200">
                <div className="relative w-[420px] h-[420px] mx-auto max-w-full max-h-[60vw] md:max-h-[420px] md:w-[420px] md:h-[420px]">
                  {categories.map((cat, i) => {
                    const radius = 170;
                    const angle = (i / categories.length) * 2 * Math.PI;
                    const top = radius + radius * Math.sin(angle) - 64;
                    const left = radius + radius * Math.cos(angle) - 64;
                    return (
                      <div
                        key={cat.name}
                        className={`absolute flex flex-col items-center group transition-all duration-300 hover:scale-110 z-10`}
                        style={{
                          top: `${top}px`,
                          left: `${left}px`,
                        }}
                      >
                        <div className="w-32 h-32 rounded-2xl shadow-xl border-4 border-white overflow-hidden flex items-center justify-center bg-white group-hover:ring-4 group-hover:ring-emerald-300 transition-all aspect-square">
                          <img 
                            src={cat.img} 
                            alt={cat.name} 
                            className="object-cover w-full h-full" 
                            onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/128?text=No+Image'; }}
                          />
                        </div>
                        <span className="mt-2 text-gray-800 font-semibold text-base bg-white bg-opacity-80 px-3 py-1 rounded-full shadow group-hover:bg-emerald-100 transition-all whitespace-nowrap">{cat.name}</span>
                        <span className="text-xs text-emerald-500 mt-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">{cat.stat}</span>
                      </div>
                    );
                  })}
                  {/* Center icon */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-purple-400 flex items-center justify-center shadow-2xl border-4 border-white animate-bounce-slow">
                    <span className="text-4xl">🕊️</span>
                  </div>
                </div>
                {/* Mobile fallback: vertical stack */}
                <div className="flex flex-col gap-6 w-full mt-8 md:hidden">
                  {categories.map(cat => (
                    <div key={cat.name} className="flex items-center gap-4 bg-white rounded-2xl shadow p-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-gray-100 aspect-square">
                        <img 
                          src={cat.img} 
                          alt={cat.name} 
                          className="object-cover w-full h-full" 
                          onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/64?text=No+Image'; }}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{cat.name}</div>
                        <div className="text-xs text-emerald-500">{cat.stat}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-[420px] w-full flex items-center justify-center">
                <span className="text-gray-300">Loading categories…</span>
              </div>
            )}
          </div>
        </section>
        {/* How It Works */}
        <section className="max-w-5xl mx-auto mt-20 px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center animate-fade-in">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {howItWorks.map((step, i) => (
              <div key={step.title} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center animate-step-in" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="mb-4">{step.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-emerald-700">{step.title}</h3>
                <p className="text-gray-500 text-base">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Featured Stories Carousel */}
        <section className="max-w-6xl mx-auto mt-24 px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center animate-fade-in">Trending Fundraisers</h2>
          <div className="flex gap-8 overflow-x-auto pb-4 snap-x">
            {featuredStories.map(story => (
              <div key={story.title} className="min-w-[320px] bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:shadow-2xl transition animate-fade-in delay-200 snap-center relative">
                {story.trending && <span className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-xs px-3 py-1 rounded-full shadow font-bold animate-pulse">TRENDING</span>}
                <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4 border-4 border-emerald-200 shadow">
                  <img src={story.img} alt={story.title} className="object-cover w-full h-full" />
                </div>
                <h3 className="font-semibold text-lg mb-1 text-gray-900 text-center">{story.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{story.category} • {story.location}</p>
                <p className="text-gray-700 text-center mb-4">{story.description}</p>
                {/* Progress bar */}
                <div className="w-full mb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>${story.raised.toLocaleString()} raised</span>
                    <span>Goal: ${story.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-purple-400 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (story.raised / story.goal) * 100)}%` }}></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{story.donors} donors</div>
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-emerald-500 to-purple-500 text-white rounded-full font-medium hover:from-emerald-600 hover:to-purple-600 transition shadow">Donate</button>
              </div>
            ))}
          </div>
        </section>
        {/* Impact & Trust */}
        <section className="max-w-5xl mx-auto mt-24 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fade-in delay-200">
            {impactStats.map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                <div className="text-4xl mb-2 animate-pulse">{stat.icon}</div>
                <div className="text-2xl font-bold text-emerald-600 mb-1 animate-count">{stat.value}</div>
                <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
          {/* Impact Map */}
          <div className="w-full flex justify-center mt-12 animate-fade-in delay-300">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/800px-Equirectangular_projection_SW.jpg" alt="Impact Map" className="w-full max-w-xl rounded-2xl shadow-lg border-4 border-emerald-100" />
          </div>
        </section>
        {/* Wall of Thanks */}
        <section className="max-w-4xl mx-auto mt-24 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center animate-fade-in">Wall of Thanks</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {wallOfThanks.map(person => (
              <div key={person.name} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-64 animate-fade-in delay-200">
                <img src={person.img} alt={person.name} className="w-20 h-20 rounded-full mb-3 border-4 border-emerald-200 shadow" />
                <div className="text-lg font-semibold text-emerald-700 mb-1">{person.name}</div>
                <div className="text-gray-600 text-center text-sm">“{person.message}”</div>
              </div>
            ))}
          </div>
        </section>
        {/* Transparency Section */}
        <section className="max-w-4xl mx-auto mt-24 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center animate-fade-in">Transparency & Trust</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {transparency.map(item => (
              <div key={item.label} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-64 animate-fade-in delay-200">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-lg font-semibold text-emerald-700 mb-1">{item.label}</div>
                <div className="text-gray-600 text-center text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>
        {/* Newsletter CTA */}
        <section className="max-w-2xl mx-auto mt-24 px-4 text-center animate-fade-in delay-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Get Our Free Guide to Impactful Giving!</h2>
          <p className="text-gray-500 mb-6">Sign up for our newsletter and receive our exclusive guide, plus the latest stories, tips, and updates from CharityConnect. No spam, ever.</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input type="email" placeholder="Your email address" className="px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none w-full sm:w-auto" />
            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-purple-500 text-white rounded-full font-semibold shadow hover:from-emerald-600 hover:to-purple-600 transition">Subscribe</button>
          </form>
        </section>
        {/* Footer */}
        <footer className="w-full mt-24 pt-12 pb-6 bg-gradient-to-r from-emerald-50 via-purple-50 to-yellow-50 border-t border-gray-100 animate-fade-in delay-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
            {/* Left: Logo + Mission */}
            <div className="flex-1 mb-8 md:mb-0 flex flex-col items-start">
              <div className="flex items-center mb-2">
                <span className="text-2xl font-extrabold text-emerald-600 mr-2">CharityConnect</span>
                <span className="text-2xl">🕊️</span>
              </div>
              <div className="text-gray-600 text-sm max-w-xs">Making a difference in our community through transparent, joyful giving.</div>
            </div>
            {/* Center: Quick Links */}
            <div className="flex-1 flex flex-col items-start md:items-center mb-8 md:mb-0">
              <div className="font-semibold text-gray-800 mb-2">Quick Links</div>
              <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm">
                <Link href="/donate-item" className="hover:underline text-gray-600">Donate Items</Link>
                <Link href="/dashboard/donate-money" className="hover:underline text-gray-600">Donate Money</Link>
                <Link href="/about" className="hover:underline text-gray-600">About</Link>
                <Link href="/impact" className="hover:underline text-gray-600">Our Impact</Link>
              </div>
            </div>
            {/* Right: Support + Social */}
            <div className="flex-1 flex flex-col items-start md:items-end">
              <div className="font-semibold text-gray-800 mb-2">Support</div>
              <div className="flex flex-col gap-2 text-sm mb-3">
                <Link href="/support" className="hover:underline text-gray-600">Contact Us</Link>
                <Link href="/faq" className="hover:underline text-gray-600">FAQ</Link>
                <Link href="/privacy" className="hover:underline text-gray-600">Privacy Policy</Link>
              </div>
              <div className="flex gap-4 mt-2">
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-emerald-500 transition"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg></a>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-emerald-500 transition"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M8 19c7.732 0 11.965-6.418 11.965-11.985 0-.183 0-.366-.012-.548A8.548 8.548 0 0022 4.59a8.19 8.19 0 01-2.357.646A4.118 4.118 0 0021.448 3.2a8.224 8.224 0 01-2.605.996A4.107 4.107 0 0015.448 2c-2.266 0-4.104 1.838-4.104 4.104 0 .322.036.636.106.936C7.728 6.89 4.1 5.13 1.671 2.149a4.073 4.073 0 00-.555 2.064c0 1.425.726 2.683 1.832 3.422A4.093 4.093 0 012 6.575v.052c0 1.99 1.416 3.648 3.293 4.025a4.1 4.1 0 01-1.852.07c.522 1.63 2.037 2.816 3.833 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-emerald-500 transition"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} CharityConnect. All rights reserved. Made with <span className="text-emerald-500">💚</span> for a better world.
          </div>
        </footer>
        <style jsx global>{`
          .animate-float {
            animation: float 4s ease-in-out infinite alternate;
          }
          .animate-float-slow {
            animation: float 7s ease-in-out infinite alternate;
          }
          @keyframes float {
            0% { transform: translateY(0px) scale(1); }
            100% { transform: translateY(-20px) scale(1.1); }
          }
          .animate-fade-in {
            animation: fadeIn 1s;
          }
          .animate-pulse {
            animation: pulse 2s infinite;
          }
          .animate-bounce-slow {
            animation: bounceSlow 2.5s infinite alternate;
          }
          .animate-gradient-text {
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounceSlow {
            0% { transform: translateY(0); }
            100% { transform: translateY(-16px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          .animate-step-in {
            animation: fadeIn 1s;
          }
        `}</style>
      </main>
    </>
  );
}
