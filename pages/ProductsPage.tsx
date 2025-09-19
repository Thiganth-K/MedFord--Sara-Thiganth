"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { BoltIcon, GlobeAltIcon, RocketLaunchIcon, EyeIcon } from "../components/Icons";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Intelligent Medical Washer Disinfector",
    description:
      "BLUVIA NEO is an advanced medical washer disinfector crafted to transform the way hospitals manage surgical instrument reprocessing. With its intelligent design and advanced engineering, it streamlines cleaning workflows, reduces turnaround time, and ensures the highest standards of safety and compliance. Purpose-built for modern CSSDs, BLUVIA NEO combines performance, precision, and reliability to support infection control while empowering healthcare teams with confidence and efficiency.",
    icon: BoltIcon,
    image: "/imgs/pr1.png",
  },
  {
    title: "High-Capacity Instrument Racks",
    description:
      "BLUVIA NEO is equipped with precision-engineered racks capable of handling upto 120 surgical instruments per cycle, allowing hospitals to process large volumes efficiently. This high-capacity system ensures quicker turnaround of surgical sets, reduces downtime, and optimizes the overall workflow in sterile services. By supporting consistent and thorough cleaning, it strengthens hospital infection control measures and enhances patient safety.",
    icon: GlobeAltIcon,
    image: "/imgs/pr2.png",
  },
  {
    title: "HEPA-Filtered Air Drying",
    description:
      "BLUVIA NEO is equipped with a 99.97% HEPA filtration system that delivers clean, particle-free air during the drying phase. This advanced mechanism ensures that every instrument is not only dry but also protected against microbial recontamination, preserving sterility until the next stage of processing. By eliminating residual moisture, the system prevents corrosion and extends the life of surgical instruments, giving hospitals a dependable solution for maintaining instrument integrity and safety.",
    icon: RocketLaunchIcon,
    image: "/imgs/pr3.png",
  },
  {
    title: "Advanced Disinfecting Solutions",
    description:
      "To achieve uncompromised cleaning performance, BLUVIA NEO utilizes a specialized combination of disinfecting agents.Together, these agents break down bioburden, neutralize residues, and ensure spotless results across diverse surgical instruments. This powerful cleaning chemistry, integrated with the machine’s precision-engineered cycles, enables consistent, repeatable, and ISO-compliant outcomes, making BLUVIA NEO a trusted solution for modern CSSDs and sterile processing departments worldwide.",
    icon: EyeIcon,
    image: "/imgs/pr3.png",
  },
  {
    title: "Integrated Digital Documentation",
    description:
      "BLUVIA NEO’s optimized interfaces implifies compliance by automatically recording sterilization and disinfection data via network or USB. Fully aligned with ISO standards, it offers complete traceability, seamless audit readiness, and transparent reporting for hospital infection control systems. This ensures not only operational efficiency but also confidence in meeting regulatory requirements and delivering safe healthcare outcomes.",
    icon: GlobeAltIcon,
    image: "/imgs/pr1.png",
  },
];

// --- Hero Section ---
const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/', { state: { scrollToContact: true } });
  };

  return (
    <div className="relative h-screen flex items-center justify-start text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="./videos/prd-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="z-10 px-4 text-left w-full max-w-2xl ml-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          BLUVIA Neo
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-lg md:text-xl max-w-2xl"
        >
          Engineered for safety, efficiency, and reliability.
        </motion.p>
        <button
          onClick={handleGetStarted}
          className="inline-block mt-8 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg text-lg transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

// --- Features Section with GSAP on Desktop ---
const ScrollingFeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    const ctx = gsap.context(() => {
      const featureCards = gsap.utils.toArray<Element>(".feature-card");
      const featureImages = gsap.utils.toArray<Element>(".feature-image");

      gsap.set(featureImages, { yPercent: 100 });
      gsap.set(featureImages[0], { yPercent: 0 });

      featureCards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setActiveIndex(index);
            if (index > 0) {
              gsap.to(featureImages[index - 1], {
                yPercent: -100,
                duration: 0.6,
                ease: "power2.inOut",
                overwrite: true,
              });
            }
            gsap.to(featureImages[index], {
              yPercent: 0,
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: true,
            });
          },
          onEnterBack: () => {
            setActiveIndex(index);
            if (index < featureImages.length - 1) {
              gsap.to(featureImages[index + 1], {
                yPercent: 100,
                duration: 0.6,
                ease: "power2.inOut",
                overwrite: true,
              });
            }
            gsap.fromTo(
              featureImages[index],
              { yPercent: -100 },
              {
                yPercent: 0,
                duration: 0.6,
                ease: "power2.inOut",
                overwrite: true,
              }
            );
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Key Features</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-600">
            Our products are built on a foundation of cutting-edge technology and unwavering commitment to safety.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Left side: Sticky Image */}
        <div className="hidden md:block sticky top-24 self-start h-[calc(100vh-8rem)]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            {features.map((feature, index) => (
              <img
                key={index}
                src={feature.image}
                alt={feature.title}
                className="feature-image absolute inset-0 w-full h-full object-cover"
              />
            ))}
          </div>
        </div>
        {/* Right side: Scrolling Content */}
        <div className="flex flex-col gap-12 md:gap-0">
          {features.map((feature, index) => (
            <div key={index} className="feature-card min-h-0 md:min-h-[60vh] flex items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: activeIndex === index ? 1 : 0.95,
                  opacity: activeIndex === index ? 1 : 0.6,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white p-8 rounded-lg shadow-lg w-full"
              >
                <div className="md:hidden mb-6 rounded-md overflow-hidden">
                  <img src={feature.image} alt={feature.title} className="w-full h-48 object-cover" />
                </div>
                <feature.icon className="w-12 h-12 text-primary" />
                <h3 className="mt-4 text-2xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-gray-600 text-lg">{feature.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main Product Page ---
const ProductsPage: React.FC = () => (
  <div>
    <HeroSection />
    <ScrollingFeaturesSection />
  </div>
);

export default ProductsPage;
