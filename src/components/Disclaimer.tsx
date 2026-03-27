import React from 'react';
import { Link } from 'react-router-dom';

interface DisclaimerProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ variant = 'light', className = '' }) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white/50' : 'text-brand-text-muted/70';
  const highlightColor = isDark ? 'text-white/80' : 'text-brand-purple/70';
  const linkColor = isDark ? 'hover:text-white' : 'hover:text-brand-purple';
  const borderColor = isDark ? 'border-white/10' : 'border-brand-gold/20';

  return (
    <div className={`text-center p-4 text-[10px] leading-relaxed ${textColor} border-t ${borderColor} ${className}`}>
      <p className="font-bold mb-1 tracking-wider">NOT THERAPY • NOT DIAGNOSTIC</p>
      <p>This application is for educational and self-management purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.</p>
      <p className={`mt-2 ${highlightColor} font-bold`}>If you are in crisis, call 988 or go to the nearest emergency room.</p>
      <div className="mt-3 flex justify-center space-x-3">
        <Link to="/data-use-agreement" className={`underline ${linkColor}`}>Data Use Agreement</Link>
        <span>|</span>
        <Link to="/tos" className={`underline ${linkColor}`}>Terms of Service</Link>
      </div>
    </div>
  );
};
