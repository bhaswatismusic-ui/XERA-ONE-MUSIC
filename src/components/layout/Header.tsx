import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { universeConfig } from '@/data';
import { useUniverseStore } from '@/store';
import { navItemVariants, mobileMenuVariants, staggerContainer } from '@/hooks/useMotion';
import { IconButton } from '@/components/ui';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const theme = useUniverseStore((state) => state.theme);
  const toggleTheme = useUniverseStore((state) => state.toggleTheme);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500
        ${
          isScrolled
            ? 'bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800/50 shadow-lg'
            : 'bg-transparent'
        }
      `}
    >
      <nav className="container-universe">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">X</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
              {universeConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="hidden lg:flex items-center gap-8"
          >
            {universeConfig.navigation.main.map((item) => (
              <motion.div key={item.id} variants={navItemVariants} whileHover="hover">
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <IconButton
              variant="ghost"
              icon={theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              onClick={toggleTheme}
              className="hidden sm:flex"
            />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={mobileMenuVariants}
            className="fixed inset-0 top-20 lg:hidden bg-neutral-950/98 backdrop-blur-xl z-40"
          >
            <nav className="container-universe py-8">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="flex flex-col gap-6"
              >
                {universeConfig.navigation.main.map((item) => (
                  <motion.div key={item.id} variants={navItemVariants}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `block text-2xl font-semibold transition-colors ${
                          isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-4 py-3">
                        {item.worldId && (
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.worldId === 'studios'
                                ? 'bg-studios-primary'
                                : item.worldId === 'max'
                                ? 'bg-max-primary'
                                : 'bg-infinity-primary'
                            }`}
                          />
                        )}
                        {item.label}
                      </div>
                    </NavLink>
                  </motion.div>
                ))}

                <motion.div
                  variants={navItemVariants}
                  className="pt-6 border-t border-neutral-800"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-neutral-400">Theme</span>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-2 text-white hover:text-primary-400 transition-colors"
                    >
                      {theme === 'dark' ? (
                        <>
                          <Sun className="w-5 h-5" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-5 h-5" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
