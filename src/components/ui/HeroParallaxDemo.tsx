"use client";
import React from "react";
import { HeroParallax } from "../ui/hero-parallax";
import img1 from "../../public/video-img3.png";
import img2 from "../../public/video-img12.png";
import img4 from "../../public/video-img4.png";
import img5 from "../../public/video-img5.png";
import img6 from "../../public/video-img6.png";
import img7 from "../../public/video-img7.png";
import img8 from "../../public/video-img8.png";
import img9 from "../../public/video-img9.png";
import img10 from "../../public/video-img10.png";
import img11 from "../../public/video-img11.png";
import { StaticImageData } from "next/image";

interface Product {
  title: string;
  link: string;
  thumbnail: StaticImageData; 
}

export function HeroParallaxDemo() {

  return <HeroParallax products={products} />;
}
export const products:Product[] = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: img1,
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: img2,
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: img4,
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: img5,
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:img6,
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: img10,
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: img7,
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:img11,
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail: img8,
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail: img9,
  },
];
