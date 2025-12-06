"use client";

import { Heart, ArrowRight } from "lucide-react";

export function Footer() {
    return (
        <footer className='bg-background relative overflow-hidden border-t'>
            {/* Background elements */}
            <div className='absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent' />
            <div className='absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20' />

            {/* Main CTA Section */}
            <div className='relative z-10 text-center px-6 py-32'>
                {/* Badge */}
                <div className='flex justify-center mb-8'>
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 backdrop-blur-xl border border-border text-muted-foreground text-sm font-medium'>
                        Loved by students and working professionals 💎
                    </div>
                </div>

                {/* Main Headline */}
                <h2 className='text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight'>
                    Make your academic and
                    <br />
                    professional life easier with
                    <br />
                    <span className='bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                        AskMyPDF
                    </span>
                </h2>

                {/* CTA Button */}
                <button className='group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-lg rounded-full font-semibold hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:opacity-90'>
                    Start for free
                    <ArrowRight className='w-5 h-5' />
                </button>
            </div>

            {/* Bottom Credit Section */}
            <div className='relative z-10 border-t border-border'>
                <div className='max-w-7xl mx-auto px-6 py-8'>
                    <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
                        {/* Made with love */}
                        <div className='flex items-center gap-2 text-muted-foreground'>
                            <span>Made with</span>
                            <Heart className='w-4 h-4 text-pink-500 fill-pink-500 animate-pulse' />
                            <span>by</span>
                            <span className='font-semibold text-foreground'>Saksham</span>
                        </div>

                        <span className='text-muted-foreground/40'>•</span>

                        {/* Contact */}
                        <a href='https://www.linkedin.com/in/sakshamgarg782/' className='text-muted-foreground hover:text-foreground transition-colors text-sm'>
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}