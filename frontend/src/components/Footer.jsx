import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';

export const Footer = () => {
  const { footer, branding } = siteConfig;

  if (!footer.showFooter) return null;

  return (
    <footer className="bg-dark-bg border-t border-background/10 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-background/30 rounded flex items-center justify-center">
              <span className="text-background text-xs font-bold font-display">
                {branding.logoText}
              </span>
            </div>
            <span className="text-background/60 text-sm font-body">
              {footer.copyright}
            </span>
          </div>
          
          {/* Footer Links */}
          <div className="flex items-center gap-6">
            {footer.links.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-background/60 hover:text-background text-sm transition-colors duration-300 font-body"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
