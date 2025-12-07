"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { ChevronLeft } from "lucide-react";

import TimerDisplay from "./components/TimerDisplay";
import QuestionCard from "./components/QuestionCard";
import QuestionNavigator from "./components/QuestionNavigator";
import ResultScreen from "./components/ResultScreen";
import { questions, TIME_LIMIT, QAAnswers } from "./components/types";

export default function IOTAssessmentPage() {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<QAAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(TIME_LIMIT);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(2);

  const correctAnswers: { [key: number]: number } = {
    0: 0,
    1: 1,
    2: 2,
    3: 2,
    4: 1,
  };

  // Timer
  useEffect(() => {
    if (isSubmitted || isTimeUp) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, isTimeUp]);

  const handleAutoSubmit = () => {
    setIsSubmitted(true);
    console.log("Auto-submitted:", selectedAnswers);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((p) => p + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((p) => p - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    console.log("Submitted:", selectedAnswers);
  };

  const handleQuestionNav = (index: number) => setCurrentQuestion(index);

  const computeScore = () => {
    const answeredKeys = Object.keys(selectedAnswers).map(Number);
    let correctCount = 0;
    for (const qIdx of answeredKeys) {
      if (selectedAnswers[qIdx] === correctAnswers[qIdx]) correctCount++;
    }
    const percent = Math.round((correctCount / questions.length) * 100);
    return { correctCount, percent };
  };

  const { percent: scorePercent } = computeScore();
  const isPassed = scorePercent >= 50;
  const answeredQuestions = Object.keys(selectedAnswers).length;

  const handleTryAgain = () => {
    if (attemptsLeft <= 0) {
      router.push("/courses/1");
      return;
    }
    setAttemptsLeft((a) => a - 1);
    setIsSubmitted(false);
    setIsTimeUp(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(TIME_LIMIT);
  };

  const handleDownloadCertificate = () => {
    if (typeof window !== "undefined") {
      window.open("/certificate.pdf", "_blank");
    }
  };

  // ---------- Result Screen ----------
  if (isSubmitted || isTimeUp) {
    return (
      <ResultScreen
        isPassed={isPassed}
        scorePercent={scorePercent}
        attemptsLeft={attemptsLeft}
        onTryAgain={handleTryAgain}
        onBackToCourse={() => router.push("/courses/1")}
        onDownloadCertificate={handleDownloadCertificate}
      />
    );
  }

  // ---------- Main Assessment UI ----------
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="w-4 h-4" /> Go Back
          </Button>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">IOT-ASSESSMENT</h1>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
              <span>I/S</span>
              <span>•</span>
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
          </div>

          <div className="w-20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <TimerDisplay timeLeft={timeLeft} totalTime={TIME_LIMIT} />

              <QuestionCard
                currentQuestion={currentQuestion}
                selectedAnswers={selectedAnswers}
                onOptionSelect={handleOptionSelect}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit}
                answeredCount={answeredQuestions}
              />
            </Card>
          </div>

          {/* Sidebar */}
          <QuestionNavigator
            currentQuestion={currentQuestion}
            selectedAnswers={selectedAnswers}
            onNavigate={handleQuestionNav}
            timeLeft={timeLeft}
            totalTime={TIME_LIMIT}
          />
        </div>
      </div>
    </main>
  );
}
