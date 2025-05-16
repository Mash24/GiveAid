import Head from 'next/head';
import Link from 'next/link';

const categories = [
  { name: 'Medical', color: 'bg-green-100', icon: '🩺' },
  { name: 'Emergency', color: 'bg-red-100', icon: '🚨' },
  { name: 'Education', color: 'bg-blue-100', icon: '🎓' },
  { name: 'Animal', color: 'bg-yellow-100', icon: '🐾' },
  { name: 'Business', color: 'bg-purple-100', icon: '💼' },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>CharityConnect | Powerful fundraisers start here</title>
        <meta name="description" content="Raise money for yourself, loved ones, or causes you care about. CharityConnect makes it easy to give and get help." />
      </Head>
      <main className="relative bg-white min-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center relative">
          {/* SVG background */}
          <div className="absolute inset-0 pointer-events-none select-none">
            <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-64 opacity-20">
              <path fill="#34d399" fillOpacity="0.2" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 relative z-10">
            Powerful fundraisers start here
          </h1>
          <p className="text-lg text-gray-600 mb-8 relative z-10">
            Raise money for yourself, loved ones, or causes you care about.
          </p>
          <Link href="/dashboard/donate-money" className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold shadow-lg hover:bg-green-700 transition relative z-10">
            Start a Fundraiser
          </Link>
          {/* Category Bubbles */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 relative z-10">
            {categories.map(cat => (
              <div key={cat.name} className="flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full ${cat.color} flex items-center justify-center shadow-md mb-2 text-3xl`}>{cat.icon}</div>
                <span className="text-gray-700 font-medium text-lg">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Discover Section */}
        <div className="max-w-5xl mx-auto mt-20 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Discover fundraisers to support</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Example featured cards (replace with dynamic data later) */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl mb-3">🩺</div>
              <h3 className="font-semibold text-lg mb-1">Help John with Surgery</h3>
              <p className="text-gray-500 text-sm mb-2">Medical • Nairobi</p>
              <p className="text-gray-700 text-center mb-4">John needs urgent surgery. Your support can save his life.</p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition">Donate</button>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl mb-3">🎓</div>
              <h3 className="font-semibold text-lg mb-1">Sponsor a Student</h3>
              <p className="text-gray-500 text-sm mb-2">Education • Kisumu</p>
              <p className="text-gray-700 text-center mb-4">Help a bright student stay in school and achieve their dreams.</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition">Donate</button>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-2xl mb-3">🐾</div>
              <h3 className="font-semibold text-lg mb-1">Rescue Stray Animals</h3>
              <p className="text-gray-500 text-sm mb-2">Animal • Mombasa</p>
              <p className="text-gray-700 text-center mb-4">Support our mission to rescue and care for stray animals.</p>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-full font-medium hover:bg-yellow-700 transition">Donate</button>
            </div>
          </div>
        </div>
        {/* Privacy Notice */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded-xl px-6 py-4 flex items-center gap-4 z-50 max-w-lg w-full">
          <span className="text-gray-500 text-sm">We use cookies and similar technologies to improve your experience. By using our site, you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link>.</span>
          <button className="ml-auto px-4 py-1 bg-gray-100 rounded-full text-gray-700 font-medium hover:bg-gray-200 transition">Okay</button>
        </div>
      </main>
    </>
  );
} 