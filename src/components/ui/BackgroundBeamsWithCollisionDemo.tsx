"use client";
import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { TypewriterEffectDemo } from "./TypewriterEffectDemo.tsx";

export function BackgroundBeamsWithCollisionDemo() {
  const router = useRouter();
  return (
    <BackgroundBeamsWithCollision>
      <div>
        <div className=" md:text-4xl lg:text-7xl mx-auto flex w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))] font-bold">
          <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">Welcome to CodeCohort</span>
          </div>
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="">Welcome to CodeCohort</span>
          </div>
        </div>

        <h2 className="text-4xl relative z-20  text-center text-black dark:text-white font-sans tracking-tight">
          <TypewriterEffectDemo/>
          {/* The Ultimate Developer Collaboration Platform{" "} */}
        </h2>
        <div>
          <h2 className="text-xl z-20 flex justify-center items-center px-[280px] text-center text-black font-sans tracking-tight dark:text-gray-500 mt-2">
            This platform is for sharing your screen and working with other
            random developers online so that you can work together
          </h2>
        </div>
        <div className="flex justify-center items-center mt-8">
          <Button
            onClick={() => router.push("/browse")}
            className="rounded-md bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)] px-3.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-xl p-6"
          >
            Get Started
          </Button>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
