import { Star } from "lucide-react";

const TestimonialCard = ({ name, memberSince, review, rating, bgColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className="h-5 w-5"
              fill={index < rating ? "#F4D35E" : "none"}
              stroke={index < rating ? "#F4D35E" : "gray"}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-600 italic mb-6">"{review}"</p>
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full ${bgColor}`}></div>
        <div className="ml-4">
          <h4 className="font-medium text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">Member since {memberSince}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
