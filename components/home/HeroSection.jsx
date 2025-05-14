// /components/home/HeroSection.jsx
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Make a Difference Today
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
            Join CharityConnect to donate items, money, or volunteer your time to help those in need.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/donate-item"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
            >
              Donate Items
            </Link>
            <Link
              href="/donate-money"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10"
            >
              Donate Money
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;