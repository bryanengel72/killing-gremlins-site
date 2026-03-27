import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Calendar, BookOpen, Wrench, Wind } from 'lucide-react';
import { Disclaimer } from './Disclaimer';

export const Layout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/app/home', label: 'Home', icon: Home },
    { path: '/app/phase', label: 'My Phase', icon: Calendar },
    { path: '/app/learn', label: 'Learn', icon: BookOpen },
    { path: '/app/toolbox', label: 'Toolbox', icon: Wrench },
  ];

  return (
    <div className="flex flex-col h-screen bg-brand-bg">
      <main className="flex-1 overflow-y-auto pb-24">
        <Outlet />
        <div className="mt-8 pb-4">
          <Disclaimer />
        </div>
      </main>

      {/* Floating Calm Now Button */}
      <Link
        to="/calm-now"
        className="fixed bottom-20 right-4 bg-brand-gold text-white p-4 rounded-full shadow-[0_0_15px_#C9A030] flex items-center justify-center hover:bg-brand-gold-dark hover:scale-[1.03] transition-all z-50"
      >
        <Wind className="w-6 h-6" />
      </Link>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full glass-panel border-t-0 flex justify-around items-center h-16 z-40 rounded-t-[2rem]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-brand-gold' : 'text-brand-text-muted hover:text-brand-purple'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
