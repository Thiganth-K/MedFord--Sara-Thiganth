import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Car, Layers, Video, Headphones } from "lucide-react"; // icons
import CardSwap, { Card } from '../components/CardSwap';

gsap.registerPlugin(ScrollTrigger);

// ---------------- HERO SECTION ----------------
const HeroSection = () => (
  <div className="h-screen bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center text-white">
    <div className="container mx-auto px-4 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold"
      >
        Our Expert Services
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-purple-200"
      >
        Delivering excellence and precision in every aspect of medical
        technology support and management.
      </motion.p>
    </div>
  </div>
);

// ---------------- ABOUT SECTION ----------------
const AboutSection = () => (
  <section className="min-h-screen bg-white flex items-center">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
      {/* Image on the left */}
      <div className="md:w-1/2 w-full flex justify-center mb-8 md:mb-0">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2c6c107?auto=format&fit=crop&w=700&q=80"
          alt="Car"
          className="max-w-lg w-full h-auto drop-shadow-lg"
        />
      </div>
      {/* Text content on the right */}
      <div className="md:w-1/2 w-full text-left">
        <h3 className="text-2xl font-light text-gray-500 mb-3">ABOUT US</h3>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Helping businesses{" "}
          <span className="bg-purple-200 px-2 rounded">succeed</span>{" "}
          through the power of video
          <span className="text-purple-700">.</span>
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-lg">
          Video is the future of business in this digital-focused world. We use
          video to change the way companies create content and communicate. We
          help organizations of all sizes humanize their communications and
          personalize their customer experience.
        </p>
      </div>
    </div>
  </section>
);

// ---------------- SERVICES DATA ----------------
const services = [
  {
    icon: <Car className="w-10 h-10 text-purple-600" />,
    title: "Consulting",
    desc: "Expert advice to help you streamline workflows and adopt the right solutions.",
  },
  {
    icon: <Layers className="w-10 h-10 text-purple-600" />,
    title: "Strategy",
    desc: "We craft strategies tailored to your goals for impactful digital presence.",
  },
  {
    icon: <Video className="w-10 h-10 text-purple-600" />,
    title: "Video Production",
    desc: "End-to-end video creation services to engage and inspire audiences.",
  },
  {
    icon: <Headphones className="w-10 h-10 text-purple-600" />,
    title: "Support",
    desc: "Dedicated support ensuring smooth delivery and lasting client success.",
  },
];

// ---------------- SERVICES SECTION ----------------
const ServicesSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side content */}
        <div>
          <h3 className="text-2xl font-light text-gray-500 mb-3">OUR SERVICES</h3>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Empowering businesses with{" "}
            <span className="bg-purple-200 px-2 rounded">world-class services</span>.
          </h2>
          <p className="text-lg text-gray-700 max-w-lg">
            From consulting to full-scale production, our services cover
            everything you need to thrive in today's fast-paced, digital-first
            world. We focus on innovation, creativity, and measurable results.
          </p>
        </div>

        {/* RIGHT SIDE CARD SWAP */}
        <div className="relative h-[250px] flex items-start justify-center">
          <CardSwap
            width={400}
            height={300}
            cardDistance={30}
            verticalDistance={25}
            delay={3000}
            pauseOnHover={true}
            skewAmount={4}
            easing="elastic"
            onCardClick={() => {}}
          >
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-white p-8 flex flex-col items-center justify-center text-center rounded-xl shadow-lg"
              >
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {service.desc}
                </p>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
};

// ---------------- MAIN PAGE ----------------
const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
    </div>
  );
};

export default ServicesPage;
