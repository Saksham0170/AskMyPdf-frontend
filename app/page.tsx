import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { AuthRedirect } from "@/components/AuthRedirect";
import { HomeHeader } from "@/components/HomeHeader";

export default function Home() {
  return (
    <>
      <AuthRedirect />
      <HomeHeader />
      <Hero />
      <Features />
    </>
  );
}
