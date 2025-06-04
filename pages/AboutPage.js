'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const colors = [
    "bg-gradient-to-tr from-red-500 via-pink-500 to-yellow-400",
    "bg-gradient-to-tr from-blue-500 via-teal-500 to-green-500",
    "bg-gradient-to-tr from-green-500 via-yellow-400 to-red-500",
    "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500",
    "bg-gradient-to-tr from-purple-500 via-red-200 to-blue-500",
    "bg-gradient-to-tr from-pink-500 via-yellow-400 to-green-500",
    "bg-gradient-to-tr from-teal-500 via-blue-500 to-purple-500"
];

const sentence = "Hello! I'm Farhan,"
const description =
    'Product designer based in 🇮🇳, focused on creating clean, user-first experiences that balance visual clarity with functional impact.'

const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.4,
            ease: 'easeOut',
        },
    }),
}

export default function AboutPage() {

    const containerRef = useRef(null);
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: '-50px' })


    // Trigger when center/bottom of container is in view
    const containerInView = useInView(containerRef, {
        once: false,
        margin: "-30% 100px -20%", // tweak to control sensitivity
    });
    return (
        <div className="relative overflow-hidden flex flex-col items-center w-full max-w-7xl rounded-4xl p-6 md:p-16 bg-black text-white">
            <div ref={ref} className="flex flex-col w-full gap-8">
                <motion.p className="md:text-5xl text-4xl font-semibold flex flex-wrap">
                    {sentence.split(' ').map((word, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={wordVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="mr-2"
                        >
                            <span className={word.includes('Hello!') ? 'text-[#f64e25]' : ''}>{word}</span>
                        </motion.span>
                    ))}
                </motion.p>

                <p className="md:text-3xl text-2xl font-bold flex flex-wrap max-w-2xl">
                    {description.split(' ').map((word, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={wordVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="mr-2"
                        >
                            <span>{word}</span>
                        </motion.span>
                    ))}
                </p>
            </div>

            {/* Cards */}
            <div className="relative w-full md:mt-60 mt-20 md:h-[500px] h-40"> {/* Set a height */}
                {colors.map((color, i) => (
                    <AnimatedCard
                        key={i}
                        index={i}
                        color={color}
                        isInView={containerInView}
                    />
                ))}
                <div
                    ref={containerRef}
                    className='h-100 absolute md:top-14 -top-[80%]'
                />
            </div>

        </div>
    );
}

function AnimatedCard({ index, color, isInView }) {
    return (
        <>
            <motion.span
                className={`absolute hidden md:block left-1/2 transform -translate-x-1/2 aspect-[6/7] w-72 rounded-lg ${color}`}
                animate={{
                    rotate: isInView ? 0 : index * 4,
                    left: isInView ? `${(8 - index) * 15 - 30}vw` : undefined,
                    bottom: isInView ? `${(index + 1) * 80 - 140}px` : undefined,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <motion.span
                className={`absolute block md:hidden left-1/2 transform -translate-x-1/2  aspect-[6/7] w-30 rounded-lg ${color}`}
                animate={{
                    rotate: isInView ? 0 : index * 4,
                    left: isInView ? `${(8 - index) * 24 - 55}vw` : undefined,
                    bottom: isInView ? `${(index + 1) * 40 - 140}px` : undefined,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </>

    );
}