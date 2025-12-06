"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Glow */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
            Ask Questions
            <br />
            from Your PDFs
            <span className="text-purple-500"> Instantly.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
            Upload PDFs and get instant answers powered by AI — save hours,
            understand documents faster, and work smarter.
          </p>

          <Button
            asChild
            className="px-6 py-5 text-base rounded-xl transition-colors w-fit"
          >
            <Link href="/sign-in">Try Now</Link>
          </Button>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          <div className="rounded-2xl p-2 bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl">
            <Image
              src="/placeholder.svg?height=500&width=700"
              alt="AI answering PDF questions"
              width={1200}
              height={800}
              className="rounded-xl"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
