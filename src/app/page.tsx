"use client";
import { useState } from "react";
import { scrollToId } from "@/lib/scrollToId";
import HeroNeoBrutal from "@/components/HeroNeoBrutal";
import ScrollJourneyGasp from "@/components/ScrollJourneyGasp";
import QuickControls from "@/components/QuickControls";

export default function Page() {
  const [mood, setMood] = useState("cool");

  return (
    <main className="safe-bottom">
      <HeroNeoBrutal mood={mood} onStart={() => scrollToId("step-0")} />
      <ScrollJourneyGasp onMood={setMood} />
      <QuickControls />
    </main>
  );
}
