import { useEffect, useState } from 'react';

export default function Loader() {
  // For animated progress bar
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 1 + Math.random() * 2), 20);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 overflow-hidden">
      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="absolute left-10 top-10 text-4xl opacity-20 animate-float-slow">💚</span>
        <span className="absolute right-16 top-24 text-3xl opacity-20 animate-float">🤲</span>
        <span className="absolute left-1/3 bottom-12 text-5xl opacity-10 animate-float">💸</span>
        <span className="absolute right-1/4 bottom-20 text-4xl opacity-10 animate-float-slow">❤️</span>
      </div>
      {/* Spinner */}
      <div className="relative mb-6">
        <div className="h-20 w-20 rounded-full border-8 border-t-green-400 border-b-blue-400 border-l-purple-400 border-r-yellow-300 animate-spin shadow-xl bg-white bg-opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="h-10 w-10 text-green-400 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      {/* Uplifting message */}
      <div className="text-xl font-semibold text-gray-700 mb-2 animate-fade-in">Making a difference, just a moment…</div>
      <div className="text-sm text-gray-400 mb-6 animate-fade-in delay-200">Thank you for your patience. Your kindness is changing lives!</div>
      {/* Animated progress bar */}
      <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner animate-fade-in delay-300">
        <div
          className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
