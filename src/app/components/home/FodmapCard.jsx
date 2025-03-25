const FodmapCard = ({ title, color, icon, foodItems }) => {
  const bgColor =
    {
      green: "bg-green-50 border-green-500",
      yellow: "bg-yellow-50 border-yellow-500",
      red: "bg-red-50 border-red-500",
    }[color] || "bg-gray-50 border-gray-500";

  const iconBgColor =
    {
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      red: "bg-red-500",
    }[color] || "bg-gray-500";

  const dotColor =
    {
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      red: "bg-red-500",
    }[color] || "bg-gray-500";

  return (
    <div className={`rounded-lg p-6 border-l-4 ${bgColor}`}>
      <div className="flex items-center mb-4">
        <div
          className={`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center`}
        >
          {icon}
        </div>
        <h3 className="ml-3 text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <ul className="space-y-2 text-gray-700">
        {foodItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className={`w-2 h-2 ${dotColor} rounded-full mr-2`}></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FodmapCard;
