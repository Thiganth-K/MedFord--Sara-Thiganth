
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { NAV_LINKS } from '../constants';

const Logo = () => (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-full">
        <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0z" fill="url(#logo-gradient)"/>
        <path d="M12 28V12h3.5l4.5 9 4.5-9H28v16h-3V15.5l-4.5 9-4.5-9V28h-4z" fill="white" />
        <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8b5cf6"/>
                <stop offset="1" stopColor="#7c3aed"/>
            </linearGradient>
        </defs>
    </svg>
);


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false); // Close mobile menu on scroll
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const linkVariants = {
    rest: { y: 0 },
    hover: { y: -2 },
  };

  const hoverPillVariants = {
      rest: { scale: 0, opacity: 0 },
      hover: { scale: 1, opacity: 1 },
  };


  return (
    <motion.header 
        variants={{
            visible: { y: 0 },
            hidden: { y: "-150%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8"
    >
      <div className="relative max-w-5xl mx-auto">
<nav className="flex justify-between items-center bg-white/30 backdrop-blur-sm rounded-full shadow-lg border border-white/20 px-6 py-3">          <Link to="/" className="flex items-center gap-3 text-lg font-bold text-gray-800 hover:text-primary transition-colors">
            <Logo />
            <span className="hidden sm:inline">MedFord Technologies</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {NAV_LINKS.map((link) => (
              <motion.div
                  key={link.name}
                  variants={linkVariants}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative"
              >
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="relative block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-300"
                >
                  {location.pathname === link.path && (
                    <motion.span 
                      className="absolute inset-0 bg-white rounded-full -z-10" 
                      layoutId="active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.name}</span>
                </Link>
                {location.pathname !== link.path && (
                    <motion.span
                        variants={hoverPillVariants}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="absolute inset-0 bg-white/60 rounded-full -z-10"
                    />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none p-2 rounded-full hover:bg-white/50 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </nav>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[calc(100%+0.5rem)] left-0 right-0 md:hidden bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20"
            >
              <div className="flex flex-col items-stretch py-2">
                {NAV_LINKS.map((link) => (
                  <Link key={link.name} to={link.path} className="px-6 py-3 text-gray-700 hover:text-primary hover:bg-white/50 transition-colors duration-300 text-base text-center">
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
