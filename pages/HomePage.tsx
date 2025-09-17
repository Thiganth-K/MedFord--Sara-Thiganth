import * as React from 'react';
import { motion, Variants, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

import { SERVICES_DATA, PRODUCTS_DATA } from '../constants';
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
import BlurText from '../components/BlurText'; // Add this import
import RotatingText from '../components/RotatingText';


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
  <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
    <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
      <source src="/videos/home_page.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="z-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto text-center">
        <div className="flex items-center justify-center flex-nowrap gap-2 text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
          <div className="text-glow flex items-center justify-center flex-nowrap gap-2">
            <BlurText
              text="Revolutionizing Hospital Hygiene with"
              className="inline-block text-white"
            />
            <RotatingText
              texts={["Precision", "Innovation", "Excellence"]}
              mainClassName="bg-purple-600 backdrop-sm px-6 py-2 rounded-lg border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              elementLevelClassName="text-white"
              rotationInterval={3000}
              splitBy="words"
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300
              }}
            />
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-1 text-lg md:text-2xl text-gray-200 max-w-6xl mx-auto italic"
        >
          Medford technologies is where Medtech innovation meets precision engineering
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
                            <img 
                                src="/imgs/img1.jpg" 
                                alt="Doctor with tablet" 
                                className="w-full h-full object-cover" 
                            />
                        </motion.div>
                        
                        {/* Right Image 1 */}
                        <motion.div 
                            custom={1}
                            variants={imageVariant}
                            className="col-start-4 col-span-2 row-start-1 bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <img src="/imgs/img2.png" alt="Scientist in lab" className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Right Image 2 */}
                        <motion.div 
                            custom={2}
                            variants={imageVariant}
                            className="col-start-4 col-span-2 row-start-2 row-span-2 bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            <img src="/imgs/img3.png" alt="Medical equipment" className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Bottom Image 1 */}
                        <motion.div 
                            custom={3}
                            variants={imageVariant}
                            className="col-start-1 col-span-2 row-start-4 bg-white rounded-2xl shadow-md overflow-hidden"
                        >
                            <img src="/imgs/img4.png" alt="Lab vials" className="w-full h-full object-cover" />
                        </motion.div>
                        
                        {/* Bottom Image 2 */}
                        <motion.div 
                            custom={4}
                            variants={imageVariant}
                            className="col-start-3 col-span-2 row-start-4 bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <img src="/imgs/img5.png" alt="Microscope view" className="w-full h-full object-cover" />
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
                            src="/imgs/prd1.png"
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
    <Section className="py-0 px-0 m-0">
        <div className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden m-0">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute z-0 w-[110vw] min-w-0 min-h-full max-w-none rounded-xl shadow-lg m-0"
            >
                <source src="/videos/DESIGN_LAB-2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    </Section>
);

