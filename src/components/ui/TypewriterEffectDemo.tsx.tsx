"use client";
import { TypewriterEffect } from "./typewriter-effect";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "The",
    },
    {
      text: "Ultimate",
    },
    {
      text: "Developer",
      className: "text-blue-500 dark:text-blue-500"
    },
    {
      text: "Collaboration",
      className: "text-blue-500 dark:text-blue-500"
    },
    {
      text: "Platform.",
      // className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center">
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
      </div>
    </div>
  );
}


    