// /components/home/TestimonialsSection.jsx
const TestimonialsSection = () => {
    const testimonials = [
      {
        name: 'John Doe',
        role: 'Donor',
        initials: 'JD',
        quote: 'CharityConnect made it so easy to donate my items. The pickup service was convenient and the impact was immediate.',
      },
      {
        name: 'Jane Smith',
        role: 'Volunteer',
        initials: 'JS',
        quote: 'Volunteering with CharityConnect has been one of the most rewarding experiences of my life.',
      },
      {
        name: 'Robert Johnson',
        role: 'Beneficiary',
        initials: 'RJ',
        quote: 'The support I received through CharityConnect helped me get back on my feet during a difficult time.',
      },
    ];
  
    return (
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What People Say
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Hear from our donors and beneficiaries
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      {testimonial.initials}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default TestimonialsSection;