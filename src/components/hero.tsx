import { Button } from "@/src/components/ui/button";
import Image from "next/image";
export default function Hero() {
  return (
    <section
      className="text-white py-16 md:py-5 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(91.48deg, #00AF6F -35.17%, #01A781 9.67%, #0287C7 101.07%)",
      }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="flex-1 w-full">
          <h1 className="text-3xl md:text-5xl font-medium mb-4 text-balance">
            Motwane Academy
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 text-balance">
            Impowering excellence through digital learning
          </p>
          <Button className="bg-white text-teal-600 hover:bg-gray-100 font-semibold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg">
            Explore Now
          </Button>
        </div>

        {/* <div className="flex-1 hidden lg:flex items-center justify-center w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 w-full max-w-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 rounded-lg h-24 animate-pulse"></div>
              <div className="bg-white/20 rounded-lg h-24 animate-pulse"></div>
              <div className="bg-white/20 rounded-lg h-24 animate-pulse"></div>
              <div className="bg-white/20 rounded-lg h-24 animate-pulse"></div>
            </div>
          </div>
        </div> */}
        <div className="flex-1 hidden lg:flex items-center justify-center w-full">
          <div className="rounded-lg p-8 w-full max-w-sm">
            <div className="grid ">
              <div className="relative  w-full">
                <Image
                  src="/banner.png"
                  alt="Banner Image"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
