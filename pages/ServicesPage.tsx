import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Car, Layers, Video, Headphones, Shield, Clock, Award, Users } from "lucide-react"; // icons
import CardSwap, { Card } from '../components/CardSwap';
import { AnimatedTestimonials } from "../src/components/ui/animated-testimonials";

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

// ---------------- TESTIMONIALS DATA ----------------
const testimonials = [
  {
    quote: "The medical technology solutions provided have transformed how we operate. Exceptional service and remarkable results.",
    name: "Dr. Sarah Mitchell",
    designation: "Chief Medical Officer",
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format&fit=crop"
  },
  {
    quote: "Their innovative approach to healthcare technology has significantly improved our patient care efficiency.",
    name: "Dr. James Wilson",
    designation: "Hospital Director",
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=500&auto=format&fit=crop"
  },
  {
    quote: "Outstanding support team and cutting-edge solutions that have revolutionized our medical practice.",
    name: "Dr. Emily Chen",
    designation: "Head of Cardiology",
    src: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=500&auto=format&fit=crop"
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

// ---------------- BUSINESS SECTION ----------------
const BusinessSection = () => (
  <section className="min-h-screen bg-white flex items-center py-20">
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
      {/* Left side content */}
      <div className="flex flex-col justify-center px-12">
        <h3 className="text-2xl font-light text-gray-500 mb-3">BUSINESS SOLUTIONS</h3>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Transform your business with{" "}
          <span className="bg-purple-200 px-2 rounded">innovative</span>{" "}
          solutions
        </h2>
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Our comprehensive suite of services is designed to elevate your business
            to new heights. We combine cutting-edge technology with industry expertise
            to deliver results that matter.
          </p>
          <div className="flex items-center space-x-2 text-gray-700">
            <span className="text-purple-600 text-xl">•</span>
            <span className="text-lg">Strategic business consulting</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <span className="text-purple-600 text-xl">•</span>
            <span className="text-lg">Digital transformation solutions</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <span className="text-purple-600 text-xl">•</span>
            <span className="text-lg">Innovation-driven growth strategies</span>
          </div>
        </div>
      </div>

      {/* Right side with animated testimonials */}
      <div className="flex w-full h-full">
        <div 
          className="w-full h-[500px] mt-8 bg-purple-600 relative overflow-hidden"
          style={{
            borderRadius: "40px 0 0 40px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
        >
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------------- WHY CHOOSE US SECTION ----------------
const WhyChooseUs = () => (
  <section className="min-h-screen bg-gray-50 flex items-center py-20">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
      {/* Image on the left */}
      <div className="md:w-1/2 w-full">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
          alt="Medical Technology"
          className="rounded-2xl w-full h-auto shadow-2xl"
        />
      </div>

      {/* Content on the right */}
      <div className="md:w-1/2 w-full">
        <h3 className="text-2xl font-light text-gray-500 mb-3">WHY CHOOSE US</h3>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
          Excellence in every aspect of{" "}
          <span className="bg-purple-200 px-2 rounded">healthcare</span>{" "}
          technology
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-start">
            <div className="bg-purple-100 p-3 rounded-lg mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Trusted Security
            </h4>
            <p className="text-gray-600">
              Advanced security protocols ensuring complete protection of sensitive medical data.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-start">
            <div className="bg-purple-100 p-3 rounded-lg mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              24/7 Support
            </h4>
            <p className="text-gray-600">
              Round-the-clock technical assistance and support for seamless operations.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-start">
            <div className="bg-purple-100 p-3 rounded-lg mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Certified Excellence
            </h4>
            <p className="text-gray-600">
              Industry-leading certifications and compliance with healthcare standards.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-start">
            <div className="bg-purple-100 p-3 rounded-lg mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Expert Team
            </h4>
            <p className="text-gray-600">
              Highly skilled professionals with extensive healthcare technology experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------------- MAIN PAGE ----------------
const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BusinessSection />
      <WhyChooseUs />
    </div>
  );
};

export default ServicesPage;
