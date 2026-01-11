import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/siteConfig';
import { Circle } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  const { navigation, branding } = siteConfig;

  return (
    <nav className="w-full bg-foreground/95 backdrop-blur-sm py-3 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Navigation Links */}
        <div className="flex items-center justify-center flex-1">
          <div className="flex items-center gap-2 bg-foreground rounded-pill px-2 py-1">
            {navigation.map((item) => (
              <Link key={item.id} to={item.href}>
                <Button
                  variant={item.active || location.pathname === item.href ? "navActive" : "nav"}
                  size="pill"
                  className={`text-background/70 hover:text-background ${
                    item.active || location.pathname === item.href
                      ? 'text-background border-background/30'
                      : ''
                  }`}
                >
                  {item.label}
                  {item.hasIcon && (
                    <Circle className="w-2 h-2 ml-1 fill-current" />
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Logo/Branding */}
        {branding.showLogo && (
          <div className="flex items-center">
            <div className="w-10 h-10 border-2 border-background/30 rounded-lg flex items-center justify-center bg-background/10">
              <span className="text-background text-xs font-bold font-display">
                {branding.logoText}
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
