"use client";

import { Heart, ArrowRight } from "lucide-react";

export function Footer() {
    return (
        <footer className='bg-[#0a0a0f] relative overflow-hidden'>
            {/* Background elements */}
            <div className='absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent' />
            <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20' />

            {/* Main CTA Section */}
            <div className='relative z-10 text-center px-6 py-32'>
                {/* Badge */}
                <div className='flex justify-center mb-8'>
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/80 text-sm font-medium'>
                        Loved by students and working professionals 💎
                    </div>
                </div>

                {/* Main Headline */}
                <h2 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight'>
                    Make your academic and
                    <br />
                    professional life easier with
                    <br />
                    <span className='bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                        AskMyPDF
                    </span>
                </h2>

                {/* CTA Button */}
                <button className='group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-lg rounded-full font-semibold hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50'>
                    Start for free
                    <ArrowRight className='w-5 h-5' />
                </button>
            </div>

            {/* Bottom Credit Section */}
            <div className='relative z-10 border-t border-white/10'>
                <div className='max-w-7xl mx-auto px-6 py-8'>
                    <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
                        {/* Made with love */}
                        <div className='flex items-center gap-2 text-white/60'>
                            <span>Made with</span>
                            <Heart className='w-4 h-4 text-pink-500 fill-pink-500 animate-pulse' />
                            <span>by</span>
                            <span className='font-semibold text-white'>Saksham</span>
                        </div>

                        <span className='text-white/40'>•</span>

                        {/* Contact */}
                        <a href='https://www.linkedin.com/in/sakshamgarg782/' className='text-white/60 hover:text-white transition-colors text-sm'>
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}