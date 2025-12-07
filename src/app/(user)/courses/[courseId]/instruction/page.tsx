"use client";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { useRouter } from "next/navigation";

export default function InstructionPage() {
  const router = useRouter();

  return (
    <main className="container mx-auto px-4 py-12">
      <Card className="w-full p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#0D6CB3]">
          Test Instructions
        </h1>

        {/* Course Info */}
        <div className="mb-4 space-y-1 text-gray-700">
          <p className="mb-4">
            <span className="text-[#086CB6] font-medium">Course Name:</span> IOT
          </p>
          <p>
            <span className="font-medium text-[#086CB6]">About Test:</span>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-5">
            <li>This test comprises 3 questions in total.</li>
            <li>User will have 01 hour to complete this test.</li>
            <li>Only 10 free attempts allowed.</li>
          </ul>
        </div>

        {/* Instructions */}
        <div className="mb-6 text-gray-700 space-y-3 text-sm">
          <p className="font-medium text-[#0D6CB3]">
            Exam Instructions and Disclaimers:
          </p>

          <p>
            <span className="font-medium text-[#0D6CB3]">Part A:</span>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-5">
            <li>Make sure you have a good internet connection.</li>
            <li>Do not resize (minimize) browser during the test.</li>
            <li>
              Do not refresh the browser during the test. This will take you out
              of the test.
            </li>
            <li>
              Do not click the "Back" button during the test. This will take you
              out of the test.
            </li>
            <li>Do not begin until you are absolutely ready to start.</li>
            <li>
              During exam, questions will appear one by one after clicking
              "Next". After clicking Next, user cannot go back to previous
              question.
            </li>
            <li>
              Click the Agree button to start the test. This action is your
              agreement to all terms.
            </li>
          </ul>

          <p>
            <span className="font-medium text-[#0D6CB3]">Part B:</span>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-5">
            <li>Attempt all questions.</li>
            <li>No failures.</li>
          </ul>
        </div>

        {/* Agree Button */}
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={() => router.push("/courses/1/assesment")}
            className="w-full max-w-xs bg-[#0D6CB3] hover:bg-[#0B5A97] text-white cursor-pointer"
          >
            Agree & Start Test
          </Button>
        </div>
      </Card>
    </main>
  );
}
