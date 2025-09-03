import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BoltIcon, GlobeAltIcon, RocketLaunchIcon, EyeIcon } from '../components/Icons';
import { PRODUCTS_DATA } from '../constants';

const HeroSection = () => (
    <div className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
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

const KeyFeatures = () => {
    const features = [
        { title: 'Advanced Sterilization', description: 'Next-generation plasma and vapor sterilization technology.', icon: BoltIcon },
        { title: 'Eco-Friendly Formula', description: 'Powerful disinfectants that are safe for people and the planet.', icon: GlobeAltIcon },
        { title: 'Fast Acting Solutions', description: 'Rapid disinfection cycles to improve workflow efficiency.', icon: RocketLaunchIcon },
        { title: 'Versatile Applications', description: 'Effective on a wide range of surfaces and medical instruments.', icon: EyeIcon },
    ];
    return (
        <section className="py-20 bg-light">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Key Features</h2>
                    <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6"></div>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-lg shadow-lg text-center"
                        >
                            <feature.icon className="w-12 h-12 text-primary mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                            <p className="mt-2 text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProductShowcase = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Product Lineup</h2>
                    <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6"></div>
                    <p className="text-lg text-gray-600">
                        A comprehensive range of solutions designed to meet the rigorous demands of modern healthcare facilities.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {PRODUCTS_DATA.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-light rounded-2xl shadow-lg overflow-hidden group flex flex-col"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            </div>
                            <div className="p-8 flex-grow flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 mt-4 flex-grow">{product.description}</p>
                                <div className="mt-6">
                                    <a href="#/products" className="font-semibold text-primary hover:text-primary-light transition-colors group/link inline-flex items-center gap-1">
                                        View Details
                                        <span className="transition-transform group-hover/link:translate-x-1">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
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
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20"></div>
                    {events.map((event, index) => (
                        <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                            <div className="order-1 w-5/12"></div>
                            <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
                                <h1 className="mx-auto font-semibold text-sm text-white">{index + 1}</h1>
                            </div>
                            <div className={`order-1 w-5/12 px-6 py-4 rounded-lg shadow-xl bg-white timeline-item ${index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'}`}>
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
            <KeyFeatures />
            <ProductShowcase />
            <Timeline />
        </div>
    );
};

export default ProductsPage;