/**
 * Device detection utilities for mobile optimization
 */

export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.innerWidth <= 768);
};

export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for low-end device indicators
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;
  const deviceMemory = navigator.deviceMemory || 4;
  
  return hardwareConcurrency <= 4 || deviceMemory <= 4;
};

export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
};

export const getDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop';
  
  if (isMobileDevice()) return 'mobile';
  if (window.innerWidth <= 1024) return 'tablet';
  return 'desktop';
};
