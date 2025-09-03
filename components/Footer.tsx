
import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary">MedFord Technologies</h3>
            <p className="mt-2 text-gray-400">Pioneering Medical Technology for a Safer Future.</p>
          </div>
          <div>
            <h4 className="font-semibold tracking-wider uppercase">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold tracking-wider uppercase">Contact</h4>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li>123 Innovation Drive</li>
              <li>Boston, MA 02110</li>
              <li className="pt-2">
                <a href="mailto:contact@medford.tech" className="hover:text-white transition-colors">contact@medford.tech</a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-white transition-colors">(123) 456-7890</a>
              </li>
            </ul>
          </div>
          <div>
             <h4 className="font-semibold tracking-wider uppercase">Follow Us</h4>
             <div className="flex mt-4 space-x-4">
                {/* Social media icons here */}
             </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Medford Technologies. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
