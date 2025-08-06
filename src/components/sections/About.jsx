import { motion } from 'framer-motion';
import { Camera, Code, MapPin, Users, Award, Clock } from 'lucide-react';
import RevealAnimation from '../effects/RevealAnimation.jsx';
import TiltCard from '../effects/TiltCard.jsx';

const About = () => {
  const stats = [
    { 
      icon: Users, 
      number: '100+', 
      label: 'Happy Clients',
      description: 'Businesses transformed'
    },
    { 
      icon: Award, 
      number: '5+', 
      label: 'Years Experience',
      description: 'In web development'
    },
    { 
      icon: Code, 
      number: '200+', 
      label: 'Projects Delivered',
      description: 'Successful launches'
    },
    { 
      icon: Clock, 
      number: '24/7', 
      label: 'Support',
      description: 'Always available'
    }
  ];

  const team = [
    {
      name: 'Licensed Commercial Pilot',
      role: 'Drone Photography & Videography',
      description: 'FAA Part 107 certified with extensive experience capturing stunning aerial footage for businesses across Southwest Michigan.',
      icon: Camera
    },
    {
      name: 'Full-Stack Developer',
      role: 'Web Development & SEO',
      description: 'Expert in modern web technologies, SEO optimization, and creating high-converting websites that dominate search results.',
      icon: Code
    }
  ];

  const values = [
    {
      title: 'Local Focus',
      description: 'We understand Southwest Michigan businesses and what it takes to succeed in this market.',
      icon: MapPin
    },
    {
      title: 'Results-Driven',
      description: 'Every project is measured by real business outcomes - traffic, leads, and revenue growth.',
      icon: Award
    },
    {
      title: 'AI-Powered Solutions',
      description: 'We integrate artificial intelligence and machine learning to create smart, automated solutions that grow with your business.',
      icon: Code
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <RevealAnimation slideFrom="bottom">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              About <span className="text-primary-400">Cozyartz Media Group</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're a Southwest Michigan digital agency specializing in 
              <strong className="text-primary-400"> AI-powered web development</strong> and 
              <strong className="text-primary-400"> intelligent SEO strategies</strong>. 
              Our cutting-edge AI solutions help local businesses automate processes and dominate their markets with smart technology.
            </p>
          </RevealAnimation>
        </div>

        {/* Stats */}
        <RevealAnimation delay={0.2} slideFrom="bottom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <TiltCard key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center bg-gray-950 border border-gray-700 rounded-lg p-6"
                >
                  <div className="bg-primary-600/10 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-primary-400" />
                  </div>
                  <div className="text-3xl font-bold text-primary-400 mb-2">{stat.number}</div>
                  <div className="text-white font-semibold mb-1">{stat.label}</div>
                  <div className="text-gray-400 text-sm">{stat.description}</div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </RevealAnimation>

        {/* Team */}
        <div className="mb-20">
          <RevealAnimation slideFrom="bottom">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Expert Team & Certifications
            </h3>
          </RevealAnimation>
          
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <RevealAnimation key={member.name} delay={index * 0.2} slideFrom="left">
                <TiltCard>
                  <div className="bg-gray-950 border border-gray-700 rounded-lg p-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-600/10 rounded-lg p-4">
                        <member.icon className="w-8 h-8 text-primary-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                        <p className="text-primary-400 font-semibold mb-3">{member.role}</p>
                        <p className="text-gray-300 leading-relaxed">{member.description}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </RevealAnimation>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <RevealAnimation slideFrom="bottom">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Why Choose Cozyartz Media Group
            </h3>
          </RevealAnimation>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <RevealAnimation key={value.title} delay={index * 0.2} slideFrom="bottom">
                <TiltCard>
                  <div className="bg-gray-950 border border-gray-700 rounded-lg p-8 text-center h-full">
                    <div className="bg-primary-600/10 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-primary-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-4">{value.title}</h4>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                </TiltCard>
              </RevealAnimation>
            ))}
          </div>
        </div>

        {/* Location Focus */}
        <RevealAnimation slideFrom="bottom">
          <div className="bg-gradient-to-r from-primary-600/10 to-primary-800/10 rounded-2xl p-8 text-center border border-primary-600/20">
            <MapPin className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Proudly Serving Southwest Michigan
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto mb-6">
              Based in Battle Creek, we serve businesses throughout Kalamazoo, Portage, Three Rivers, 
              and the greater Southwest Michigan region. We understand the local market and what 
              it takes to help Michigan businesses succeed online.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-400">
              <span>Battle Creek</span>
              <span>•</span>
              <span>Kalamazoo</span>
              <span>•</span>
              <span>Portage</span>
              <span>•</span>
              <span>Three Rivers</span>
              <span>•</span>
              <span>Grand Rapids</span>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default About;