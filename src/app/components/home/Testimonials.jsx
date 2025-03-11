import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Sarah T.",
    memberSince: "2023",
    review:
      "This website has been a lifesaver for me. After being diagnosed with IBS, I was lost until I found this resource. The recipes are delicious and the food database is so comprehensive!",
    rating: 5,
    bgColor: "bg-teal-200",
  },
  {
    name: "Michael K.",
    memberSince: "2022",
    review:
      "The AI recipe generator is amazing! It creates delicious meals based on what I have in my fridge, and I know they're safe for my digestion. I use this site every week for meal planning.",
    rating: 5,
    bgColor: "bg-orange-200",
  },
  {
    name: "Jamie L.",
    memberSince: "2024",
    review:
      "The educational resources helped me understand my condition better. I successfully completed the elimination phase and now I know exactly which foods trigger my symptoms.",
    rating: 4,
    bgColor: "bg-green-200",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-teal-700 mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
