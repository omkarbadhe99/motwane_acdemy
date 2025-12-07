import { Users, TrendingUp, BookOpen, CheckCircle } from "lucide-react";

export default function MetricsCards() {
  const cards = [
    {
      icon: Users,
      value: "128",
      label: "Total Users",
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-l-4 border-purple-500",
    },
    {
      icon: TrendingUp,
      value: "18",
      label: "Active Users",
      color: "bg-orange-100",
      iconColor: "text-orange-600",
      borderColor: "border-l-4 border-orange-500",
    },
    {
      icon: BookOpen,
      value: "45",
      label: "Total Courses",
      color: "bg-pink-100",
      iconColor: "text-pink-600",
      borderColor: "border-l-4 border-pink-500",
    },
    {
      icon: CheckCircle,
      value: "89",
      label: "Active Courses",
      color: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-l-4 border-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`${card.borderColor} bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  {card.value}
                </div>
                <p className="text-gray-600 text-sm mt-2">{card.label}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon className={`${card.iconColor} h-6 w-6`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
