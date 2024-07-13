// src/components/Home/Home.jsx
import React from "react";
import Hero from "../Hero/Hero";
import About from "../About/About";
import Services from "../Services/Services";
import CarList from "../CarList/CarList";
import Testimonial from "../Testimonial/Testimonial";
import AppStoreBanner from "../AppStoreBanner/AppStoreBanner";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";

const Home = ({ theme }) => {
  return (
    <div id="home">
      <Hero theme={theme} />
      <About />
      <Services />
      <CarList />
      <Testimonial />
      <AppStoreBanner />
      <Contact />
    </div>
  );
};

export default Home;
