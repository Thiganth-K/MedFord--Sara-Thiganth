"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BoltIcon, GlobeAltIcon, RocketLaunchIcon, EyeIcon } from "../components/Icons";
import { Timeline } from "../ui/timeline"; // Import Timeline

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
  <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
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
    <div className="z-10 text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold tracking-tight"
      >
        Our Innovative Products
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-4 text-lg md:text-xl max-w-2xl mx-auto"
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

// --- Timeline Data ---
const timelineData = [
  {
    title: "2024",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          Built and launched Aceternity UI and Aceternity UI Pro from scratch
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://assets.aceternity.com/templates/startup-1.webp"
            alt="startup template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <img
            src="https://assets.aceternity.com/templates/startup-2.webp"
            alt="startup template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <img
            src="https://assets.aceternity.com/templates/startup-3.webp"
            alt="startup template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <img
            src="https://assets.aceternity.com/templates/startup-4.webp"
            alt="startup template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Early 2023",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          I usually run out of copy, but when I see content this big, I try to
          integrate lorem ipsum.
        </p>
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          Lorem ipsum is for people who are too lazy to write copy. But we are
          not. Here are some more example of beautiful designs I built.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://assets.aceternity.com/pro/hero-sections.png"
            alt="hero template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <img
            src="https://assets.aceternity.com/features-section.png"
            alt="feature template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <img
            src="https://assets.aceternity.com/pro/bento-grids.png"
            alt="bento template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <img
            src="https://assets.aceternity.com/cards.png"
            alt="cards template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Changelog",
    content: (
      <div>
        <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          Deployed 5 new components on Aceternity today
        </p>
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Card grid component
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Startup template Aceternity
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Random file upload lol
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Himesh Reshammiya Music CD
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            ✅ Salman Bhai Fan Club registrations open
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://assets.aceternity.com/pro/hero-sections.png"
            alt="hero template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <img
            src="https://assets.aceternity.com/features-section.png"
            alt="feature template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <img
            src="https://assets.aceternity.com/pro/bento-grids.png"
            alt="bento template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <img
            src="https://assets.aceternity.com/cards.png"
            alt="cards template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
        </div>
      </div>
    ),
  },
];

// --- Main Product Page ---
const ProductsPage: React.FC = () => (
  <div>
    <HeroSection />
    <ScrollingFeaturesSection />
    <div className="py-20">
      <Timeline data={timelineData} />
    </div>
  </div>
);

export default ProductsPage;
