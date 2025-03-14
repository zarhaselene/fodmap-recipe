// "use client";

// import React from "react";

// const FodmapCard = ({ title, color, icon, foodItems, description }) => {
//   const colorMap = {
//     green: {
//       iconBg: "bg-green-100",
//       iconColor: "text-green-600",
//       badgeBg: "bg-green-100",
//       badgeText: "text-green-800",
//       buttonColor: "text-green-600 hover:text-green-800",
//     },
//     yellow: {
//       iconBg: "bg-amber-100",
//       iconColor: "text-amber-600",
//       badgeBg: "bg-amber-100",
//       badgeText: "text-amber-800",
//       buttonColor: "text-amber-500 hover:text-amber-600",
//     },
//     red: {
//       iconBg: "bg-red-100",
//       iconColor: "text-red-600",
//       badgeBg: "bg-red-100",
//       badgeText: "text-red-800",
//       buttonColor: "text-red-600 hover:text-red-800",
//     },
//   };

//   const styles = colorMap[color];

//   // Make Icon work with either component or path
//   const IconComponent = typeof icon === "function" ? icon : null;

//   return (
//     <div
//       className={`rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden`}
//     >
//       <div className="p-5">
//         <div className="flex justify-between items-start mb-4">
//           <span
//             className={`inline-block ${styles.badgeBg} ${styles.badgeText} text-xs font-medium px-2.5 py-0.5 rounded-full`}
//           >
//             {color.charAt(0).toUpperCase() + color.slice(1)} FODMAP
//           </span>
//         </div>

//         <div className="flex items-center mb-4">
//           <div
//             className={`flex items-center justify-center h-12 w-12 rounded-full ${styles.iconBg} ${styles.iconColor}`}
//           >
//             {IconComponent ? (
//               <IconComponent className="h-6 w-6" />
//             ) : (
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d={icon}
//                 ></path>
//               </svg>
//             )}
//           </div>
//           <h3 className="ml-3 text-xl font-bold text-gray-900">{title}</h3>
//         </div>

//         {description && (
//           <p className="text-gray-600 text-sm mb-4">{description}</p>
//         )}

//         <div className="space-y-2 text-gray-600 mb-4">
//           {foodItems.map((item, index) => (
//             <div key={index} className="flex items-center">
//               <div
//                 className={`flex-shrink-0 h-2 w-2 rounded-full ${styles.iconBg} flex items-center justify-center mr-2`}
//               ></div>
//               <p className="text-gray-700">{item}</p>
//             </div>
//           ))}
//         </div>

//         <div className="pt-2 border-t border-gray-100">
//           <button
//             className={`font-medium text-sm inline-flex items-center ${styles.buttonColor}`}
//           >
//             View All Foods
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FodmapCard;
