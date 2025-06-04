"use client"

import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

const logos = [
    { num: "20+", word: "satisfied clients" },
    { num: "32+", word: "projects delivered" },
    { num: "2+", word: "years of experience" },
    { num: ">90%", word: "client retention rate" },
    // Add more as needed
];

const PartnerLogos = () => {
    const containerRef = useRef(null);
    const x = useRef(0);

    //   Animate frame-by-frame
    useAnimationFrame((t, delta) => {
        if (containerRef.current) {
            x.current -= delta * 0.10; // Speed control
            if (x.current <= -containerRef.current.scrollWidth / 2) {
                x.current = 0;
            }
            containerRef.current.style.transform = `translateX(${x.current}px)`;
        }
    });

    return (
        <section className="md:py-14 py-10 w-full max-w-7xl overflow-hidden">
            <div className="relative w-screen overflow-hidden">
                <motion.div
                    ref={containerRef}
                    className="flex whitespace-nowrap will-change-transform"
                >
                    {[...logos, ...logos].map((logo, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between transition  min-w-max text-gray-300 text-xl lg:text-3xl font-bold"
                        >
                            <span className="text-[#f64e25] rounded-full">#</span>
                            <p className="text-[#f64e25] ml-32 mr-3">{logo.num}</p>
                            <p className="mr-32">{logo.word}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PartnerLogos;
