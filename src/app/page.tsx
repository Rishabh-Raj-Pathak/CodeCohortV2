import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Image from "next/image";
import Link from "next/link";
import { BackgroundBeamsWithCollisionDemo } from "../components/ui/BackgroundBeamsWithCollisionDemo";
import { HeroScrollDemo } from "@/components/ui/HeroScrollDemo";
import { HeroParallaxDemo } from "@/components/ui/HeroParallaxDemo";
import { GlobeDemo } from "@/components/ui/GlobeDemo";
import Footer from "@/components/ui/Footer";

export default function LandingPage() {
  return (
    <div className="">
      <BackgroundBeamsWithCollisionDemo/>

      <HeroScrollDemo/>
      <HeroParallaxDemo/>
      <Footer/>
    </div>
  );
}