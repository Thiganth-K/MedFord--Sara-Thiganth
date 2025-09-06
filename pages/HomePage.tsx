import * as React from 'react';
import { motion, Variants, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

import { SERVICES_DATA, PRODUCTS_DATA, BLOG_POSTS } from '../constants';
import type { Product } from '../types';
import {
    HeartIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    ArrowPathIcon,
    ArrowUpTrayIcon,
    BookmarkIcon,
    ArrowRightIcon
} from '../components/Icons';
import OurTeam from '../components/OurTeam'; // Adjust path if needed


const AnimatedText: React.FC<{ text: string; className?: string; el?: keyof JSX.IntrinsicElements }> = ({ text, className, el = 'h1' }) => {
    const words = text.split(" ");
    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };
    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    const MotionEl = motion[el];

    return (
        <MotionEl
            style={{ overflow: 'hidden' }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ display: 'inline-block', marginRight: '0.25em' }}
                    key={index}
                >
                    {word}
                </motion.span>
            ))}
        </MotionEl>
    );
};

const HeroSection = () => (
    <div className="relative h-screen flex items-center justify-start text-white overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-microscope-in-a-laboratory-2100-large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-left">
                 <AnimatedText text="Innovating for a Healthier World" className="text-4xl md:text-6xl font-extrabold tracking-tight" />
                 <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-4 text-lg md:text-xl"
                >
                    Medford Technologies is dedicated to advancing medical safety through state-of-the-art sterilization and infection control solutions.
                </motion.p>
            </div>
        </div>
    </div>
);


const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string; }> = ({ children, className = '', id }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const variants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.3 } },
    };

    return (
        <motion.section
            id={id}
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={`py-20 px-4 ${className}`}
        >
            {children}
        </motion.section>
    );
};


const AboutSection = () => {
    const imageVariant: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: (custom: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: custom * 0.1,
            }
        })
    };

    return (
        <Section id="about">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Column: Text */}
                    <div className="text-left">
                        <p className="text-sm font-semibold text-primary uppercase tracking-widest">ABOUT US</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3 leading-tight">
                            Helping facilities <span className="bg-primary/10 px-2 py-1 rounded-md text-primary-light">succeed</span> through the power of innovation.
                        </h2>
                        <p className="mt-6 text-lg text-gray-600">
                            Founded on the principles of innovation and safety, Medford Technologies provides comprehensive solutions to the most pressing challenges in medical hygiene and equipment management. Our team of experts is committed to excellence, pushing the boundaries of technology to protect patients and healthcare professionals alike.
                        </p>
                    </div>
                    
                    {/* Right Column: Image Grid */}
                    <div className="grid grid-cols-5 grid-rows-4 gap-4 h-[300px] sm:h-[450px] md:h-auto md:aspect-square">
                        {/* Big Image */}
                        <motion.div 
                            custom={0}
                            variants={imageVariant}
                            className="col-span-3 row-span-3 bg-white rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <img src="https://images.unsplash.com/photo-1576091160550-2173dba9996a?q=80&w=870&auto=format&fit=crop" alt="Doctor with tablet" className="w-full h-full object-cover" />
                        </motion.div>
                        
                        {/* Right Image 1 */}
                        <motion.div 
                            custom={1}
                            variants={imageVariant}
                            className="col-start-4 col-span-2 row-start-1 bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <img src="https://images.unsplash.com/photo-1581093458791-9a733b6aa219?q=80&w=870&auto=format&fit=crop" alt="Scientist in lab" className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Right Image 2 */}
                        <motion.div 
                            custom={2}
                            variants={imageVariant}
                            className="col-start-4 col-span-2 row-start-2 row-span-2 bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            <img src="https://images.unsplash.com/photo-1629102982873-3f1a074c5d3f?q=80&w=774&auto=format&fit=crop" alt="Medical equipment" className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Bottom Image 1 */}
                        <motion.div 
                            custom={3}
                            variants={imageVariant}
                            className="col-start-1 col-span-2 row-start-4 bg-white rounded-2xl shadow-md overflow-hidden"
                        >
                            <img src="https://images.unsplash.com/photo-1579165466949-518dd7283537?q=80&w=870&auto=format&fit=crop" alt="Lab vials" className="w-full h-full object-cover" />
                        </motion.div>
                        
                        {/* Bottom Image 2 */}
                        <motion.div 
                            custom={4}
                            variants={imageVariant}
                            className="col-start-3 col-span-2 row-start-4 bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <img src="https://images.unsplash.com/photo-1532187643623-dbf26773a858?q=80&w=870&auto=format&fit=crop" alt="Microscope view" className="w-full h-full object-cover" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

