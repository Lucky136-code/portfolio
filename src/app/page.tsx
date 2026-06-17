"use client";

import dynamic from "next/dynamic";

const CinematicCanvas = dynamic(() => import("@/components/CinematicCanvas"), {
  ssr: false,
});

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});

import HeroIntro from "@/components/HeroIntro";
import Origin from "@/components/Origin";
import CommandCenter from "@/components/CommandCenter";
import Archives from "@/components/Archives";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
      {/* Widescreen Cinematic Letterbox Frame (z-99) */}
      <div className="cinematic-frame" />

      {/* Atmospheric Vignette Filter Overlay (z-40) */}
      <div className="vignette" />

      {/* 3D Skyline Canvas Background */}
      <CinematicCanvas />

      {/* Centered Top Floating Navbar */}
      <Navbar />

      {/* Smooth Scroll Content Container */}
      <SmoothScroll>
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Hero Section */}
          <HeroIntro />

          {/* About Me Section (Centered Titles) */}
          <Origin />

          {/* Skills Section (Centered Titles) */}
          <CommandCenter />

          {/* Projects Section (Centered Titles) */}
          <Archives />

          {/* Certifications Section (Centered Titles) */}
          <Certifications />

          {/* Contact & Footer Section (Centered Titles) */}
          <Contact />
        </div>
      </SmoothScroll>
    </div>
  );
}
