import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

interface ResultScreenProps {
  isPassed: boolean;
  scorePercent: number;
  attemptsLeft: number;
  onTryAgain: () => void;
  onBackToCourse: () => void;
  onDownloadCertificate: () => void;
}

export default function ResultScreen({
  isPassed,
  scorePercent,
  attemptsLeft,
  onTryAgain,
  onBackToCourse,
  onDownloadCertificate,
}: ResultScreenProps) {
  const imgSrc = isPassed ? "/success.png" : "/failed.png";

  return (
    <main className="container mx-auto px-4 py-12 mt-12">
      <div className="max-w-2xl mx-auto">
        <h1
          className={`text-4xl font-bold mb-2 text-center ${
            isPassed ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPassed ? "Congratulations!" : "Try Again!"}
        </h1>

        <Card className="text-center shadow-lg border">
          <div className="">
            <p className="text-black text-xl">Thanks For Participating</p>
          </div>

          <div className="mb-4 flex items-baseline gap-2 justify-center">
            <p className="text-lg text-gray-700 font-medium">Your Score:</p>
            <p
              className={`text-lg font-extrabold ${
                isPassed ? "text-green-600" : "text-red-600"
              }`}
            >
              {scorePercent}%
            </p>
          </div>

          <div className="mb-6">
            <p className="text-black text-xl">
              {isPassed
                ? "You Have Successfully Completed the course"
                : `Assessment Failed. ${attemptsLeft} Attempt${
                    attemptsLeft === 1 ? "" : "s"
                  } Remaining.`}
            </p>
          </div>

          <div className="mb-6">
            <img
              src="/Thesis-amico.png"
              alt={isPassed ? "Success" : "Failed"}
              className="mx-auto w-40 h-auto"
            />
          </div>

          {/* --- BUTTON AREA --- */}
          <div className="flex justify-center gap-4">
            {isPassed ? (
              <>
                <Button
                  onClick={onDownloadCertificate}
                  className="bg-[#029F92] hover:bg-[#029F92] cursor-pointer text-white px-5"
                >
                  Download Certificate
                </Button>

                <Button
                  onClick={onBackToCourse}
                  className="bg-[#0D6CB3] hover:bg-[#0B5C98] cursor-pointer text-white px-5"
                >
                  Back To Course
                </Button>
              </>
            ) : (
              // ❗ FAILED CASE — Try Again button REMOVED
              <Button
                onClick={onBackToCourse}
                className="bg-[#0D6CB3] hover:bg-[#0B5C98] cursor-pointer text-white px-5"
              >
                Back To Course
              </Button>
            )}
          </div>

          <p className="mt-6 text-xs text-gray-500">
            {isPassed
              ? "Certificate will be available for download."
              : "Please review the course material and try again later."}
          </p>
        </Card>
      </div>
    </main>
  );
}
