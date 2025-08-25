import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Github,
  ArrowRight,
  Heart
} from 'lucide-react';
import Logo2 from "../assets/symbols/Creative Energy Logo.png"


const Footer = () => {
  const footerSections = [
    {
      title: 'Services',
      links: [
        'Design & UX',
        'Development',
        'AI Integration',
        'Consultancy',
        'Marketing',
        'E-commerce'
      ]
    },
    {
      title: 'Industries',
      links: [
        'Finance',
        'Healthcare',
        'Retail',
        'Manufacturing',
        'Government',
        'Education'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Case Studies',
        'Team',
        'Careers',
        'Blog',
        'Contact'
      ]
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-bg-primary border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src={Logo2} 
                alt="Creative Energy" 
                className="h-12 mb-6"
              />
              <p className="font-medium text-gray-500 mb-8 max-w-md">
                Transforming ambitious ideas into market-leading digital products. 
                From concept to scale, we engineer solutions that matter.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-brand-primary" size={20} />
                  <span className="font-regular text-gray-500 hover:text-brand-primary transition-colors cursor-pointer">info@creativeenergy.pk</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-brand-primary" size={20} />
                  <span className="font-regular text-gray-500 hover:text-brand-primary transition-colors cursor-pointer">+92-304-1711777</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-brand-primary" size={20} />
                  <span className="font-regular text-gray-500">Saddar, Lahore, Pakistan</span>
                </div>
              </div>
            </motion.div>
          </div>

          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="heading-3 mb-6 text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <motion.button
                      className="body-medium text-gray-400 hover:text-brand-primary transition-colors duration-300 text-left"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-black border border-gray-700 p-8 mb-16"
        >
          <div className="max-w-2xl">
            <h3 className="heading-2 text-white mb-4">
              Stay ahead of the transformation curve
            </h3>
            <p className="body-medium text-gray-300 mb-6">
              Get insights on digital transformation, AI integration, and industry trends delivered monthly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-4 bg-white/15 border border-gray-600 text-white placeholder-gray-400 focus:border-brand-primary focus:outline-none transition-colors"
              />
              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6 md:mb-0"
          >
            <span className="body-small text-gray-400">
              © 2025 Creative Energy. Made with
            </span>
            <Heart className="text-brand-primary fill-current" size={16} />
            <span className="body-small text-gray-400">
              for ambitious builders
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <motion.button
              onClick={scrollToTop}
              className="body-small text-gray-400 hover:text-brand-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Back to top
            </motion.button>
            
            <div className="w-px h-6 bg-gray-700 mx-2" />
            
            {[Linkedin, Twitter, Github].map((Icon, index) => (
              <motion.button
                key={index}
                className="p-2 bg-gray-800 border border-gray-700 hover:border-brand-primary text-gray-400 hover:text-brand-primary transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={20} />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;