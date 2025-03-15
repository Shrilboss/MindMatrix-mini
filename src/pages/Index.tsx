
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Brain, 
  GraduationCap, 
  Building, 
  Zap, 
  ChevronRight, 
  Briefcase, 
  Network, 
  Sparkles,
  Rocket 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const learnersRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        
        if (scrollPosition > elementPosition + 100) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLearners = () => {
    learnersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animated cards data
  const featureCards = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Learning",
      description: "Adaptive learning paths personalized to each student"
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Industry Connect",
      description: "Direct linkage to employment opportunities"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "College Integration",
      description: "Seamless experience for academic institutions"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Skill Growth",
      description: "Modern skill-building for real-world application"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 -z-10"></div>
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-5 overflow-hidden">
          {isLoaded && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full bg-primary/20 blur-3xl"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-accent/20 blur-3xl"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 2.5, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-[60%] left-[20%] w-40 h-40 rounded-full bg-blue-400/20 blur-3xl"
              />
            </>
          )}
        </div>
        
        <div className="container mx-auto px-4 py-20 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                <Sparkles size={16} />
                AI-powered education ecosystem
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
              >
                Bridging seamless harmony 
                <span className="text-primary block"> between education and industry</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-muted-foreground max-w-xl mb-8"
              >
                MindMatrix connects students, colleges, and industry through AI-powered personalized learning paths, 
                streamlined education management, and intelligent recruitment solutions.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button onClick={scrollToLearners} size="lg" className="group">
                  Start Learning
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" onClick={scrollToFeatures}>
                  Explore Features
                </Button>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative aspect-[4/3] max-w-lg mx-auto"
            >
              <img 
                src="/lovable-uploads/ccaf8f76-6781-4f95-b374-9ea164592d51.png" 
                alt="AI-Powered Skill Analysis" 
                className="w-full h-full object-contain rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 p-4 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-lg shadow-lg">
                <p className="text-sm font-medium flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
                  Powered by advanced AI
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Moving Cards Section */}
      <section className="py-20 overflow-hidden bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Transforming Education with AI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Our platform creates a seamless bridge between academic learning and industry needs
            </motion.p>
          </div>
          
          <div className="relative mt-16">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
            >
              {featureCards.map((card, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-6 hover-scale"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Audience Section - New */}
      <section ref={learnersRef} className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll"
            >
              Who MindMatrix is for
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground animate-on-scroll"
            >
              Our platform serves different users with tailored experiences. Choose your path below.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Learners */}
            <motion.div 
              className="glass-card p-8 hover-scale animate-on-scroll"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Learners</h3>
              <p className="text-muted-foreground mb-5">
                Take personalized courses, enhance your skills, and connect directly with career opportunities.
              </p>
              <ul className="space-y-2 mb-6">
                {['Personalized learning paths', 'AI-guided feedback', 'Skills assessment', 'Industry projects'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <ChevronRight size={16} className="mr-2 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full">
                <Link to="/signup">Start Learning Now</Link>
              </Button>
            </motion.div>

            {/* For Universities */}
            <motion.div 
              className="glass-card p-8 hover-scale animate-on-scroll delay-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Universities</h3>
              <p className="text-muted-foreground mb-5">
                Streamline education management, track accreditation metrics, and enhance student outcomes.
              </p>
              <ul className="space-y-2 mb-6">
                {['Admin analytics dashboard', 'Faculty assistance', 'Accreditation tracking', 'Student insights'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <ChevronRight size={16} className="mr-2 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Schedule a Demo</Link>
              </Button>
            </motion.div>

            {/* For Industry */}
            <motion.div 
              className="glass-card p-8 hover-scale animate-on-scroll delay-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Industry</h3>
              <p className="text-muted-foreground mb-5">
                Find qualified talent through AI-powered matching and engage with educational institutions.
              </p>
              <ul className="space-y-2 mb-6">
                {['AI candidate matching', 'Skill-based assessment', 'Sponsor hackathons', 'Talent analytics'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <ChevronRight size={16} className="mr-2 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Partner With Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 md:py-28 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll"
            >
              Core Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground animate-on-scroll"
            >
              AI-powered solutions connecting all stakeholders in the education ecosystem
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Experience */}
            <motion.div 
              className="glass-card p-8 hover-scale animate-on-scroll"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Students</h3>
              <ul className="space-y-2">
                {['Personalized learning', 'AI guidance', 'Industry projects', 'Placement prep'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <ChevronRight size={16} className="mr-2 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* College Experience */}
            <motion.div 
              className="glass-card p-8 hover-scale animate-on-scroll delay-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Colleges</h3>
              <ul className="space-y-2">
                {['Admin dashboard', 'Faculty tools', 'Accreditation tracking', 'Student insights'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <ChevronRight size={16} className="mr-2 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Industry Experience */}
            <motion.div 
              className="glass-card p-8 hover-scale animate-on-scroll delay-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Industry</h3>
              <ul className="space-y-2">
                {['AI matching', 'Skill assessment', 'Hackathons', 'Talent analytics'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <ChevronRight size={16} className="mr-2 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-xs font-medium animate-on-scroll"
            >
              AI-Powered Platform
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll"
            >
              How MindMatrix Works
            </motion.h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-primary/20 hidden md:block"></div>
            
            {/* Step 1 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center md:items-start mb-16 animate-on-scroll"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4 md:mb-0 relative z-10">
                1
              </div>
              <div className="md:w-1/2 md:pr-12 text-center md:text-right">
                <h3 className="text-xl font-semibold mb-2">Student Onboarding</h3>
                <p className="text-muted-foreground">
                  AI-guided assessments for personalized learning paths
                </p>
              </div>
              <div className="hidden md:block w-0 md:w-1/2"></div>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center md:items-start mb-16 animate-on-scroll"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="md:w-1/2 md:text-right md:pr-12 hidden md:block"></div>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4 md:mb-0 relative z-10">
                2
              </div>
              <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">Adaptive Learning</h3>
                <p className="text-muted-foreground">
                  Dynamic course content based on performance
                </p>
              </div>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center md:items-start mb-16 animate-on-scroll"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4 md:mb-0 relative z-10">
                3
              </div>
              <div className="md:w-1/2 md:pr-12 text-center md:text-right">
                <h3 className="text-xl font-semibold mb-2">Institution Integration</h3>
                <p className="text-muted-foreground">
                  Analytics dashboards for colleges
                </p>
              </div>
              <div className="hidden md:block w-0 md:w-1/2"></div>
            </motion.div>
            
            {/* Step 4 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center md:items-start animate-on-scroll"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="md:w-1/2 md:text-right md:pr-12 hidden md:block"></div>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4 md:mb-0 relative z-10">
                4
              </div>
              <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">Industry Connection</h3>
                <p className="text-muted-foreground">
                  AI-powered talent matching and recruitment
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto glass-card p-10 md:p-16 text-center animate-on-scroll"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Education?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join MindMatrix to bridge the gap between education and industry through 
              AI-powered solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/signup">
                  Start Learning
                  <Zap size={16} className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
