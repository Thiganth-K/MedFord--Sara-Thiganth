
import React, { useState, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES_DATA } from '../constants';
import type { Service } from '../types';

const HeroSection = () => (
    <div className="bg-gradient-to-br from-primary to-purple-700 pt-32 pb-20 text-white">
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
                Delivering excellence and precision in every aspect of medical technology support and management.
            </motion.p>
        </div>
    </div>
);

const ScrollStackSection: React.FC = () => {
    const [activeServiceId, setActiveServiceId] = useState<number>(SERVICES_DATA[0].id);
    const activeService = SERVICES_DATA.find(s => s.id === activeServiceId) ?? SERVICES_DATA[0];
    
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
    const activeIdRef = useRef(activeServiceId);
    activeIdRef.current = activeServiceId;
    
    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const isMobile = window.innerWidth < 768;

        const ctx = gsap.context(() => {
            if (isMobile) {
                // Basic scroll animations for mobile
                cardRefs.current.forEach(card => {
                    if (card) {
                        gsap.fromTo(card,
                            { opacity: 0, y: 50 },
                            {
                                opacity: 1,
                                y: 0,
                                scrollTrigger: {
                                    trigger: card,
                                    start: 'top 85%',
                                    end: 'bottom 75%',
                                    scrub: true
                                }
                            }
                        );
                    }
                });
                return;
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${(SERVICES_DATA.length - 1) * 100}%`,
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                }
            });
            
            SERVICES_DATA.slice(0, -1).forEach((service, index) => {
                const currentCard = cardRefs.current[index];
                const nextCard = cardRefs.current[index+1];

                tl.addLabel(`transition-${index}`)
                .to(currentCard, {
                    scale: 0.9,
                    y: '-=10vh',
                    opacity: 0.5,
                    ease: 'power1.in',
                })
                .to(nextCard, {
                    scale: 1,
                    y: '0px',
                    ease: 'power1.out',
                    onStart: () => {
                        const newService = SERVICES_DATA[index + 1];
                        if (activeIdRef.current !== newService.id) setActiveServiceId(newService.id);
                    },
                    onReverseComplete: () => {
                        const currentService = SERVICES_DATA[index];
                        if (activeIdRef.current !== currentService.id) setActiveServiceId(currentService.id);
                    }
                }, '<'); // Animate next card at the same time
            });

        }, sectionRef.current);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-light overflow-hidden">
            <div className="hidden md:grid grid-cols-2 min-h-screen">
                <div className="p-12 lg:p-24 flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeService.id}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="max-w-md"
                        >
                            <activeService.icon className="w-16 h-16 text-primary mb-4" />
                            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800">{activeService.title}</h2>
                            <p className="mt-6 text-lg text-gray-600">{activeService.longDescription}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="relative h-full">
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                        {SERVICES_DATA.map((service, index) => (
                            <div
                                key={service.id}
                                ref={el => { cardRefs.current[index] = el; }}
                                className="absolute w-[80%] h-[70%] bg-white rounded-2xl shadow-2xl overflow-hidden"
                                style={{ 
                                    zIndex: SERVICES_DATA.length - index,
                                    transform: `scale(${1 - (index * 0.05)}) translateY(${index * 20}px)`,
                                    transformOrigin: 'center bottom',
                                }}
                            >
                                <img src={service.image} alt={service.title} className="w-full h-full object-cover"/>
                            </div>
                        )).reverse()}
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden container mx-auto px-4 py-16 space-y-12">
                {SERVICES_DATA.map((service, index) => (
                     <div key={service.id} ref={el => { cardRefs.current[index] = el; }} className="bg-white p-8 rounded-lg shadow-lg">
                        <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-md mb-6" />
                        <service.icon className="w-12 h-12 text-primary mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800">{service.title}</h2>
                        <p className="mt-4 text-gray-600">{service.longDescription}</p>
                    </div>
                ))}
            </div>

        </section>
    );
};


const ServicesPage: React.FC = () => {
    return (
        <div className="bg-white">
            <HeroSection />
            <ScrollStackSection />
        </div>
    );
};

export default ServicesPage;