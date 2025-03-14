import { BookOpen, Filter, Check } from "lucide-react";

const PhaseCard = ({ icon, iconColor, iconBg, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div
        className={`flex items-center justify-center h-16 w-16 rounded-full ${iconBg} ${iconColor} mb-4 mx-auto`}
      >
        <div className="h-8 w-8 flex justify-center items-center"> {icon} </div>
      </div>
      <h3 className="text-xl font-semibold text-center mb-3 text-teal-600">
        {title}
      </h3>
      <p className="text-gray-600 text-center mb-4">{description}</p>
    </div>
  );
};

const DietPhases = () => {
  const phases = [
    {
      icon: <BookOpen />,
      iconColor: "text-teal-500",
      iconBg: "bg-teal-100",
      title: "Understanding FODMAPs",
      description:
        "Learn about the science behind FODMAPs, why they trigger IBS symptoms, and how to manage them effectively for better digestive health.",
    },
    {
      icon: <Filter />,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-100",
      title: "Elimination Phase",
      description:
        "Follow a strict 2-6 week plan to remove high FODMAP foods from your diet. This helps reset your gut and identify symptom triggers.",
    },
    {
      icon: <Check />,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
      title: "Reintroduction",
      description:
        "Gradually reintroduce specific FODMAP groups in a structured way to determine your personal tolerance levels and trigger foods.",
    },
  ];

  return (
    <>
      {phases.map((phase, index) => (
        <PhaseCard
          key={index}
          icon={phase.icon}
          iconColor={phase.iconColor}
          iconBg={phase.iconBg}
          title={phase.title}
          description={phase.description}
        />
      ))}
    </>
  );
};

export default DietPhases;
