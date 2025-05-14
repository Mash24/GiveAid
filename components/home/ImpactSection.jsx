// /components/home/ImpactSection.jsx
const ImpactSection = () => {
    const stats = [
      { value: '1,000+', label: 'Items Donated' },
      { value: '$50,000+', label: 'Money Raised' },
      { value: '500+', label: 'Volunteers' },
    ];
  
    return (
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Impact
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Together, we've made a difference in countless lives.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="mt-2 text-lg text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ImpactSection;