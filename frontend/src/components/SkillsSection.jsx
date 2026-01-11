import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Target, Crosshair, Zap, Sword, Shield, Star } from 'lucide-react';

// Icon mapping
const iconMap = {
  target: Target,
  crosshair: Crosshair,
  zap: Zap,
  sword: Sword,
  shield: Shield,
  star: Star,
};

export const SkillsSection = () => {
  const { skills } = siteConfig;

  return (
    <section className="relative bg-dark-bg py-16 lg:py-24">
      {/* Diagonal top clip */}
      <div 
        className="absolute top-0 left-0 right-0 h-24 bg-background"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
      />
      
      {/* Background pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-6 pt-12">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-12">
          {/* Decorative stripes */}
          <div className="flex gap-0.5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-8 bg-background/80"
                style={{ transform: `skewX(-15deg)` }}
              />
            ))}
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-background tracking-wide">
            {skills.sectionTitle}
          </h2>
        </div>
        
        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {skills.items.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Target;
            
            return (
              <div
                key={skill.id}
                className="group hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Skill Icon */}
                <div className="skill-icon mb-6 border-background/30 group-hover:border-background/60 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-background/80 group-hover:text-background transition-colors duration-300" />
                </div>
                
                {/* Skill Title */}
                <h3 className="font-display text-2xl lg:text-3xl text-background mb-3 tracking-wide">
                  {skill.title}
                </h3>
                
                {/* Skill Description */}
                <p className="text-background/70 text-sm lg:text-base leading-relaxed font-body">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
