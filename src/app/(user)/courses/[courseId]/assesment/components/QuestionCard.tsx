import { Button } from "@/src/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { questions } from "./types";

interface QuestionCardProps {
  currentQuestion: number;
  selectedAnswers: { [key: number]: number };
  onOptionSelect: (idx: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  answeredCount: number;
}

export default function QuestionCard({
  currentQuestion,
  selectedAnswers,
  onOptionSelect,
  onPrevious,
  onNext,
  onSubmit,
  answeredCount,
}: QuestionCardProps) {
  const currentAnswer = selectedAnswers[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {questions[currentQuestion].question}
        </h2>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onOptionSelect(idx)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                currentAnswer === idx
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    currentAnswer === idx
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {currentAnswer === idx && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="font-medium">
                  {String.fromCharCode(65 + idx)}. {option}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question Progress</span>
          <span>
            {Math.round(progress)}% ({currentQuestion + 1}/{questions.length})
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>

        <div className="text-sm text-gray-500">
          Answered: {answeredCount}/{questions.length}
        </div>

        {currentQuestion === questions.length - 1 ? (
          <Button
            onClick={onSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            Submit Assessment
          </Button>
        ) : (
          <Button
            onClick={onNext}
            className="bg-[#086CB6] hover:bg-[#065A9C] text-white flex items-center gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </>
  );
}
