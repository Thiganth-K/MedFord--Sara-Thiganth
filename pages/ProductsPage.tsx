import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BoltIcon, GlobeAltIcon, RocketLaunchIcon, EyeIcon } from '../components/Icons';
import { PRODUCTS_DATA } from '../constants';

const HeroSection = () => (
    <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
        >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-a-scientist-pours-a-colored-liquid-into-a-beaker-3461-large.mp4" type="video/mp4" />
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

const features = [
    { 
        title: 'Advanced Sterilization', 
        description: 'Next-generation plasma and vapor sterilization technology ensures the highest level of microbial inactivation, even for complex and heat-sensitive instruments.', 
        icon: BoltIcon,
        image: 'https://images.unsplash.com/photo-1618939307313-a212d38185a5?q=80&w=870&auto=format&fit=crop' 
    },
    { 
        title: 'Eco-Friendly Formula', 
        description: 'Our powerful disinfectants are formulated to be biodegradable and non-toxic, ensuring they are safe for healthcare professionals, patients, and the planet.', 
        icon: GlobeAltIcon,
        image: 'https://images.unsplash.com/photo-1579165466949-518dd7283537?q=80&w=870&auto=format&fit=crop'
    },
    { 
        title: 'Fast Acting Solutions', 
        description: 'Rapid disinfection and sterilization cycles significantly reduce turnaround times, boosting workflow efficiency and allowing for higher patient throughput.', 
        icon: RocketLaunchIcon,
        image: 'https://images.unsplash.com/photo-1554734867-bf3c00a49371?q=80&w=870&auto=format&fit=crop'
    },
    { 
        title: 'Versatile Applications', 
        description: 'Our products are rigorously tested and proven effective on a wide range of surfaces, materials, and medical instruments, providing a comprehensive safety solution.', 
        icon: EyeIcon,
        image: 'https://images.unsplash.com/photo-1581093458791-9a733b6aa219?q=80&w=870&auto=format&fit=crop'
    },
];

const ScrollingFeaturesSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useLayoutEffect(() => {
        const isMobile = window.innerWidth < 768;
        if(isMobile) return;

        const ctx = gsap.context(() => {
            const featureCards = gsap.utils.toArray<Element>('.feature-card');
            const featureImages = gsap.utils.toArray<Element>('.feature-image');
            
            // Set initial positions. All images except the first are positioned below the container.
            gsap.set(featureImages, { yPercent: 100 });
            gsap.set(featureImages[0], { yPercent: 0 });

            featureCards.forEach((card, index) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => { // Fired when scrolling down
                        setActiveIndex(index);
                        if (index > 0) {
                            // Move previous image up and out
                            gsap.to(featureImages[index - 1], { yPercent: -100, duration: 0.6, ease: 'power2.inOut', overwrite: true });
                        }
                        // Move current image into view from bottom
                        gsap.to(featureImages[index], { yPercent: 0, duration: 0.6, ease: 'power2.inOut', overwrite: true });
                    },
                    onEnterBack: () => { // Fired when scrolling up
                        setActiveIndex(index);
                        if (index < featureImages.length - 1) {
                             // Move next image down and out
                            gsap.to(featureImages[index + 1], { yPercent: 100, duration: 0.6, ease: 'power2.inOut', overwrite: true });
                        }
                        // Move current image into view from top. We use fromTo because its previous state could be anywhere.
                        gsap.fromTo(featureImages[index], 
                            { yPercent: -100 },
                            { yPercent: 0, duration: 0.6, ease: 'power2.inOut', overwrite: true }
                        );
                    }
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
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
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




const Timeline = () => {
    const timelineRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray('.timeline-item');
            items.forEach((item: any) => {
                gsap.from(item, {
                    x: item.classList.contains('timeline-item-left') ? -100 : 100,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        end: 'bottom 60%',
                        scrub: 1,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }, timelineRef.current);
        return () => ctx.revert();
    }, []);

    const events = [
        { year: '2018', title: 'Company Founded', description: 'Medford Technologies was established with a mission to innovate medical safety.' },
        { year: '2020', title: 'First Patent', description: 'Patented our revolutionary eco-friendly disinfectant formula, EnviroCleanse.' },
        { year: '2022', title: 'Product Launch', description: 'Launched our flagship sterilization unit, the SteriPro X2, to market.' },
        { year: '2024', title: 'Global Expansion', description: 'Expanded operations to Europe and Asia, serving over 200 new facilities.' },
    ];

    return (
        <section className="py-20" ref={timelineRef}>
            <div className="container mx-auto px-4">
                 <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Journey</h2>
                    <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6"></div>
                </div>
                <div className="relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform -translate-x-1/2"></div>
                    {events.map((event, index) => (
                        <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
                            <div className="order-1 w-5/12"></div>
                            <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
                                <h1 className="mx-auto font-semibold text-sm text-white">{index + 1}</h1>
                            </div>
                            <div className={`order-1 w-5/12 px-6 py-4 rounded-lg shadow-xl bg-white timeline-item ${index % 2 === 0 ? 'text-right timeline-item-left' : 'timeline-item-right'}`}>
                                <p className="text-sm font-medium text-primary">{event.year}</p>
                                <h3 className="mb-3 font-bold text-gray-800 text-lg">{event.title}</h3>
                                <p className="text-sm leading-snug tracking-wide text-gray-600">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProductsPage: React.FC = () => {
    return (
        <div>
            <HeroSection />
            <ScrollingFeaturesSection />
            <Timeline />
        </div>
    );
};

export default ProductsPage;
