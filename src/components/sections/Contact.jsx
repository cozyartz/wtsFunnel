import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Calendar,
  MessageSquare
} from 'lucide-react';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Textarea from '../ui/Textarea.jsx';
import Card from '../ui/Card.jsx';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(1, 'Company name is required'),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select your budget range'),
  timeline: z.string().min(1, 'Please select your timeline'),
  message: z.string().min(10, 'Please provide more details about your project'),
});

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Contact form submitted:', data);
    setIsSubmitted(true);
    setIsLoading(false);
    reset();
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      value: '(269) 261-0069',
      action: 'tel:269-261-0069',
      description: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: Mail,
      title: 'Email Us',
      value: 'info@wantthissite.com',
      action: 'mailto:info@wantthissite.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'Battle Creek, MI 49015',
      action: 'https://maps.google.com/?q=Battle+Creek+MI',
      description: 'Serving Southwest Michigan'
    }
  ];

  const projectTypes = [
    'New Website Development',
    'Website Redesign',
    'SEO Services',
    'Digital Marketing',
    'E-commerce Store',
    'Mobile App',
    'Branding & Design',
    'Other'
  ];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
    'Let\'s discuss'
  ];

  const timelines = [
    'ASAP',
    '1-2 months',
    '3-6 months',
    '6+ months',
    'Just exploring options'
  ];

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-green-600/10 border border-green-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Thank You! We'll Be In Touch Soon
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We've received your message and will respond within 24 hours. 
              Our team is excited to learn more about your project!
            </p>
            <div className="bg-gray-900 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300">We'll review your project details</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300">Schedule a discovery call within 24 hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300">Provide a detailed proposal and timeline</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-gray-950">
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
              Let's Start Your <span className="text-primary-400">Digital Transformation</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to take your Southwest Michigan business to the next level? 
              Let's discuss your goals and create a custom solution that drives results.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Get In Touch</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <a
                    href={info.action}
                    target={info.action.startsWith('http') ? '_blank' : undefined}
                    rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <div className="bg-primary-600/10 border border-primary-600/20 rounded-lg p-3 flex-shrink-0 group-hover:bg-primary-600/20 transition-colors">
                      <info.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{info.title}</h4>
                      <p className="text-primary-400 font-medium">{info.value}</p>
                      <p className="text-gray-400 text-sm">{info.description}</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="p-6 bg-gradient-to-r from-primary-600/10 to-primary-700/10 border border-primary-600/20 rounded-lg"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-primary-400" />
                <h4 className="text-lg font-semibold text-white">Office Hours</h4>
              </div>
              <div className="space-y-1 text-gray-300">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Tell Us About Your Project
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    placeholder="John Smith"
                    {...register('name')}
                    error={errors.name?.message}
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    placeholder="john@company.com"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number *"
                    type="tel"
                    placeholder="(269) 555-0123"
                    {...register('phone')}
                    error={errors.phone?.message}
                  />
                  <Input
                    label="Company Name *"
                    placeholder="Your Business Name"
                    {...register('company')}
                    error={errors.company?.message}
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Project Type *
                    </label>
                    <select
                      {...register('projectType')}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="text-red-400 text-sm">{errors.projectType.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Budget Range *
                    </label>
                    <select
                      {...register('budget')}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p className="text-red-400 text-sm">{errors.budget.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Timeline *
                    </label>
                    <select
                      {...register('timeline')}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select timeline</option>
                      {timelines.map((timeline) => (
                        <option key={timeline} value={timeline}>{timeline}</option>
                      ))}
                    </select>
                    {errors.timeline && (
                      <p className="text-red-400 text-sm">{errors.timeline.message}</p>
                    )}
                  </div>
                </div>

                <Textarea
                  label="Project Details *"
                  placeholder="Tell us about your goals, challenges, and what you're looking to accomplish..."
                  rows={5}
                  {...register('message')}
                  error={errors.message?.message}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full group"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending Message...' : 'Send Message'}
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-sm text-gray-400 text-center">
                  * Required fields. We'll respond within 24 hours with a detailed proposal.
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;