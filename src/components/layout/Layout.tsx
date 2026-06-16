import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLenis } from '@/hooks';
import { pageTransition } from '@/hooks/useMotion';

export function Layout() {
  // Initialize smooth scrolling
  useLenis({
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
  });

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      <Header />
      <main className="flex-1 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key="page-content"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: pageTransition.initial!,
              animate: pageTransition.animate,
              exit: pageTransition.exit,
            }}
            transition={pageTransition.transition}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
