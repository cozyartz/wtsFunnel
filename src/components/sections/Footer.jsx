import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Free Audit', href: '#audit' }
  ];

  const services = [
    { name: 'Website Development', href: '#services' },
    { name: 'Local SEO', href: '#services' },
    { name: 'Digital Marketing', href: '#services' },
    { name: 'E-commerce', href: '#services' },
    { name: 'Branding', href: '#services' }
  ];

  const locations = [
    'Battle Creek, MI',
    'Kalamazoo, MI',
    'Grand Rapids, MI',
    'Portage, MI',
    'Three Rivers, MI'
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' }
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/cmgLogo.png" 
                alt="Cozyartz Media Group Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-white font-bold text-2xl">Cozyartz</span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              We help Southwest Michigan businesses dominate local search and convert 
              visitors into customers with modern websites that drive real results.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="tel:269-261-0069" className="hover:text-white transition-colors">
                  (269) 261-0069
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@wantthissite.com" className="hover:text-white transition-colors">
                  info@wantthissite.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span>Battle Creek, MI 49015</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Service Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Service Areas</h3>
            <ul className="space-y-3">
              {locations.map((location) => (
                <li key={location} className="text-gray-300">
                  {location}
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <h4 className="text-white font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 text-sm"
            >
              © {new Date().getFullYear()} Cozyartz Media Group. All rights reserved.
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-6"
            >
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <button
                onClick={scrollToTop}
                className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-colors group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Schema Markup for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Cozyartz Media Group",
            "url": "https://wantthissite.com",
            "logo": "https://wantthissite.com/cmgLogo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-269-261-0069",
              "contactType": "customer service",
              "areaServed": "US",
              "availableLanguage": "en"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Battle Creek",
              "addressRegion": "MI",
              "postalCode": "49015",
              "addressCountry": "US"
            },
            "sameAs": [
              "https://www.facebook.com/cozyartzmedia",
              "https://www.linkedin.com/company/cozyartz-media-group",
              "https://twitter.com/cozyartzmedia",
              "https://www.instagram.com/cozyartzmedia"
            ]
          })
        }}
      />
    </footer>
  );
};

export default Footer;