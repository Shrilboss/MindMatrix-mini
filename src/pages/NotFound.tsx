
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full text-center"
        >
          <div className="mb-6 inline-block">
            <div className="relative">
              <div className="text-9xl font-bold text-primary opacity-10">404</div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                Page Not Found
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="outline" size="lg">
              <Link to="/">
                <ArrowLeft size={16} className="mr-2" />
                Go Back
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/">
                <Home size={16} className="mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
