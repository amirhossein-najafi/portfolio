"use client";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MotionProvider } from "@/components/MotionProvider";
import { Preloader } from "@/components/Preloader";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export default function Home() {
  return (
    <LanguageProvider>
      <MotionProvider>
        <div className="site-shell flex min-h-full flex-col">
          <Preloader />
          <CustomCursor />
          <Header />
          <main id="main" className="flex-1">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Contact />
          </main>
          <Footer />
        </div>
      </MotionProvider>
    </LanguageProvider>
  );
}
