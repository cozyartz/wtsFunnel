import { motion } from 'framer-motion';
import { 
  Search, 
  Camera, 
  Globe, 
  TrendingUp, 
  Eye, 
  MapPin,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Button from '../ui/Button.jsx';
import Card from '../ui/Card.jsx';

const Services = () => {
  const services = [
    {
      icon: Search,
      title: 'SEO Domination',
      description: 'Rank #1 for local searches and capture every potential customer in your area',
      features: [
        'Complete local SEO optimization',
        'Google Business Profile mastery',
        'Local keyword domination',
        'Citation building & management',
        'Review generation system'
      ],
      price: 'Starting at $1,497/month',
      popular: true
    },
    {
      icon: Camera,
      title: 'Drone Photography & Video',
      description: 'Stunning aerial footage that makes your business impossible to ignore',
      features: [
        'Licensed commercial drone pilot',
        '4K aerial photography & video',
        'Property showcases & tours',
        'Construction progress documentation',
        'Event coverage from above'
      ],
      price: 'Starting at $497/shoot',
      popular: false
    },
    {
      icon: Globe,
      title: 'SEO-Powered Websites',
      description: 'Beautiful websites built for search engine domination and conversions',
      features: [
        'SEO-optimized from day one',
        'Drone photography integration',
        'Lightning-fast loading speeds',
        'Mobile-first design',
        'Conversion optimization'
      ],
      price: 'Starting at $3,997',
      popular: false
    }
  ];

  const whyChooseUs = [
    {
      icon: Search,
      title: 'SEO Specialists',
      description: 'We live and breathe SEO. Every strategy is designed to dominate local search and drive qualified traffic.'
    },
    {
      icon: Camera,
      title: 'Licensed Drone Pilot',
      description: 'Professional aerial photography that showcases your business from perspectives your competitors can\'t match.'
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: 'Our clients consistently rank #1 for their target keywords and see measurable increases in leads and sales.'
    },
    {
      icon: MapPin,
      title: 'Southwest Michigan Experts',
      description: 'We understand the local market dynamics in Battle Creek, Kalamazoo, and surrounding areas intimately.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-950">
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
              SEO Excellence & <span className="text-primary-400">Aerial Artistry</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Combining cutting-edge SEO expertise with breathtaking drone photography to make 
              Southwest Michigan businesses dominate their markets both online and visually.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative"
            >
              <Card className={`h-full ${service.popular ? 'ring-2 ring-primary-500' : ''}`}>
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="bg-primary-600/10 border border-primary-600/20 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <div className="text-center mb-6">
                    <span className="text-2xl font-bold text-primary-400">{service.price}</span>
                  </div>
                  <Button 
                    variant={service.popular ? 'primary' : 'outline'} 
                    className="w-full group"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-900 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
            >
              The Perfect Combination: SEO + Aerial Excellence
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-gray-300"
            >
              We're not just service providers – we're your competitive advantage in Southwest Michigan.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-primary-600/10 border border-primary-600/20 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">{item.title}</h4>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Dominate Your Local Market?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Combine the power of professional SEO with stunning drone photography to make your 
            Southwest Michigan business impossible to ignore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Get Your Free SEO Audit + Drone Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              View Drone Portfolio
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;