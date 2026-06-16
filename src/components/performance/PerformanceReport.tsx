// ============================================
// Performance Report Component
// Real-time performance metrics display for development
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, HardDrive, Monitor, X } from 'lucide-react';
import { usePerformanceMetrics, usePerformanceBudget, getDeviceCapabilities, PerformanceMetrics } from '@/utils/performance';

// ============================================
// Performance Report Props
// ============================================

export interface PerformanceReportProps {
  show?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  compact?: boolean;
  className?: string;
}

// ============================================
// Performance Report Component
// ============================================

export function PerformanceReport({
  show = true,
  position = 'bottom-right',
  compact = true,
  className = '',
}: PerformanceReportProps) {
  const [isVisible, setIsVisible] = useState(show);
  const [minimized, setMinimized] = useState(compact);

  const metrics = usePerformanceMetrics();
  const caps = getDeviceCapabilities();

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed ${positionClasses[position]} z-[9999] ${className}`}
      role="status"
      aria-label="Performance Report"
    >
      <div className="bg-black/90 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-xs font-medium text-white">Performance</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMinimized(!minimized)}
              className="p-1 text-white/50 hover:text-white transition-colors"
              aria-label={minimized ? 'Expand' : 'Minimize'}
            >
              <Monitor className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 text-white/50 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {!minimized && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3 space-y-3 text-xs min-w-[200px]">
                {/* FPS */}
                <MetricRow
                  icon={<Activity className="w-3 h-3" />}
                  label="FPS"
                  value={metrics.fps}
                  status={getFpsStatus(metrics.fps)}
                  color={getFpsColor(metrics.fps)}
                />

                {/* Memory */}
                {metrics.memory > 0 && (
                  <MetricRow
                    icon={<HardDrive className="w-3 h-3" />}
                    label="Memory"
                    value={`${metrics.memory}MB`}
                    status={getMemoryStatus(metrics.memory)}
                    color={getMemoryColor(metrics.memory)}
                  />
                )}

                {/* Render Time */}
                <MetricRow
                  icon={<Cpu className="w-3 h-3" />}
                  label="Render"
                  value={`${metrics.renderTime}ms`}
                  status={getRenderStatus(metrics.renderTime)}
                  color={getRenderColor(metrics.renderTime)}
                />

                {/* DOM Nodes */}
                <MetricRow
                  icon={<Monitor className="w-3 h-3" />}
                  label="DOM"
                  value={metrics.domNodes}
                  status={getDomStatus(metrics.domNodes)}
                  color={getDomColor(metrics.domNodes)}
                />

                {/* Divider */}
                <div className="border-t border-white/10 pt-2 space-y-1">
                  {/* Device Type */}
                  <div className="flex items-center justify-between text-white/50">
                    <span>Device</span>
                    <span className="text-white/70">
                      {caps.isMobile ? 'Mobile' : caps.isTablet ? 'Tablet' : 'Desktop'}
                    </span>
                  </div>

                  {/* Connection */}
                  <div className="flex items-center justify-between text-white/50">
                    <span>Network</span>
                    <span className="text-white/70">{caps.effectiveType.toUpperCase()}</span>
                  </div>

                  {/* WebGL */}
                  <div className="flex items-center justify-between text-white/50">
                    <span>WebGL</span>
                    <span className={caps.hasWebGL ? 'text-green-400' : 'text-red-400'}>
                      {caps.hasWebGL ? 'Yes' : 'No'}
                    </span>
                  </div>

                  {/* Reduced Motion */}
                  {caps.prefersReducedMotion && (
                    <div className="flex items-center justify-between text-white/50">
                      <span>Motion</span>
                      <span className="text-yellow-400">Reduced</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini Stats */}
        {minimized && (
          <div className="flex items-center gap-3 px-3 py-2 text-xs">
            <span className={`font-mono ${getFpsColor(metrics.fps)}`}>
              {metrics.fps} FPS
            </span>
            {metrics.memory > 0 && (
              <span className="text-white/50">{metrics.memory}MB</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// Metric Row Component
// ============================================

interface MetricRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  status: string;
  color: string;
}

function MetricRow({ icon, label, value, status, color }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-white/50">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-mono ${color}`}>{value}</span>
        <span className="text-[10px] text-white/30">{status}</span>
      </div>
    </div>
  );
}

// ============================================
// Status Helpers
// ============================================

function getFpsStatus(fps: number): string {
  if (fps >= 55) return 'Excellent';
  if (fps >= 30) return 'Good';
  return 'Poor';
}

function getFpsColor(fps: number): string {
  if (fps >= 55) return 'text-green-400';
  if (fps >= 30) return 'text-yellow-400';
  return 'text-red-400';
}

function getMemoryStatus(memory: number): string {
  if (memory < 100) return 'OK';
  if (memory < 500) return 'High';
  return 'Critical';
}

function getMemoryColor(memory: number): string {
  if (memory < 100) return 'text-green-400';
  if (memory < 500) return 'text-yellow-400';
  return 'text-red-400';
}

function getRenderStatus(time: number): string {
  if (time < 16) return 'Fast';
  if (time < 50) return 'OK';
  return 'Slow';
}

function getRenderColor(time: number): string {
  if (time < 16) return 'text-green-400';
  if (time < 50) return 'text-yellow-400';
  return 'text-red-400';
}

function getDomStatus(nodes: number): string {
  if (nodes < 1500) return 'OK';
  if (nodes < 3000) return 'High';
  return 'Critical';
}

function getDomColor(nodes: number): string {
  if (nodes < 1500) return 'text-green-400';
  if (nodes < 3000) return 'text-yellow-400';
  return 'text-red-400';
}

// ============================================
// Performance Warnings Component
// ============================================

export interface PerformanceWarningsProps {
  budget?: {
    minFPS?: number;
    maxMemory?: number;
    maxDOMNodes?: number;
  };
  className?: string;
}

export function PerformanceWarnings({ budget, className = '' }: PerformanceWarningsProps) {
  const { warnings, isWithinBudget } = usePerformanceBudget({
    minFPS: budget?.minFPS ?? 30,
    maxMemory: budget?.maxMemory ?? 500,
    maxDOMNodes: budget?.maxDOMNodes ?? 3000,
  });

  if (isWithinBudget || warnings.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] ${className}`}
    >
      <div className="bg-yellow-500/90 text-black px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
        {warnings.map((warning, index) => (
          <div key={index}>{warning}</div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// Use in Development Only Hook
// ============================================

export function useDevelopmentPerformance(enabled: boolean = import.meta.env.DEV) {
  const [showReport, setShowReport] = useState(enabled);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault();
        setShowReport((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);

  return {
    showReport,
    setShowReport,
    PerformanceComponent: () =>
      showReport ? <PerformanceReport position="top-right" compact={true} /> : null,
  };
}

export default PerformanceReport;