const INVESTOR_LOGOS = [
  '/imgs/investor1.png',
  '/imgs/investor2.png',
  '/imgs/investor3.png',
  '/imgs/investor1.png',
  '/imgs/investor2.png',
  '/imgs/investor3.png',
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
                        <div key={index} className="flex-shrink-0 mx-8" style={{ width: '200px', height: '100px' }}>
                            <img 
                                src={logo} 
                                alt={`Investor logo ${index + 1}`} 
                                className="h-full w-full object-contain transition-transform duration-300 hover:scale-110" 
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    </Section>
);
const GALLERY_IMAGES = [
  {
    src: '/imgs/gallery1.png',
    caption: 'A glimpse of our advanced medical technology in action.',
  },
  {
    src: '/imgs/gallery2.png',
    caption: 'Innovative solutions for modern healthcare challenges.',
  },
  {
    src: '/imgs/gallery3.png',
    caption: 'State-of-the-art facilities driving medical excellence.',
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
        }, 2500); // Changed from 5000ms to 2500ms for faster transitions
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
                className="w-full h-full object-cover border-8 border-purple-800 rounded-xl"
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
                    {/* Top part: Title 
                    <div className="text-center max-w-3xl mx-auto w-full">
                        <h2 className="text-3xl md:text-4xl text-purple-800 font-bold" style={{ textShadow: '2px 2px 6px #fff, 0px 0px 2px #fff' }}>Our Gallery</h2>
                        <p className="mt-4 text-lg text-purple-800" style={{ textShadow: '2px 2px 6px #fff, 0px 0px 2px #fff' }}>A glimpse into our world of innovation, precision, and care in medical technology.</p>
                    </div>
                      */}
                    {/* Bottom part: Caption and Dots 
                    <div className="w-full max-w-5xl">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={page}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-center text-sm md:text-base mb-4 h-10 text-purple-800 flex items-center justify-center"
                            >
                                {GALLERY_IMAGES[imageIndex].caption}
                            </motion.p>
                        </AnimatePresence>

                        <div className="flex justify-center mt-2 space-x-3">
                            {GALLERY_IMAGES.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setPagetoIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${index === imageIndex ? 'bg-purple-800 scale-125' : 'bg-purple-200/50 hover:bg-purple-800'}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                    aria-current={index === imageIndex}
                                />
                            ))}
                        </div> 
                    </div>*/}
                </motion.div>
            </div>
        </div>
    );
};
const SOCIAL_POSTS = [
  {
    platform: 'twitter',
    avatar: '/imgs/logo.png',
    username: 'MedFord Technologies',
    handle: '@MedFordTech',
    caption: 'Just launched the SteriPro X2! Our most advanced sterilization unit yet. Revolutionizing safety in healthcare facilities worldwide. #MedTech #Innovation #Healthcare',
    postImage: '/imgs/sm1.png',
    likes: '1.2K',
    comments: '48',
    retweets: '256',
  },
  {
    platform: 'instagram',
    avatar: '/imgs/logo.png',
    username: 'medfordtechnologies',
    caption: 'A behind-the-scenes look at our dedicated team developing the next generation of medical safety equipment. Excellence is in our DNA. ✨',
    postImage: '/imgs/sm2.png',
    likes: '3,450',
    comments: '129',
  },
  {
    platform: 'linkedin',
    avatar: '/imgs/logo.png',
    username: 'MedFord Technologies',
    followers: '15,280 followers',
    caption: 'We are thrilled to announce our partnership with Global Health Initiative to expand access to our EnviroCleanse disinfectant in developing nations. This collaboration marks a significant step in our mission to create a safer, healthier world for everyone. Learn more on our website.',
    postImage: '/imgs/sm3.png',
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
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const currentPost = SOCIAL_POSTS[postIndex];

  const renderPost = () => {
    switch (currentPost.platform) {
      case 'twitter':
        return (
          <div className="font-sans text-sm text-gray-800 p-3 h-full flex flex-col">
            <div className="flex items-start space-x-3 mt-4"> {/* Added margin-top */}
              <img
                src={currentPost.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="mt-2"> {/* Added margin-top */}
                <p className="font-bold">{currentPost.username}</p>
                <p className="text-gray-500">{currentPost.handle}</p>
              </div>
            </div>
            <p className="my-3">{currentPost.caption}</p>
            <img
              src={currentPost.postImage}
              alt="post"
              className="rounded-2xl border border-gray-200 mt-1"
            />
            <div className="mt-auto pt-3 flex justify-between text-gray-500">
              <div className="flex items-center space-x-1">
                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
                <p>{currentPost.comments}</p>
              </div>
              <div className="flex items-center space-x-1">
                <ArrowPathIcon className="w-5 h-5" />
                <p>{currentPost.retweets}</p>
              </div>
              <div className="flex items-center space-x-1">
                <HeartIcon className="w-5 h-5" />
                <p>{currentPost.likes}</p>
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpTrayIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        );
      case 'instagram':
        return (
          <div className="font-sans text-sm text-gray-800 h-full flex flex-col">
            <div className="flex items-center space-x-3 p-3 border-b border-gray-200 mt-4"> {/* Added margin-top */}
              <img
                src={currentPost.avatar}
                alt="avatar"
                className="w-9 h-9 rounded-full"
              />
              <p className="font-semibold mt-2">{currentPost.username}</p> {/* Added margin-top */}
            </div>
            <img
              src={currentPost.postImage}
              alt="post"
              className="w-full aspect-square object-cover"
            />
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
              <p className="mt-1">
                <span className="font-semibold">{currentPost.username}</span>{' '}
                {currentPost.caption}
              </p>
            </div>
          </div>
        );
      case 'linkedin':
        return (
          <div className="font-sans text-xs text-gray-700 bg-gray-50 h-full flex flex-col">
            <div className="p-3 mt-4"> {/* Added margin-top */}
              <div className="flex items-start space-x-2">
                <img
                  src={currentPost.avatar}
                  alt="avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div className="mt-2"> {/* Added margin-top */}
                  <p className="font-bold text-sm text-gray-800">
                    {currentPost.username}
                  </p>
                  <p>{currentPost.followers}</p>
                </div>
              </div>
              <p className="my-2 text-sm text-gray-800">{currentPost.caption}</p>
            </div>
            <img
              src={currentPost.postImage}
              alt="post"
              className="w-full object-cover"
            />
            <div className="px-3 py-1 flex justify-between items-center border-b border-gray-200 text-gray-500">
              <p>{currentPost.likes} Likes</p>
              <p>
                {currentPost.comments} comments • {currentPost.reposts} reposts
              </p>
            </div>
            <div className="mt-auto grid grid-cols-4 text-gray-600 font-semibold text-sm">
              <div className="flex items-center justify-center space-x-1 py-2 hover:bg-gray-200">
                <HeartIcon className="w-5 h-5" />
                <p>Like</p>
              </div>
              <div className="flex items-center justify-center space-x-1 py-2 hover:bg-gray-200">
                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
                <p>Comment</p>
              </div>
              <div className="flex items-center justify-center space-x-1 py-2 hover:bg-gray-200">
                <ArrowPathIcon className="w-5 h-5" />
                <p>Repost</p>
              </div>
              <div className="flex items-center justify-center space-x-1 py-2 hover:bg-gray-200">
                <ArrowUpTrayIcon className="w-5 h-5" />
                <p>Send</p>
              </div>
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
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
            className="text-left"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">SOCIAL MEDIA</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3 leading-tight">Stay Connected With Our Latest Updates</h2>
            <p className="mt-6 text-lg text-gray-600">
              Follow us on our social channels to get the latest news on product launches, industry insights, and our ongoing mission to improve global healthcare safety.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-block bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition-colors shadow-lg"
            >
              Follow Us
            </a>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
            className="flex flex-col items-center justify-center py-10 md:py-0"
          >
            {/* Status Bar */}
            <div className="absolute top-0 left-0 w-full bg-gray-900 text-white text-xs py-1 px-4 flex justify-between items-center md:hidden">
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <div className="flex items-center space-x-2">
                <span>75%</span>
                <div className="w-4 h-2 bg-white rounded-sm relative">
                  <div className="absolute inset-0 bg-green-500" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-80 h-[650px] bg-gray-900 rounded-[40px] border-[10px] border-gray-900 shadow-2xl">
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

            {/* Status bar dots */}
            <div className="flex space-x-2 mt-4">
              {SOCIAL_POSTS.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-3 h-3 rounded-full ${postIndex === idx ? 'bg-primary' : 'bg-gray-400'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};


const BLOG_POSTS = [
  {
    id: 1,
    title: 'Revolutionizing Medical Hygiene',
    date: 'September 10, 2025',
    excerpt: 'Discover how MedFord is transforming healthcare with cutting-edge technology.',
    slug: 'revolutionizing-medical-hygiene',
    image: '/imgs/blog1.png',
  },
  {
    id: 2,
    title: 'The Future of Sterilization',
    date: 'August 25, 2025',
    excerpt: 'Learn about the latest advancements in sterilization technology.',
    slug: 'future-of-sterilization',
    image: '/imgs/blog2.jpg',
  },
  {
    id: 3,
    title: 'Innovative Solutions for Healthcare',
    date: 'July 15, 2025',
    excerpt: 'How MedFord is addressing modern healthcare challenges with innovation.',
    slug: 'innovative-healthcare-solutions',
    image: '/imgs/blog3.jpg',
  },
];

const BlogSection = () => (
    <Section id="blog" className="bg-light">
        <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">From Our Blog</h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-4 "></div>
                <p className="text-lg text-gray-600">Stay updated with the latest news, articles, and insights from the medical technology industry.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post) => (
                    <motion.div
                        key={post.id}
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -10 }}
                        className="bg-white rounded-lg shadow-lg mb-4 overflow-hidden group"
                    >
                        <img src={post.image} alt={post.title} className="w-full  h-48 object-cover" />
                        <div className="p-6 mb-4">
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
  <Section id="contact" className="bg-[#f7f7fb] text-gray-900">
    <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center py-16">
      {/* Left Info Panel */}
      <div className="pr-8">
        <p className="text-xs font-semibold text-purple-600 mb-2 tracking-widest">WE'RE HERE TO HELP YOU</p>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
          <span className="text-purple-700">Discuss</span> Your<br />
          Chemical Solution Needs
        </h2>
        <p className="mt-4 text-base text-gray-600 mb-6">
          Are you looking for top-quality chemical solutions tailored to your needs? Reach out to us.
        </p>
        <div className="flex items-center gap-3 mb-2">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12v1m0 0v1m0-1h-4m4 0h4m-4 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <span className="text-sm font-medium">E-mail</span>
        </div>
        <p className="text-sm text-gray-700 mb-4">
support@medford.in
</p>
        <div className="flex items-center gap-3 mb-2">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          <span className="text-sm font-medium">Phone number</span>
        </div>
        <p className="text-sm text-gray-700 mb-4">+919080705892</p>
      </div>
      {/* Right Form Panel */}
      <form className="bg-white p-8 rounded-2xl shadow-xl text-gray-800 w-full max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="fullName" className="block font-semibold mb-1 text-gray-700">Name</label>
          <input type="text" id="fullName" placeholder="Jane Smith" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1 text-gray-700">Email</label>
          <input type="email" id="email" placeholder="email@domain.com" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none" />
        </div>
        <div className="mb-4">
          <label htmlFor="industry" className="block font-semibold mb-1 text-gray-700">Industry</label>
          <select id="industry" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none">
            <option value="">Select...</option>
            <option value="chemical">Chemical</option>
            <option value="pharma">Pharmaceutical</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block font-semibold mb-1 text-gray-700">Message</label>
          <textarea id="message" rows={4} placeholder="Type your message" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"></textarea>
        </div>
        <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          Get a Solution
        </button>
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