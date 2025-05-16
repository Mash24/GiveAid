import ProtectedRoute from '../../components/layout/ProtectedRoute';
import DonateMoneyForm from '../../components/donate/DonateMoneyForm';

function QuoteCard() {
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-lg px-6 py-6 flex flex-col items-center border border-blue-100">
      <span className="text-3xl mb-2">“</span>
      <p className="text-lg text-gray-700 italic text-center">
        "Because of your support, my children can go to school and dream big. Thank you for believing in us."
      </p>
      <div className="mt-4 flex items-center gap-2">
        <img src="/images/beneficiary-avatar.png" alt="Beneficiary" className="h-8 w-8 rounded-full object-cover border-2 border-blue-200" />
        <span className="text-sm text-gray-500">— Amina, Nairobi</span>
      </div>
    </div>
  );
}

export default function DonateMoneyPage() {
  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center pb-16 overflow-x-hidden">
        {/* Hero Section */}
        <div className="w-full max-w-3xl mx-auto text-center pt-16 pb-8 px-4 relative z-10">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-6 shadow-lg mb-4 animate-fade-in">
              <span className="text-6xl">🤲</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 animate-fade-in">Donate to Make a Difference</h1>
            <p className="text-lg text-blue-700 font-medium animate-fade-in delay-100">Your support empowers real change.</p>
          </div>
          {/* Soft blob background */}
          <svg className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30 z-0" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <ellipse cx="300" cy="150" rx="300" ry="120" fill="#3B82F6" fillOpacity="0.12" />
          </svg>
        </div>

        {/* Donation Form Card */}
        <div className="w-full max-w-lg mx-auto z-10 animate-fade-in-fast">
          <DonateMoneyForm />
        </div>

        {/* Quote Card */}
        <QuoteCard />

        <style jsx global>{`
          .animate-fade-in {
            animation: fadeIn 0.7s;
          }
          .animate-fade-in-fast {
            animation: fadeIn 0.4s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
}
