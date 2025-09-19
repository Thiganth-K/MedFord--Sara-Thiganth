"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BoltIcon, GlobeAltIcon, RocketLaunchIcon, EyeIcon } from "../components/Icons";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Advanced Sterilization",
    description:
      "Next-generation plasma and vapor sterilization technology ensures the highest level of microbial inactivation, even for complex and heat-sensitive instruments.",
    icon: BoltIcon,
    image:
      "https://images.unsplash.com/photo-1618939307313-a212d38185a5?q=80&w=870&auto=format&fit=crop",
  },
  {
    title: "Eco-Friendly Formula",
    description:
      "Our powerful disinfectants are formulated to be biodegradable and non-toxic, ensuring they are safe for healthcare professionals, patients, and the planet.",
    icon: GlobeAltIcon,
    image:
      "https://images.unsplash.com/photo-1579165466949-518dd7283537?q=80&w=870&auto=format&fit=crop",
  },
  {
    title: "Fast Acting Solutions",
    description:
      "Rapid disinfection and sterilization cycles significantly reduce turnaround times, boosting workflow efficiency and allowing for higher patient throughput.",
    icon: RocketLaunchIcon,
    image:
      "https://images.unsplash.com/photo-1554734867-bf3c00a49371?q=80&w=870&auto=format&fit=crop",
  },
  {
    title: "Versatile Applications",
    description:
      "Our products are rigorously tested and proven effective on a wide range of surfaces, materials, and medical instruments, providing a comprehensive safety solution.",
    icon: EyeIcon,
    image:
      "https://images.unsplash.com/photo-1581093458791-9a733b6aa219?q=80&w=870&auto=format&fit=crop",
  },
];

// --- Hero Section ---
const HeroSection = () => (
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
    </div>
  </div>
);

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
