import { useEffect, useState } from 'react';
import { useDesignTokens } from './designTokens';

interface UseResponsiveValueOptions {
  base: number; // Base value in pixels (typically the md value)
  multiplier?: number; // Multiplier for each breakpoint step
}

export const useResponsiveValue = ({ base, multiplier = 1.5 }: UseResponsiveValueOptions) => {
  const { spacing } = useDesignTokens();
  const [value, setValue] = useState<string>(`${base}px`);

  useEffect(() => {
    const updateValue = () => {
      const width = window.innerWidth;

      // Convert spacing values to numbers for comparison
      const xs = parseInt(spacing.xs);
      const sm = parseInt(spacing.sm);
      const md = parseInt(spacing.md);
      const lg = parseInt(spacing.lg);
      const xl = parseInt(spacing.xl);
      const _2xl = parseInt(spacing['2xl']);
      const _3xl = parseInt(spacing['3xl']);
      const _4xl = parseInt(spacing['4xl']);

      let calculatedValue = base;

      if (width >= 1400) { // 2xl breakpoint
        calculatedValue = base * Math.pow(multiplier, 4); // 4xl equivalent
      } else if (width >= 1200) { // xl breakpoint
        calculatedValue = base * Math.pow(multiplier, 3); // 3xl equivalent
      } else if (width >= 992) { // lg breakpoint
        calculatedValue = base * Math.pow(multiplier, 2); // 2xl equivalent
      } else if (width >= 768) { // md breakpoint
        calculatedValue = base * multiplier; // xl equivalent
      } else if (width >= 576) { // sm breakpoint
        calculatedValue = base; // md (base)
      } else { // xs
        calculatedValue = base / multiplier; // sm equivalent
      }

      setValue(`${Math.round(calculatedValue)}px`);
    };

    // Initial check
    updateValue();

    // Listen for resize events
    window.addEventListener('resize', updateValue);

    // Cleanup
    return () => window.removeEventListener('resize', updateValue);
  }, [base, multiplier, spacing]);

  return value;
};

// Hook for responsive font sizes
export const useResponsiveFontSize = (baseSize: number) => {
  return useResponsiveValue({ base: baseSize, multiplier: 1.25 });
};

// Hook for responsive spacing
export const useResponsiveSpacing = (baseSpacing: number) => {
  return useResponsiveValue({ base: baseSpacing, multiplier: 1.5 });
};

export default useResponsiveValue;