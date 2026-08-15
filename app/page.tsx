import React from "react";
import Hero from "./Components/Hero";

import Projects from "./Components/Projects";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import { GoogleTagManager } from "@next/third-parties/google";
import FAQ from "./Components/Faq";
import WhyItMatters from "./Components/Matters";

const HomePage = () => {
  return (
    <>
      <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GA}`} />
      <div>
        <Hero />
        <WhyItMatters />

        <Projects />
        <Services />
        <Contact />
        <FAQ />
      </div>
    </>
  );
};

export default HomePage;
