import { Clock, AlertTriangle } from "lucide-react";

interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
}

export default function TimerDisplay({
  timeLeft,
  totalTime,
}: TimerDisplayProps) {
  const timePercentage = (timeLeft / totalTime) * 100;
  const isTimeWarning = timePercentage <= 25;
  const isTimeCritical = timePercentage <= 10;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock
            className={`w-5 h-5 ${
              isTimeCritical
                ? "text-red-600"
                : isTimeWarning
                ? "text-orange-600"
                : "text-blue-600"
            }`}
          />
          <span className="font-medium text-gray-700">Time Remaining</span>
        </div>
        <div
          className={`text-xl font-bold ${
            isTimeCritical
              ? "text-red-600"
              : isTimeWarning
              ? "text-orange-600"
              : "text-blue-600"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${
            isTimeCritical
              ? "bg-red-600"
              : isTimeWarning
              ? "bg-orange-500"
              : "bg-blue-600"
          }`}
          style={{ width: `${timePercentage}%` }}
        />
      </div>

      {isTimeWarning && (
        <div className="flex items-center gap-2 mt-2 text-sm text-orange-600">
          <AlertTriangle className="w-4 h-4" />
          <span>Time is running out! Please submit your answers soon.</span>
        </div>
      )}
    </div>
  );
}
