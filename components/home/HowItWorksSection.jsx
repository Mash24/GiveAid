// /components/home/HowItWorksSection.jsx
const HowItWorksSection = () => {
    const steps = [
      {
        number: 1,
        title: 'Sign Up',
        description: 'Create your account and choose how you want to help.',
      },
      {
        number: 2,
        title: 'Make Your Donation',
        description: 'Donate items or money through our secure platform.',
      },
      {
        number: 3,
        title: 'Track Impact',
        description: 'See how your contribution makes a difference in real-time.',
      },
    ];
  
    return (
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Making a difference is easier than you think
            </p>
          </div>
          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {steps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <span className="text-lg font-bold">{step.number}</span>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HowItWorksSection;