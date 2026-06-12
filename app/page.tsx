import React from "react";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Projects from "./Components/Projects";
import Services from "./Components/Services";
import Contact from "./Components/Contact";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Services />
      <Contact />
    </div>
  );
};

export default HomePage;
