import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Camera, Search, Star, Zap } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import Button from '../ui/Button.jsx';
import TextScramble from '../effects/TextScramble.jsx';

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const [videoState, setVideoState] = useState({
    loaded: false,
    error: false,
    source: 'stream', // 'stream', 'direct', 'fallback'
    retryCount: 0,
    lastError: null,
    debugInfo: {
      domain: '',
      userAgent: '',
      timestamp: null
    }
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms for video
  const videoY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  // Cloudflare Stream sources - "The Creek" video (exact ID from screenshot)
  const videoSources = {
    stream: "https://customer-fb73nihqgo3s10w7.cloudflarestream.com/8ad8f40c307804211506474188d4/iframe?autoplay=true&muted=true&loop=true&controls=false",
    direct: "https://customer-fb73nihqgo3s10w7.cloudflarestream.com/8ad8f40c307804211506474188d4/manifest/video.m3u8",
    backup: "https://customer-fb73nihqgo3s10w7.cloudflarestream.com/8ad8f40c307804211506474188d4/downloads/default.mp4"
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setScrambleTrigger(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Professional video error reporting
  const reportVideoError = (error, context = {}) => {
    const errorReport = {
      error: error.message || error,
      context,
      timestamp: new Date().toISOString(),
      domain: window.location.hostname,
      userAgent: navigator.userAgent.substring(0, 100),
      videoState: videoState.source,
      retryCount: videoState.retryCount
    };
    
    console.group('🎥 Video Error Report');
    console.error('Error:', error);
    console.table(errorReport);
    console.groupEnd();
    
    setVideoState(prev => ({
      ...prev,
      lastError: errorReport,
      debugInfo: {
        domain: errorReport.domain,
        userAgent: errorReport.userAgent,
        timestamp: errorReport.timestamp
      }
    }));
  };

  // Professional video source switching with fallbacks
  const switchVideoSource = async (newSource) => {
    const iframe = videoRef.current;
    if (!iframe) return false;

    try {
      console.log(`🎥 Switching to ${newSource} video source`);
      
      setVideoState(prev => ({
        ...prev,
        source: newSource,
        loaded: false,
        error: false
      }));

      // Clear current source
      iframe.src = '';
      
      // Wait before setting new source
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Set new source
      iframe.src = videoSources[newSource];
      
      return true;
    } catch (error) {
      reportVideoError(error, { context: 'source_switching', newSource });
      return false;
    }
  };

  // Progressive fallback strategy
  const handleVideoFailure = async () => {
    const { source, retryCount } = videoState;
    
    if (retryCount >= 3) {
      console.warn('🎥 Max retries reached, showing fallback background');
      setVideoState(prev => ({ ...prev, error: true }));
      return;
    }

    // Progressive fallback chain
    if (source === 'stream' && retryCount === 0) {
      // First retry: try stream again
      setTimeout(() => {
        setVideoState(prev => ({ ...prev, retryCount: prev.retryCount + 1 }));
        switchVideoSource('stream');
      }, 2000);
    } else if (source === 'stream' && retryCount === 1) {
      // Second attempt: switch to direct video
      console.log('🎥 Stream failed, trying direct video source');
      await switchVideoSource('direct');
      setVideoState(prev => ({ ...prev, retryCount: prev.retryCount + 1 }));
    } else {
      // Final fallback: show enhanced background
      console.log('🎥 All video sources failed, using enhanced background');
      setVideoState(prev => ({ ...prev, error: true }));
    }
  };

  useEffect(() => {
    console.group('🎥 Cloudflare Stream Initialization');
    
    // Initialize debug info
    const currentDomain = window.location.hostname;
    console.log('Domain:', currentDomain);
    console.log('Stream URL:', videoSources.stream);
    
    const iframe = videoRef.current;
    if (!iframe) {
      console.warn('Stream iframe ref not available');
      console.groupEnd();
      return;
    }

    const handleLoad = () => {
      console.log('✅ Cloudflare Stream iframe loaded');
      setVideoState(prev => ({
        ...prev,
        loaded: true,
        error: false,
        retryCount: 0
      }));
    };
    
    const handleError = (e) => {
      console.error('❌ Cloudflare Stream iframe error');
      reportVideoError(e, { context: 'stream_error' });
      setVideoState(prev => ({ ...prev, error: true }));
    };

    // Stream iframe monitoring
    iframe.addEventListener('load', handleLoad);
    iframe.addEventListener('error', handleError);
    
    // Load timeout for Stream
    const timeoutId = setTimeout(() => {
      if (!videoState.loaded && !videoState.error) {
        console.warn('⏱️ Cloudflare Stream timeout - showing fallback');
        setVideoState(prev => ({ ...prev, error: true }));
      }
    }, 6000);

    console.groupEnd();

    return () => {
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
      clearTimeout(timeoutId);
    };
  }, []); // Only run once on mount

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Cloudflare Stream Video Background - Simplified Stable Implementation */}
      <div className="absolute inset-0 w-full h-full -z-10">
        {/* Enhanced fallback background with animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1),transparent_50%)]" />
        </div>
        
        {/* Cloudflare Stream Player with Parallax */}
        <motion.div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{
            y: videoY,
            scale: videoScale,
          }}
        >
          {/* Cloudflare Stream iframe */}
          <iframe
            ref={videoRef}
            src={videoSources.stream}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              border: 'none',
              pointerEvents: 'none',
              opacity: videoState.error ? 0 : 1,
              transition: 'opacity 0.8s ease-in-out',
              objectFit: 'cover',
              width: '120%',
              height: '120%',
              left: '-10%',
              top: '-10%',
              zIndex: 1
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen={true}
            title="Background Video - The Creek"
            onLoad={() => {
              console.log('✅ Cloudflare Stream iframe loaded');
              setVideoState(prev => ({ ...prev, loaded: true, error: false }));
            }}
            onError={(e) => {
              console.error('❌ Cloudflare Stream iframe failed');
              reportVideoError(e, { context: 'stream_iframe_error' });
              setVideoState(prev => ({ ...prev, error: true }));
            }}
          />
          
          {/* Loading indicator */}
          {!videoState.loaded && !videoState.error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-6 h-6 border-2 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Loading video...</span>
              </div>
            </div>
          )}
          
          {/* Debug info (development only) */}
          {process.env.NODE_ENV === 'development' && videoState.debugInfo.domain && (
            <div className="absolute top-4 right-4 bg-black/80 text-white text-xs p-2 rounded font-mono max-w-xs">
              <div>Source: {videoState.source}</div>
              <div>Loaded: {videoState.loaded ? '✅' : '❌'}</div>
              <div>Error: {videoState.error ? '❌' : '✅'}</div>
              <div>Retries: {videoState.retryCount}</div>
              <div>Domain: {videoState.debugInfo.domain}</div>
            </div>
          )}
        </motion.div>
        
        {/* Subtle overlay for text readability */}
        <motion.div
          className="absolute inset-0 bg-black/5"
          style={{
            opacity: useTransform(scrollYProgress, [0, 1], [0, 0.15])
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