"use client";

import PartnerLogos from "@/components/Partners";
import AboutPage from "@/pages/AboutPage";
import HeroSection from "@/pages/HeroPage";
import WhatIDo from "@/pages/WhatIDo";
import Image from "next/image";
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Home() {

  const ref = useRef(null);
  const isInView = useInView(ref)
  return (
    <>
      <motion.dev
        className="fixed top-0 left-0 right-0 lg:rounded-3xl lg:m-3 lg:h-[calc(100dvh-1.25rem)] h-screen -z-10"
        initial={{ background: "#191919" }}
        animate={{
          background: isInView ? "#f64e25" : "#191919"
        }}
      ></motion.dev>
      {/* <div className=" flex flex-col items-center gap-5 mt-14 min-h-[200dvh] max-w-7xl"> */}
      {/* <div className="h-[50dvh] w-full my-4 max-w-7xl bg-cyan-300">

        </div> */}
      <HeroSection />
      <PartnerLogos />
      <AboutPage />
      <div ref={ref} className="w-full flex justify-center">
        <WhatIDo />
      </div>
      {/* <div className="h-screen"></div> */}
      {/* </div> */}
    </>
  );
}