const ProductsSection = () => {
    const featuredProduct = PRODUCTS_DATA[0];

    const textVariants: Variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, x: 50, scale: 0.9 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    return (
        <Section>
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Product</h2>
                    <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6"></div>
                    <p className="text-lg text-gray-600">Discover the cutting-edge of medical technology with our flagship product.</p>
                </div>
                <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Content */}
                    <motion.div
                        variants={textVariants}
                        className="text-left"
                    >
                        <p className="text-sm font-semibold text-primary uppercase tracking-widest">{featuredProduct.name}</p>
                        <h3 className="text-3xl font-bold text-gray-800 mt-3 leading-tight">
                            {featuredProduct.description}
                        </h3>
                        <p className="mt-6 text-lg text-gray-600">
                            The SteriPro X2 represents the pinnacle of sterilization technology, offering unparalleled efficiency and reliability. Designed for high-volume medical facilities, it ensures complete microbial inactivation while preserving the integrity of delicate instruments. Its smart interface and automated cycles streamline workflow, reducing operational costs and enhancing patient safety.
                        </p>
                        <Link to="/products" className="mt-8 group inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition-colors shadow-lg">
                            Learn More
                            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>

                    {/* Right Column: Image */}
                    <motion.div
                        variants={imageVariants}
                    >
                        <img
                            src={featuredProduct.image}
                            alt={featuredProduct.name}
                            className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};

const ServicesSection = () => (
    <Section className="py-0 px-0">
        <div className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
                <source src="https://assets.mixkit.co/videos/preview/mixkit-team-of-scientists-working-in-a-laboratory-5231-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-secondary opacity-60"></div>
            <div className="z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                    className="max-w-3xl mx-auto"
                >
                    <motion.h2
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="text-3xl md:text-5xl font-extrabold tracking-tight"
                    >
                        Our Core Services
                    </motion.h2>
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="mt-6 text-lg md:text-xl text-gray-200"
                    >
                        From advanced sterilization protocols to expert equipment maintenance, we provide comprehensive solutions to ensure your facility operates at the highest standard of safety and efficiency.
                    </motion.p>
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="mt-10"
                    >
                        <Link to="/services" className="inline-block bg-primary text-white font-bold py-4 px-10 rounded-full hover:bg-primary-light transition-colors shadow-2xl text-lg">
                            Explore Our Services
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    </Section>
);

const INVESTOR_LOGOS = [
  'https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg',
  'https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg',
  'https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg',
  'https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg',
  'https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg',
  'https://tailwindui.com/img/logos/158x48/laravel-logo-gray-900.svg',
];

const InvestorsSection = () => (
    <Section id="investors" className="bg-light">
        <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Investors</h2>
                <p className="mt-4 text-lg text-gray-600">We are proud to be backed by leading investors in the technology and healthcare sectors.</p>
            </div>
            <div className="mt-12 relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                <motion.div
                    className="flex"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        ease: 'linear',
                        duration: 40,
                        repeat: Infinity,
                    }}
                 >
                    {[...INVESTOR_LOGOS, ...INVESTOR_LOGOS].map((logo, index) => (
                        <div key={index} className="flex-shrink-0 mx-8" style={{ width: '160px' }}>
                            <img src={logo} alt={`Investor logo ${index + 1}`} className="h-12 w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    </Section>
);

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba9996a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'A medical professional analyzing data on a laptop.',
  },
  {
    src: 'https://images.unsplash.com/photo-1581093458791-9a733b6aa219?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'A scientist carefully handling a test tube in the lab.',
  },
  {
    src: 'https://images.unsplash.com/photo-1629102982873-3f1a074c5d3f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'State-of-the-art medical equipment in a modern facility.',
  },
  {
    src: 'https://images.unsplash.com/photo-1532187643623-dbf26773a858?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Microscopic view of cellular structures under research.',
  },
  {
    src: 'https://images.unsplash.com/photo-1554734867-bf3c00a49371?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Dedicated researchers collaborating in our laboratory.',
  },
  {
    src: 'https://images.unsplash.com/photo-1614926857242-20593459e618?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Advanced machinery for precise medical manufacturing.',
  },
];

const galleryVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const GallerySection = () => {
    const [[page, direction], setPage] = React.useState([0, 0]);
    const imageIndex = page % GALLERY_IMAGES.length;

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(interval);
    }, [page]);

    const setPagetoIndex = (newIndex: number) => {
        const newDirection = newIndex > imageIndex ? 1 : -1;
        setPage([newIndex, newDirection]);
    };

    const containerRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
    const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

    return (
        <div ref={containerRef} id="gallery" className="relative h-[250vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Fullscreen Image Background */}
                <motion.div 
                    className="absolute inset-0"
                    style={{ scale }}
                >
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={galleryVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute w-full h-full"
                        >
                            <img
                                src={GALLERY_IMAGES[imageIndex].src}
                                alt={GALLERY_IMAGES[imageIndex].caption}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Content Overlay */}
                <motion.div
                    style={{ opacity }}
                    className="relative z-10 h-full flex flex-col items-center justify-between text-white container mx-auto px-4 py-8"
                >
                    {/* Top part: Title */}
                    <div className="text-center max-w-3xl mx-auto w-full">
                        <h2 className="text-3xl md:text-4xl font-bold">Our Gallery</h2>
                        <p className="mt-4 text-lg text-gray-200">A glimpse into our world of innovation, precision, and care in medical technology.</p>
                    </div>

                    {/* Bottom part: Caption and Dots */}
                    <div className="w-full max-w-5xl">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={page}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-center text-sm md:text-base mb-4 h-10 flex items-center justify-center"
                            >
                                {GALLERY_IMAGES[imageIndex].caption}
                            </motion.p>
                        </AnimatePresence>

                        <div className="flex justify-center mt-2 space-x-3">
                            {GALLERY_IMAGES.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setPagetoIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${index === imageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white'}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                    aria-current={index === imageIndex}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const SOCIAL_POSTS = [
  {
    platform: 'twitter',
    avatar: 'https://i.pravatar.cc/48?u=medford',
    username: 'MedFord Technologies',
    handle: '@MedFordTech',
    caption: 'Just launched the SteriPro X2! Our most advanced sterilization unit yet. Revolutionizing safety in healthcare facilities worldwide. #MedTech #Innovation #Healthcare',
    postImage: 'https://picsum.photos/seed/prod1/600/400',
    likes: '1.2K',
    comments: '48',
    retweets: '256',
  },
  {
    platform: 'instagram',
    avatar: 'https://i.pravatar.cc/48?u=medford',
    username: 'medfordtechnologies',
    caption: 'A behind-the-scenes look at our dedicated team developing the next generation of medical safety equipment. Excellence is in our DNA. ✨',
    postImage: 'https://images.unsplash.com/photo-1579165466949-518dd7283537?q=80&w=870&auto=format&fit=crop',
    likes: '3,450',
    comments: '129',
  },
  {
    platform: 'linkedin',
    avatar: 'https://i.pravatar.cc/48?u=medford',
    username: 'MedFord Technologies',
    followers: '15,280 followers',
    caption: 'We are thrilled to announce our partnership with Global Health Initiative to expand access to our EnviroCleanse disinfectant in developing nations. This collaboration marks a significant step in our mission to create a safer, healthier world for everyone. Learn more on our website.',
    postImage: 'https://images.unsplash.com/photo-1576091160550-2173dba9996a?q=80&w=870&auto=format&fit=crop',
    likes: '891',
    comments: '76',
    reposts: '102',
  },
];


const SocialMediaSection = () => {
    const [postIndex, setPostIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setPostIndex((prevIndex) => (prevIndex + 1) % SOCIAL_POSTS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const currentPost = SOCIAL_POSTS[postIndex];

    const renderPost = () => {
        switch (currentPost.platform) {
            case 'twitter':
                return (
                    <div className="font-sans text-sm text-gray-800 p-3 h-full flex flex-col">
                        <div className="flex items-start space-x-3">
                            <img src={currentPost.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-bold">{currentPost.username}</p>
                                <p className="text-gray-500">{currentPost.handle}</p>
                            </div>
                        </div>
                        <p className="my-3">{currentPost.caption}</p>
                        <img src={currentPost.postImage} alt="post" className="rounded-2xl border border-gray-200 mt-1" />
                        <div className="mt-auto pt-3 flex justify-between text-gray-500">
                           <div className="flex items-center space-x-1"><ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" /><p>{currentPost.comments}</p></div>
                           <div className="flex items-center space-x-1"><ArrowPathIcon className="w-5 h-5" /><p>{currentPost.retweets}</p></div>
                           <div className="flex items-center space-x-1"><HeartIcon className="w-5 h-5" /><p>{currentPost.likes}</p></div>
                           <div className="flex items-center space-x-1"><ArrowUpTrayIcon className="w-5 h-5" /></div>
                        </div>
                    </div>
                );
            case 'instagram':
                return (
                    <div className="font-sans text-sm text-gray-800 h-full flex flex-col">
                        <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                            <img src={currentPost.avatar} alt="avatar" className="w-9 h-9 rounded-full" />
                            <p className="font-semibold">{currentPost.username}</p>
                        </div>
                        <img src={currentPost.postImage} alt="post" className="w-full aspect-square object-cover" />
                         <div className="px-3 py-2 flex-grow flex flex-col">
                             <div className="flex justify-between items-center">
                                <div className="flex space-x-4">
                                    <HeartIcon className="w-7 h-7" />
                                    <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
                                    <ArrowUpTrayIcon className="w-7 h-7 -rotate-90" />
                                </div>
                                <BookmarkIcon className="w-7 h-7" />
                            </div>
                            <p className="font-semibold mt-2">{currentPost.likes} likes</p>
                            <p className="mt-1"><span className="font-semibold">{currentPost.username}</span> {currentPost.caption}</p>
                        </div>
                    </div>
                );
            case 'linkedin':
                return (
                    <div className="font-sans text-xs text-gray-700 bg-gray-50 h-full flex flex-col">
                        <div className="p-3">
                            <div className="flex items-start space-x-2">
                                <img src={currentPost.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
                                <div>
                                    <p className="font-bold text-sm text-gray-800">{currentPost.username}</p>
                                    <p>{currentPost.followers}</p>
                                </div>
                            </div>
                            <p className="my-2 text-sm text-gray-800">{currentPost.caption}</p>
                        </div>
                        <img src={currentPost.postImage} alt="post" className="w-full object-cover" />
                        <div className="px-3 py-1 flex justify-between items-center border-b border-gray-200 text-gray-500">
                            <p>{currentPost.likes} Likes</p>
                            <p>{currentPost.comments} comments • {currentPost.reposts} reposts</p>
                        </div>
                         <div className="mt-auto grid grid-cols-4 text-gray-600 font-semibold text-sm">
                           <div className="flex items-center justify-center space-x-1 py-2 hover:bg-gray-200"><HeartIcon className="w-5 h-5" /><p>Like</p></div>
                           <div className="flex items-center justify-center space-x-1 py-2 hover:bg-gray-200"><ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" /><p>Comment</p></div>
                           <div className="flex items-center justify-center space-x-1 py-2 hover:bg-gray-200"><ArrowPathIcon className="w-5 h-5" /><p>Repost</p></div>
                           <div className="flex items-center justify-center space-x-1 py-2 hover:bg-gray-200"><ArrowUpTrayIcon className="w-5 h-5" /><p>Send</p></div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Section id="socials">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <motion.div variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } } }} className="text-left">
                        <p className="text-sm font-semibold text-primary uppercase tracking-widest">SOCIAL MEDIA</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3 leading-tight">
                            Stay Connected With Our Latest Updates
                        </h2>
                        <p className="mt-6 text-lg text-gray-600">
                            Follow us on our social channels to get the latest news on product launches, industry insights, and our ongoing mission to improve global healthcare safety.
                        </p>
                        <a href="#contact" className="mt-8 inline-block bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition-colors shadow-lg">
                           Follow Us
                        </a>
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } } }} className="flex items-center justify-center py-10 md:py-0">
                        <div className="relative mx-auto w-80 h-[600px] bg-gray-900 rounded-[40px] border-[10px] border-gray-900 shadow-2xl">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-gray-900 rounded-b-lg z-20"></div>
                            <div className="w-full h-full bg-white rounded-[30px] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={postIndex}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                        className="w-full h-full"
                                    >
                                        {renderPost()}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};


const BlogSection = () => (
    <Section id="blog" className="bg-light">
        <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">From Our Blog</h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6"></div>
                <p className="text-lg text-gray-600">Stay updated with the latest news, articles, and insights from the medical technology industry.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post) => (
                    <motion.div
                        key={post.id}
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -10 }}
                        className="bg-white rounded-lg shadow-lg overflow-hidden group"
                    >
                        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <p className="text-sm text-gray-500">{post.date}</p>
                            <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                            <p className="mt-2 text-gray-600">{post.excerpt}</p>
                            <a href={`#/blog/${post.slug}`} className="mt-4 group inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-light">
                                Read More
                                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </Section>
);


const ContactSection = () => (
    <Section id="contact" className="bg-gradient-to-br from-primary to-purple-600 text-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
                 <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
                 <p className="mt-4 text-lg text-purple-200">Have questions or need a consultation? We're here to help. Reach out to us, and our team will get back to you promptly.</p>
            </div>
            <form className="bg-white p-8 rounded-lg shadow-2xl text-gray-800">
                <div className="mb-4">
                    <label htmlFor="name" className="block font-semibold mb-1">Name</label>
                    <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-semibold mb-1">Email</label>
                    <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                 <div className="mb-4">
                    <label htmlFor="message" className="block font-semibold mb-1">Message</label>
                    <textarea id="message" rows={4} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg shadow-lg transition-colors">Send Message</button>
            </form>
        </div>
    </Section>
);


const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <OurTeam />
      <InvestorsSection />
      <GallerySection />
      <SocialMediaSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;