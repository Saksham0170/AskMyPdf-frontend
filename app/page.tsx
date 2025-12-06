
import { AuthRedirect } from "@/components/AuthRedirect";
import { Navbar } from "@/components/Navbar";
import Features from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <AuthRedirect />
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <Hero />

        <Features />

        <Footer />
      </div>
    </>
  );
}
