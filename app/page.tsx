import React from "react";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Projects from "./Components/Projects";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import { GoogleTagManager } from "@next/third-parties/google";
import FAQ from "./Components/Faq";

const HomePage = () => {
  return (
    <>
      <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GA}`} />
      <div>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Services />
        <Contact />
        <FAQ />
      </div>
    </>
  );
};

export default HomePage;
