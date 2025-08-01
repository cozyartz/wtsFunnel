import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  CheckCircle, 
  Search, 
  Smartphone, 
  Zap, 
  Shield, 
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Card from '../ui/Card.jsx';

const auditSchema = z.object({
  website: z.string().url('Please enter a valid website URL'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  businessType: z.string().min(1, 'Please select your business type'),
});

const WebsiteAudit = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(auditSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    setIsLoading(false);
    reset();
  };

  const auditFeatures = [
    {
      icon: Search,
      title: 'SEO Analysis',
      description: 'Complete technical SEO audit with local search optimization recommendations'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimization',
      description: 'Mobile-first design analysis and user experience recommendations'
    },
    {
      icon: Zap,
      title: 'Speed Testing',
      description: 'Core Web Vitals analysis and performance optimization suggestions'
    },
    {
      icon: Shield,
      title: 'Security Scan',
      description: 'Website security assessment and vulnerability detection'
    },
    {
      icon: TrendingUp,
      title: 'Conversion Analysis',
      description: 'Lead generation potential and conversion rate optimization tips'
    },
    {
      icon: Award,
      title: 'Competitor Comparison',
      description: 'How you stack up against local Southwest Michigan competitors'
    }
  ];

  const businessTypes = [
    'Restaurant/Food Service',
    'Retail Store',
    'Professional Services',
    'Healthcare/Medical',
    'Home Services',
    'Real Estate',
    'Manufacturing',
    'Non-Profit',
    'Other'
  ];

  if (isSubmitted) {
    return (
      <section id="audit" className="py-20 bg-gray-900">
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
              Thank You! Your Free Audit is On Its Way
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We'll analyze your website and send you a comprehensive report within 24 hours. 
              Our team will also reach out to discuss your results and next steps.
            </p>
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300">Complete audit delivered within 24 hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300">Personalized recommendations for your industry</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300">Free consultation call to discuss your results</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="audit" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Free <span className="text-primary-400">SEO Audit + Drone Quote</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how to dominate local search AND get a custom quote for stunning drone photography 
              that will make your Southwest Michigan business impossible to ignore.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Audit Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">What's Included in Your Free Audit:</h3>
            <div className="space-y-6">
              {auditFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-primary-600/10 border border-primary-600/20 rounded-lg p-3 flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 p-6 bg-gradient-to-r from-primary-600/10 to-primary-700/10 border border-primary-600/20 rounded-lg"
            >
              <h4 className="text-lg font-semibold text-white mb-2">
                🎯 Southwest Michigan Focus
              </h4>
              <p className="text-gray-300">
                We understand the local market in Battle Creek, Kalamazoo, and surrounding areas. 
                Your audit includes insights specific to competing in Southwest Michigan.
              </p>
            </motion.div>
          </motion.div>

          {/* Audit Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Start Your Free Audit
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Your Website URL"
                  placeholder="https://yourwebsite.com"
                  {...register('website')}
                  error={errors.website?.message}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="John Smith"
                    {...register('name')}
                    error={errors.name?.message}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@business.com"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="(269) 555-0123"
                  {...register('phone')}
                  error={errors.phone?.message}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Business Type
                  </label>
                  <select
                    {...register('businessType')}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select your business type</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.businessType && (
                    <p className="text-red-400 text-sm">{errors.businessType.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Analyzing Your Website...' : 'Get My Free Audit Report'}
                </Button>

                <p className="text-sm text-gray-400 text-center">
                  No spam, ever. We'll send you actionable insights to help grow your business.
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteAudit;