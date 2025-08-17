import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Camera, Search, Star, Zap } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import Button from '../ui/Button.jsx';
import TextScramble from '../effects/TextScramble.jsx';

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setScrambleTrigger(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Video reload mechanism with exponential backoff
  const reloadVideo = () => {
    if (retryCount < 3) {
      const iframe = videoRef.current;
      if (iframe) {
        console.log(`Attempting video reload (attempt ${retryCount + 1})`);
        const currentSrc = iframe.src;
        iframe.src = '';
        setTimeout(() => {
          iframe.src = currentSrc;
          setRetryCount(prev => prev + 1);
        }, Math.pow(2, retryCount) * 1000); // Exponential backoff
      }
    } else {
      console.error('Max video reload attempts reached, using fallback');
      setVideoError(true);
    }
  };

  useEffect(() => {
    // Enhanced video monitoring with multiple safeguards
    const iframe = videoRef.current;
    if (iframe) {
      const handleLoad = () => {
        console.log('Video iframe loaded successfully');
        setVideoError(false);
        setVideoLoaded(true);
        setRetryCount(0);
      };
      
      const handleError = () => {
        console.error('Video iframe failed to load');
        setVideoLoaded(false);
        reloadVideo();
      };

      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
      
      // Comprehensive video persistence monitoring
      const checkInterval = setInterval(() => {
        // Check if iframe exists and is visible
        if (!iframe.offsetParent || iframe.style.display === 'none') {
          console.warn('Video iframe became hidden, restoring visibility');
          iframe.style.display = '';
          iframe.style.position = 'absolute';
          iframe.style.opacity = videoError ? '0' : '1';
        }
        
        // Check if iframe src is still set
        if (!iframe.src || iframe.src === 'about:blank') {
          console.warn('Video iframe src was cleared, reloading');
          reloadVideo();
        }
        
        // Check if iframe is still in DOM
        if (!document.contains(iframe)) {
          console.error('Video iframe was removed from DOM!');
          setVideoError(true);
        }
        
        // Force style persistence
        if (iframe.style.width !== '100vw' || iframe.style.height !== '56.25vw') {
          console.warn('Video iframe dimensions changed, restoring');
          iframe.style.width = '100vw';
          iframe.style.height = '56.25vw';
          iframe.style.minHeight = '100vh';
          iframe.style.minWidth = '177.78vh';
        }
      }, 2000);
      
      // Intersection Observer to detect if video goes off-screen unexpectedly
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting && window.scrollY < 100) {
              console.warn('Video iframe not intersecting when it should be visible');
              // Force re-render if we're at the top but video isn't visible
              if (iframe.style.opacity !== '0') {
                iframe.style.transform = 'translate(-50%, -50%)';
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(iframe);
      
      // Initial load timeout with retry
      const timeoutId = setTimeout(() => {
        if (!videoLoaded) {
          console.warn('Video iframe initial load timeout, attempting reload');
          reloadVideo();
        }
      }, 10000);

      // Page visibility change handler
      const handleVisibilityChange = () => {
        if (!document.hidden && iframe) {
          // Re-verify video when page becomes visible
          setTimeout(() => {
            if (!iframe.src || iframe.style.display === 'none') {
              console.log('Page visible but video missing, reloading');
              reloadVideo();
            }
          }, 1000);
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
        clearInterval(checkInterval);
        clearTimeout(timeoutId);
        observer.disconnect();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [videoError, videoLoaded, retryCount]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Cloudflare Stream Video Background - Fixed Implementation */}
      <div className="absolute inset-0 w-full h-full -z-10">
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900" />
        
        {/* Ultra-stable container for the video */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: -1
          }}
        >
          <iframe
            ref={videoRef}
            src="https://customer-fb73nihqgo3s10w7.cloudflarestream.com/8ad00fdbc3d70603421156b74714001e/iframe?muted=true&preload=true&loop=true&autoplay=true&controls=false&poster=https%3A%2F%2Fcustomer-fb73nihqgo3s10w7.cloudflarestream.com%2F8ad00fdbc3d70603421156b74714001e%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
            loading="eager"
            style={{
              position: 'absolute !important',
              top: '50% !important',
              left: '50% !important',
              width: '100vw !important',
              height: '56.25vw !important', /* 16:9 aspect ratio */
              minHeight: '100vh !important',
              minWidth: '177.78vh !important', /* 16:9 aspect ratio */
              transform: 'translate(-50%, -50%) !important',
              border: 'none !important',
              objectFit: 'cover',
              opacity: videoError ? 0 : 1,
              transition: 'opacity 0.3s ease',
              display: 'block !important',
              visibility: 'visible !important',
              zIndex: -1,
              pointerEvents: 'none'
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen={true}
            title="Background Video"
            onLoad={() => {
              console.log('Video iframe onLoad event fired');
              setVideoLoaded(true);
              setVideoError(false);
            }}
            onError={() => {
              console.error('Video iframe onError event fired');
              setVideoLoaded(false);
              reloadVideo();
            }}
          />
        </div>
        
        {/* Optional subtle parallax overlay */}
        <motion.div
          className="absolute inset-0 bg-black/10"
          style={{
            opacity: useTransform(scrollYProgress, [0, 1], [0, 0.2])
          }}
        />
      </div>
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Local Badge with Drone Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
          >
            <Camera className="w-5 h-5 text-primary-400" />
            <span className="text-white text-sm font-medium">AI-Powered Web Development • Southwest Michigan</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-white">
              <TextScramble text="Want This Site?" trigger={scrambleTrigger} />
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Get a Website That Converts
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl lg:text-2xl text-gray-100 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Transform your business with AI-enhanced websites that turn visitors into customers. 
            Modern design, intelligent SEO automation, and AI-powered conversion strategies for Southwest Michigan businesses.
          </motion.p>

          {/* Trust Indicators with New Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-6 mb-10"
          >
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-primary-400" />
              <span className="text-white text-sm font-medium">Local SEO Experts</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
              <Zap className="w-5 h-5 text-primary-400" />
              <span className="text-white text-sm font-medium">AI Development</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-white text-sm font-medium">50+ Success Stories</span>
            </div>
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto"
          >
            <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <Search className="w-8 h-8 text-primary-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Get Found Online</h3>
              <p className="text-gray-200 text-sm">Rank higher in local search results</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <Camera className="w-8 h-8 text-primary-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Convert Visitors</h3>
              <p className="text-gray-200 text-sm">Turn website traffic into paying customers</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <Zap className="w-8 h-8 text-primary-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Lightning Fast</h3>
              <p className="text-gray-200 text-sm">Websites that load instantly & convert</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="xl" className="group bg-primary-600 hover:bg-primary-700 shadow-2xl">
              Get Your Free Website Audit
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              View Our Work
            </Button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-12"
          >
            <p className="text-lg text-gray-200">
              Licensed Commercial Pilot • Call us at{' '}
              <a href="tel:269-261-0069" className="text-primary-400 hover:text-primary-300 font-semibold">
                (269) 261-0069
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;