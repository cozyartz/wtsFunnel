import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Code, Zap, Users, TrendingUp } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import TiltCard from '../effects/TiltCard.jsx';
import RevealAnimation from '../effects/RevealAnimation.jsx';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      name: 'AstroLMS',
      url: 'https://astrolms.com',
      description: 'Advanced Learning Management System with AI-powered features, multi-tenant architecture, and comprehensive education tools.',
      image: '/portfolio/astrolms.jpg',
      category: 'education',
      features: [
        'AI-Powered Content Generation',
        'Multi-tenant Architecture',
        'Real-time Collaboration',
        'Advanced Analytics Dashboard'
      ],
      tech: ['Next.js', 'Cloudflare D1', 'AI Integration', 'Web3'],
      metrics: {}
    },
    {
      name: 'AstroPraxis',
      url: 'https://astropraxis.cc',
      description: 'Professional services platform for healthcare and consulting businesses with integrated scheduling and client management.',
      image: '/portfolio/astropraxis.jpg',
      category: 'professional',
      features: [
        'Online Scheduling System',
        'Client Portal',
        'Secure Document Management',
        'Payment Processing'
      ],
      tech: ['Astro', 'React', 'Cloudflare', 'Tailwind CSS'],
      metrics: {}
    },
    {
      name: 'Cozyartz Media Group',
      url: 'https://cozyartzmedia.com',
      description: 'Our flagship agency website showcasing web development, SEO, and digital marketing services for Southwest Michigan businesses.',
      image: '/portfolio/cozyartz.jpg',
      category: 'agency',
      features: [
        'Portfolio Showcase',
        'Service Catalog',
        'Client Dashboard',
        'Project Management'
      ],
      tech: ['React', 'Node.js', 'MongoDB', 'GSAP'],
      metrics: {}
    },
    {
      name: 'JB Rentals',
      url: 'https://rentwithjbm.com',
      description: 'Property management and rental platform with integrated tenant screening, payment processing, and maintenance requests.',
      image: '/portfolio/jbrentals.jpg',
      category: 'realestate',
      features: [
        'Property Listings',
        'Tenant Portal',
        'Online Applications',
        'Maintenance Tracking'
      ],
      tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Vercel'],
      metrics: {}
    },
    {
      name: 'ZServed',
      url: 'https://zserved.com',
      description: 'Legal process serving platform with real-time tracking, document management, and court filing integration.',
      image: '/portfolio/zserved.jpg',
      category: 'legal',
      features: [
        'Real-time GPS Tracking',
        'Document Management',
        'Court Integration',
        'Automated Reporting'
      ],
      tech: ['Cloudflare Workers', 'D1 Database', 'React', 'Maps API'],
      metrics: {}
    },
    {
      name: 'Client Experience 1',
      url: 'https://exp1.wantthissite.com',
      description: 'Modern business website with responsive design and optimized user experience.',
      image: '/portfolio/exp1.jpg',
      category: 'professional',
      features: [
        'Responsive Design',
        'Fast Loading Speed',
        'SEO Optimized',
        'Contact Forms'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
      metrics: {}
    },
    {
      name: 'Client Experience 2',
      url: 'https://exp2.wantthissite.com',
      description: 'Professional website showcasing services with clean design and intuitive navigation.',
      image: '/portfolio/exp2.jpg',
      category: 'professional',
      features: [
        'Clean Modern Design',
        'Mobile Optimized',
        'Service Showcase',
        'Client Testimonials'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      metrics: {}
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: Globe },
    { id: 'education', name: 'Education', icon: Users },
    { id: 'professional', name: 'Professional', icon: TrendingUp },
    { id: 'realestate', name: 'Real Estate', icon: Code },
    { id: 'legal', name: 'Legal Tech', icon: Zap }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our <span className="text-primary-400">Portfolio</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our recent projects showcase modern web development capabilities. From business platforms to professional websites,
              we create digital solutions for various industries.
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                filter === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <category.icon className="inline-block w-4 h-4 mr-2" />
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <RevealAnimation
              key={project.name}
              delay={index * 0.1}
              duration={0.6}
              slideFrom="bottom"
            >
              <TiltCard className="h-full">
                <Card className="h-full flex flex-col">
                  {/* Project Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-600/20 to-primary-800/20 rounded-t-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="w-16 h-16 text-primary-400/50" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-primary-400 mb-2">Key Features</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {project.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-center">
                            <span className="w-1 h-1 bg-primary-400 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics removed to avoid false claims */}

                    {/* Tech Stack */}
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </TiltCard>
            </RevealAnimation>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and how we can help you achieve your goals with 
            cutting-edge technology and proven strategies.
          </p>
          <Button size="lg" className="group">
            Start Your Project
            <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;