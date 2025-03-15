
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload login page when mouse hovers over login button
  const handleLoginHover = () => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = '/login';
    link.as = 'document';
    document.head.appendChild(link);
  };

  // Navigate programmatically for faster transitions
  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-subtle'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center"
            >
              <span className="font-bold text-white text-xl">M</span>
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl font-semibold tracking-tight"
            >
              MindMatrix
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onMouseEnter={handleLoginHover}
                onClick={handleLoginClick}
                className="cursor-pointer"
              >
                Log In
              </Button>
              <Button asChild size="sm" className="relative overflow-hidden group">
                <Link to="/signup">
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400"></span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                to="/features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <div className="pt-4 flex flex-col space-y-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onMouseEnter={handleLoginHover}
                  onClick={handleLoginClick}
                  className="cursor-pointer flex items-center"
                >
                  <LogIn size={16} className="mr-2" />
                  Log In
                </Button>
                <Button asChild size="sm">
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
