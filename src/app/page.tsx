import { BackgroundBeamsWithCollisionDemo } from "../components/ui/BackgroundBeamsWithCollisionDemo";
import { HeroScrollDemo } from "@/components/ui/HeroScrollDemo";
import { HeroParallaxDemo } from "@/components/ui/HeroParallaxDemo";

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