const testimonials = [
  {
    quote:
      "This bike rental service is fantastic! The process was quick, and the bikes were in excellent condition.",
    name: "John Doe",
    location: "New York, USA",
  },
  {
    quote:
      "I had an amazing experience renting a bike here. The customer service was top-notch.",
    name: "Jane Smith",
    location: "London, UK",
  },
  {
    quote:
      "Affordable prices and great quality bikes. Highly recommend this service!",
    name: "Carlos Rivera",
    location: "Madrid, Spain",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
              <h5 className="font-semibold text-gray-800">
                {testimonial.name}
              </h5>
              <p className="text-gray-500">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
