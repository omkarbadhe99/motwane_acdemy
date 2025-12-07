import { questions } from "./types";

interface QuestionNavigatorProps {
  currentQuestion: number;
  selectedAnswers: { [key: number]: number | undefined };
  onNavigate: (idx: number) => void;
  timeLeft: number;
  totalTime: number;
}

export default function QuestionNavigator({
  currentQuestion,
  selectedAnswers,
  onNavigate,
  timeLeft,
  totalTime,
}: QuestionNavigatorProps) {
  const timePercentage = (timeLeft / totalTime) * 100;
  const isTimeCritical = timePercentage <= 10;
  const isTimeWarning = timePercentage <= 25;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow p-6 sticky top-4">
        <h3 className="font-semibold text-gray-800 mb-4">Questions</h3>

        <div className="grid grid-cols-5 gap-2 mb-6">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                currentQuestion === idx
                  ? "bg-[#086CB6] text-white shadow-md"
                  : selectedAnswers[idx] !== undefined
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-700 font-medium">Time Left:</span>
            <span
              className={`font-bold ${
                isTimeCritical
                  ? "text-red-600"
                  : isTimeWarning
                  ? "text-orange-600"
                  : "text-blue-600"
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-600"></div>
            <span className="text-gray-600">Current Question</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-100 border border-green-200"></div>
            <span className="text-gray-600">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-100"></div>
            <span className="text-gray-600">Unanswered</span>
          </div>
        </div>
      </div>
    </div>
  );
}
