import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

const PlaceholderPage = () => {
  const location = useLocation();
  const pageName = location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center px-6 py-20">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center">
            <Construction className="w-10 h-10 text-muted-foreground" />
          </div>
          
          {/* Title */}
          <h1 className="font-display text-4xl lg:text-6xl text-foreground mb-4">
            {pageName || 'Page'}
          </h1>
          
          {/* Description */}
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8 font-body">
            Esta página está en construcción. Pronto estará disponible con contenido increíble.
          </p>
          
          {/* Back Button */}
          <Link to="/">
            <Button variant="hero" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceholderPage;
