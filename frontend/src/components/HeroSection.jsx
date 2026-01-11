import React from 'react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/siteConfig';

export const HeroSection = () => {
  const { character } = siteConfig;

  return (
    <section className="relative min-h-[70vh] bg-background overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="relative z-10 animate-fadeInUp">
            {/* Archive Label */}
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4 font-body">
              {character.archiveLabel}
            </p>
            
            {/* Character Name with decorative element */}
            <div className="relative pl-8 mb-6">
              {/* Decorative lines */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-2 bg-foreground/80"
                  />
                ))}
              </div>
              
              {/* Code number */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-muted-foreground/40 text-xs font-mono rotate-[-90deg] origin-center">
                {character.code}
              </div>
              
              {/* Character Name */}
              <h1 className="font-display text-6xl lg:text-8xl tracking-tight text-foreground leading-none">
                {character.name.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>
            </div>
            
            {/* Description */}
            <p className="text-muted-foreground text-base lg:text-lg max-w-md mb-8 leading-relaxed font-body">
              {character.description}
            </p>
            
            {/* CTA Button */}
            <Button variant="hero" size="xl" className="group">
              {character.ctaButtonText}
            </Button>
          </div>
          
          {/* Right Content - Character Image */}
          <div className="relative flex justify-center lg:justify-end animate-slideInRight">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-muted/50 via-transparent to-transparent rounded-full blur-3xl" />
            
            {/* Character Image */}
            <div className="relative">
              <img
                src={character.image}
                alt={character.name}
                className="w-full max-w-lg h-auto object-contain drop-shadow-2xl animate-float"
                style={{ maxHeight: '600px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
