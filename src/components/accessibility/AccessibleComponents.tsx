// ============================================
// Accessibility Utilities and Components
// WCAG 2.1 compliant keyboard navigation, focus management, and ARIA support
// ============================================

import { useEffect, useRef, useCallback, useState, forwardRef, RefObject } from 'react';
import { motion } from 'framer-motion';

// ============================================
// Focus Trap Hook
// ============================================

export interface FocusTrapOptions {
  active?: boolean;
  initialFocus?: RefObject<HTMLElement> | string;
  returnFocus?: boolean;
  allowOutsideClick?: boolean;
  escapeDeactivates?: boolean;
}

export function useFocusTrap(
  ref: RefObject<HTMLElement>,
  options: FocusTrapOptions = {}
) {
  const {
    active = true,
    initialFocus,
    returnFocus = true,
    allowOutsideClick = false,
    escapeDeactivates = true,
  } = options;

  const previousFocus = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!active || !ref.current) return;

      if (e.key === 'Escape' && escapeDeactivates) {
        e.preventDefault();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusableElements = ref.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    },
    [active, ref, escapeDeactivates]
  );

  useEffect(() => {
    if (!active) return;

    previousFocus.current = document.activeElement as HTMLElement;

    if (initialFocus) {
      const focusTarget =
        typeof initialFocus === 'string'
          ? ref.current?.querySelector(initialFocus)
          : initialFocus.current;

      focusTarget?.focus();
    } else {
      const firstFocusable = ref.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      if (returnFocus && previousFocus.current) {
        previousFocus.current.focus();
      }
    };
  }, [active, ref, initialFocus, returnFocus, handleKeyDown]);
}

// ============================================
// Skip Link Component
// ============================================

export interface SkipLinkProps {
  targetId: string;
  label?: string;
}

export function SkipLink({ targetId, label = 'Skip to main content' }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg focus:focus:outline-none focus:focus:ring-2 focus:focus:ring-offset-2"
    >
      {label}
    </a>
  );
}

// ============================================
// Visually Hidden Component
// ============================================

export interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  focusable?: boolean;
}

export function VisuallyHidden({
  children,
  as: Component = 'span',
  focusable,
}: VisuallyHiddenProps) {
  const className = focusable
    ? 'sr-only focus:not-sr-only focus:absolute focus:z-50'
    : 'sr-only';

  return <Component className={className}>{children}</Component>;
}

// ============================================
// Accessible Button Component
// ============================================

export interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  description?: string;
  pressed?: 'true' | 'false' | 'mixed';
  expanded?: boolean;
  hasPopup?: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ label, description, pressed, expanded, hasPopup, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        aria-describedby={description ? `${label}-desc` : undefined}
        aria-pressed={pressed}
        aria-expanded={expanded ?? undefined}
        aria-haspopup={hasPopup}
        {...props}
      >
        {children}
        {description && (
          <VisuallyHidden as="span">{description}</VisuallyHidden>
        )}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

// ============================================
// Accessible Modal Component
// ============================================

export interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = '',
}: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useRef(`modal-title-${Date.now()}`);
  const descId = useRef(`modal-desc-${Date.now()}`);

  useFocusTrap(modalRef, { active: isOpen, returnFocus: true });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId.current}
      aria-describedby={description ? descId.current : undefined}
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`relative bg-neutral-900 rounded-lg shadow-xl max-w-lg w-full ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <div className="p-6">
          <h2 id={titleId.current} className="text-xl font-bold text-white">
            {title}
          </h2>
          {description && (
            <p id={descId.current} className="mt-2 text-white/70">
              {description}
            </p>
          )}
          <div className="mt-4">{children}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// Keyboard Navigation Hook
// ============================================

export interface KeyboardNavigationOptions {
  items: HTMLElement[];
  orientation?: 'horizontal' | 'vertical' | 'both';
  loop?: boolean;
  onSelect?: (index: number, item: HTMLElement) => void;
}

export function useKeyboardNavigation({
  items,
  orientation = 'vertical',
  loop = true,
  onSelect,
}: KeyboardNavigationOptions) {
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const movementKeys = {
        vertical: { next: 'ArrowDown', prev: 'ArrowUp' },
        horizontal: { next: 'ArrowRight', prev: 'ArrowLeft' },
        both: { next: 'ArrowDown', prev: 'ArrowUp' },
      };

      const keys = movementKeys[orientation];

      let newIndex = currentIndex;

      if (e.key === keys.next || (orientation === 'both' && e.key === 'ArrowRight')) {
        e.preventDefault();
        newIndex = currentIndex + 1;
        if (newIndex >= items.length) {
          newIndex = loop ? 0 : items.length - 1;
        }
      } else if (e.key === keys.prev || (orientation === 'both' && e.key === 'ArrowLeft')) {
        e.preventDefault();
        newIndex = currentIndex - 1;
        if (newIndex < 0) {
          newIndex = loop ? items.length - 1 : 0;
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (currentIndex >= 0 && items[currentIndex]) {
          onSelect?.(currentIndex, items[currentIndex]);
        }
        return;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = items.length - 1;
      } else {
        return;
      }

      setCurrentIndex(newIndex);
      items[newIndex]?.focus();
    },
    [currentIndex, items, orientation, loop, onSelect]
  );

  return { currentIndex, handleKeyDown, setCurrentIndex };
}

// ============================================
// Announce to Screen Readers Hook
// ============================================

export function useAnnouncer() {
  const announcerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    document.body.appendChild(announcer);
    announcerRef.current = announcer;

    return () => {
      document.body.removeChild(announcer);
    };
  }, []);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!announcerRef.current) return;

    announcerRef.current.setAttribute('aria-live', priority);
    announcerRef.current.textContent = '';

    setTimeout(() => {
      if (announcerRef.current) {
        announcerRef.current.textContent = message;
      }
    }, 100);
  }, []);

  return announce;
}

// ============================================
// Reduced Motion Hook
// ============================================

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

// ============================================
// Focus Visible Hook
// ============================================

export function useFocusVisible() {
  const [focusVisible, setFocusVisible] = useState(false);
  const usingKeyboard = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        usingKeyboard.current = true;
        setFocusVisible(true);
      }
    };

    const handleMouseDown = () => {
      usingKeyboard.current = false;
      setFocusVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return focusVisible;
}

export default {
  useFocusTrap,
  SkipLink,
  VisuallyHidden,
  AccessibleButton,
  AccessibleModal,
  useKeyboardNavigation,
  useAnnouncer,
  useReducedMotion,
  useFocusVisible,
};
