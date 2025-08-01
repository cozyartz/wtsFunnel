import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, MapPin } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: 'David Richardson',
      title: 'Owner',
      business: 'Richardson Construction',
      location: 'Battle Creek, MI',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'The drone footage of our projects is absolutely incredible! We now rank #1 for "Battle Creek construction" and the aerial photos showcase our work like never before. Clients are blown away by our portfolio.',
      results: '+400% project inquiries',
      industry: 'Construction'
    },
    {
      name: 'Lisa Thompson',
      title: 'Broker',
      business: 'Thompson Real Estate',
      location: 'Kalamazoo, MI',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'The combination of drone photography and SEO domination has transformed my real estate business. My listings sell 60% faster and I consistently rank #1 for all my target keywords.',
      results: '+300% faster sales',
      industry: 'Real Estate'
    },
    {
      name: 'Mark Stevens',
      title: 'Event Coordinator',
      business: 'Stevens Wedding Venue',
      location: 'Portage, MI',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'The aerial wedding photos and video tours of our venue are stunning! We went from 20 bookings per year to completely booked out 18 months in advance. The SEO work gets us found by every couple in Southwest Michigan.',
      results: '+500% bookings',
      industry: 'Events & Hospitality'
    },
    {
      name: 'Rachel Martinez',
      title: 'General Manager',
      business: 'Lakeshore Resort & Marina',
      location: 'Three Rivers, MI',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'The drone footage of our lakefront property is breathtaking and brings in guests from all over the Midwest. Combined with their SEO expertise, we now dominate searches for "Michigan lakefront resorts."',
      results: '+250% bookings',
      industry: 'Hospitality'
    },
    {
      name: 'James Wilson',
      title: 'Owner',
      business: 'Wilson Roofing & Solar',
      location: 'Battle Creek, MI',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'The before-and-after drone shots of our roofing projects are incredible sales tools. We show up first for every roofing search in Southwest Michigan and our close rate has doubled.',
      results: '+200% close rate',
      industry: 'Home Services'
    }
  ];

  const stats = [
    { number: '100+', label: 'Drone Shoots' },
    { number: '50+', label: 'SEO Victories' },
    { number: '400%', label: 'Avg. Traffic Increase' },
    { number: '#1', label: 'Local Rankings' }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gray-900">
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
              SEO + Drone Success <span className="text-primary-400">Stories</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how the perfect combination of search engine domination and stunning aerial photography 
              has transformed Southwest Michigan businesses.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="max-w-4xl mx-auto p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                    {/* Testimonial Content */}
                    <div className="flex-1">
                      <div className="flex items-center mb-6">
                        <Quote className="w-8 h-8 text-primary-400 mr-4" />
                        <div className="flex">
                          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      
                      <blockquote className="text-lg lg:text-xl text-gray-300 mb-6 leading-relaxed">
                        "{testimonials[currentIndex].text}"
                      </blockquote>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white text-lg">
                            {testimonials[currentIndex].name}
                          </div>
                          <div className="text-primary-400 font-medium">
                            {testimonials[currentIndex].title}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {testimonials[currentIndex].business}
                          </div>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {testimonials[currentIndex].location}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">
                            {testimonials[currentIndex].results}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {testimonials[currentIndex].industry}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-full p-3 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-full p-3 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary-500' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
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
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help your Southwest Michigan business achieve similar results.
          </p>
          <Button size="lg" className="group">
            Start Your Success Story
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;