import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Programs from "@/components/landing/Programs";
import Tracks from "@/components/landing/Tracks";
import Contact from "@/components/landing/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Programs />
        <Tracks />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
