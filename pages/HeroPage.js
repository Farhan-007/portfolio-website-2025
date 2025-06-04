import Image from "next/image";
// import avatar from "@/public/avatar.png"; // Replace with your path

export default function HeroSection() {
    return (
        <section id="hero" className="bg-[#191919] border-4 border-dashed border-[#414141] rounded-4xl p-6 md:p-16 lg:mt-8 mt-2 text-white w-full max-w-7xl">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                {/* Text Left */}
                <div className="flex-1 flex flex-col justify-between gap-20">
                    <div className="space-y-4 text-center lg:text-left">
                        <p className="text-2xl md:text-5xl font-semibold font-mono">
                            Pixel-perfect <span className="text-green-600 font-extrabold">layouts</span>
                        </p>
                        <p className="text-2xl md:text-5xl font-semibold font-mono">
                            Seamless <span className="text-yellow-400 font-extrabold">task flows</span>
                        </p>
                        <p className="text-2xl md:text-5xl font-semibold font-mono">
                            Built with <span className="text-red-500 font-extrabold">systems.</span>
                        </p>
                        <p className="text-2xl md:text-5xl font-semibold font-mono">
                            Tested for <span className="text-sky-400 font-extrabold">humans.</span>
                        </p>
                    </div>

                    {/* Links */}
                    <div className="mt-8 md:flex hidden gap-8 ">
                        <a href="#" className="group text-white font-medium text-xl relative">
                            Behance ↗
                            <span className="block w-full h-0.5 bg-white mt-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        </a>
                        <a href="#" className="group text-white font-medium text-xl relative">
                            LinkedIn ↗
                            <span className="block w-full h-0.5 bg-white mt-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        </a>
                    </div>
                </div>

                {/* Avatar Right */}
                <div className="flex w-max">
                    <div className="transition-all duration-300 ease-in-out rounded-2xl overflow-hidden -rotate-10 hover:rotate-10 shadow-lg border-2 border-white">
                        <Image
                            src={'/images/image.png'}
                            alt="avatar"
                            width={250}
                            height={250}
                            className="md:w-72 md:h-72 object-cover"
                        />
                        {/* <img src="/images/image.png" className="md:w-72 md:h-72 object-cover" /> */}
                        {/* <span className="block w-48 h-48"></span> */}
                    </div>
                </div>
                {/* Links */}
                <div className="mt-8 flex md:hidden gap-8 ">
                    <a href="#" className="group text-white font-medium text-xl relative">
                        Github ↗
                        <span className="block w-full h-0.5 bg-white mt-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </a>
                    <a href="#" className="group text-white font-medium text-xl relative">
                        LinkedIn ↗
                        <span className="block w-full h-0.5 bg-white mt-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </a>
                </div>
            </div>
        </section>
    );
}
