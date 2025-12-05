import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h1
              className="text-pretty text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl animate-fade-in-up"
              style={{ animationDuration: "600ms", animationDelay: "60ms", animationFillMode: "both" }}
            >
              Ask Questions from Your PDFs Instantly
            </h1>
            <p
              className="text-muted-foreground text-lg leading-relaxed md:text-xl animate-fade-in-up"
              style={{ animationDuration: "700ms", animationDelay: "120ms", animationFillMode: "both" }}
            >
              Upload your PDFs and get instant answers using AI. Save time, find insights faster, and work smarter.
            </p>
            <div
              className="flex flex-wrap items-center gap-4 animate-fade-in-up"
              style={{ animationDuration: "800ms", animationDelay: "180ms", animationFillMode: "both" }}
            >
              <Button
                asChild
                className="rounded-lg px-6 py-6 text-base md:text-lg transition-transform hover:scale-105"
              >
                <Link href="/sign-in" aria-label="Try AskMyPDF now">
                  Try Now
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="rounded-xl border bg-card shadow-sm">
              <Image
                src={"/placeholder.svg?height=400&width=600&query=pdf-ai-illustration"}
                alt="Illustration showing AI answering questions from uploaded PDFs"
                width={1200}
                height={800}
                className="h-auto w-full rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
