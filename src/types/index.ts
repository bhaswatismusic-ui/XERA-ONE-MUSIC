// X-ERA ONE Universe Types

// ============================================
// World Types
// ============================================

export type WorldId = 'studios' | 'max' | 'infinity';

export interface WorldConfig {
  id: WorldId;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroVideo: VideoConfig;
  theme: WorldTheme;
  features: WorldFeature[];
  stats: WorldStat[];
  cta: CallToAction;
  sections: WorldSection[];
  metadata: WorldMetadata;
}

export interface WorldTheme {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  glowColor: string;
}

export interface WorldFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WorldStat {
  label: string;
  value: string;
  suffix?: string;
}

export interface WorldSection {
  id: string;
  type: SectionType;
  title: string;
  content: string;
  media?: MediaConfig;
  items?: ContentItem[];
}

export type SectionType = 'hero' | 'features' | 'gallery' | 'stats' | 'cta' | 'about' | 'services' | 'portfolio';

export interface WorldMetadata {
  pageTitle: string;
  pageDescription: string;
  keywords: string[];
  ogImage: string;
}

// ============================================
// Video Types
// ============================================

export interface VideoConfig {
  src: string;
  poster?: string;
  fallbackImage: string;
  mimeType: string;
  width: number;
  height: number;
  aspectRatio: string;
}

export interface HeroVideoProps {
  video: VideoConfig;
  overlay?: boolean;
  overlayOpacity?: number;
  overlayGradient?: boolean;
  loop?: boolean;
  muted?: boolean;
  autoplay?: boolean;
  playsInline?: boolean;
  lazy?: boolean;
  priority?: boolean;
  fallbackComponent?: React.ReactNode;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

// ============================================
// Media Types
// ============================================

export interface MediaConfig {
  type: 'image' | 'video' | 'animation';
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder?: string;
}

// ============================================
// Navigation Types
// ============================================

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  worldId?: WorldId;
  children?: NavigationItem[];
  isExternal?: boolean;
}

export interface NavigationConfig {
  main: NavigationItem[];
  footer: NavigationItem[];
  social: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// ============================================
// Content Types
// ============================================

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  media?: MediaConfig;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface CallToAction {
  primary: CTAButton;
  secondary?: CTAButton;
}

export interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

// ============================================
// Universe Types
// ============================================

export interface UniverseConfig {
  name: string;
  tagline: string;
  description: string;
  version: string;
  worlds: WorldId[];
  navigation: NavigationConfig;
  theme: UniverseTheme;
  footer: FooterConfig;
}

export interface UniverseTheme {
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  breakpoints: ThemeBreakpoints;
  animation: ThemeAnimation;
}

export interface ThemeColors {
  primary: ColorRamp;
  secondary: ColorRamp;
  accent: ColorRamp;
  neutral: ColorRamp;
  success: ColorRamp;
  warning: ColorRamp;
  error: ColorRamp;
}

export interface ColorRamp {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
  mono: string;
}

export interface ThemeSpacing {
  unit: number;
  container: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
}

export interface ThemeBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ThemeAnimation {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    default: string;
    smooth: string;
    bounce: string;
  };
}

// ============================================
// Footer Types
// ============================================

export interface FooterConfig {
  columns: FooterColumn[];
  copyright: string;
  legal: NavigationItem[];
}

export interface FooterColumn {
  title: string;
  links: NavigationItem[];
}

// ============================================
// Form Types
// ============================================

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule[];
  options?: SelectOption[];
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: unknown;
  message: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

// ============================================
// Animation Types
// ============================================

export interface AnimationConfig {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: TransitionConfig;
}

export interface TransitionConfig {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  when?: string;
  staggerChildren?: number;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  viewport?: {
    once?: boolean;
    amount?: number | 'some' | 'all';
  };
}

// ============================================
// Store Types
// ============================================

export type ViewState = 'loading' | 'gateway' | 'transitioning' | 'world';

export interface UniverseState {
  currentWorld: WorldId | null;
  isLoading: boolean;
  isTransitioning: boolean;
  theme: 'light' | 'dark';
  reducedMotion: boolean;
  worldConfigs: Record<WorldId, WorldConfig>;
  viewState: ViewState;
  transitionProgress: number;
  hasEntered: boolean;
}

export interface UniverseActions {
  setCurrentWorld: (worldId: WorldId | null) => void;
  setLoading: (isLoading: boolean) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  toggleTheme: () => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  getWorldConfig: (worldId: WorldId) => WorldConfig | undefined;
  enterUniverse: () => void;
  enterWorld: (worldId: WorldId) => void;
  exitWorld: () => void;
  setTransitionComplete: () => void;
  updateTransitionProgress: (progress: number) => void;
}

export type UniverseStore = UniverseState & UniverseActions;
