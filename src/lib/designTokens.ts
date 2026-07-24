import React context for the design tokens so they can be easily accessed in JavaScript/TypeScript code.







]++;
 let me create a design tokens context.


<tool_call>
<function=Write>
<parameter=content>
import React, { createContext, useContext } from 'react';

interface DesignTokens {
  // Colors
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    neutral: string;
    surface: string;
    surfaceElevated: string;
    text: string;
    textMuted: string;
    border: string;
    success: string;
    warning: string;
    destructive: string;
    whatsapp: string;
  };

  // Typography
  typography: {
    fontSizes: {
      displayXL: string;
      h1: string;
      h2: string;
      h3: string;
      bodyLG: string;
      bodyMD: string;
      bodySM: string;
      mono: string;
      labelCaps: string;
    };
    fontWeights: {
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
      extraBold: number;
    };
    lineHeights: {
      none: number;
      tight: number;
      snug: number;
      normal: number;
      relaxed: number;
      loose: number;
      bodyLG: number;
      bodyMD: number;
      bodySM: number;
      mono: number;
    };
    letterSpacing: {
      tighter: string;
      tight: string;
      normal: string;
      wide: string;
      wider: string;
      widest: string;
      labelCaps: string;
    };
    fontFamilies: {
      sans: string;
      mono: string;
    };
  };

  // Spacing
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };

  // Border radius
  radius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };

  // Elevation (shadows)
  shadows: {
    card: string;
    cardHover: string;
    modal: string;
  };
}

const designTokens: DesignTokens = {
  colors: {
    primary: '#0B3D4F',
    secondary: '#0F6478',
    tertiary: '#F59E0B',
    neutral: '#FAFAF7',
    surface: '#FFFFFF',
    surfaceElevated: '#F4F5F1',
    text: '#0B1F26',
    textMuted: '#5A6B72',
    border: '#E3E5DF',
    success: '#16A34A',
    warning: '#D97706',
    destructive: '#DC2626',
    whatsapp: '#25D366'
  },

  typography: {
    fontSizes: {
      displayXL: '4rem',
      h1: '2.75rem',
      h2: '2rem',
      h3: '1.375rem',
      bodyLG: '1.125rem',
      bodyMD: '1rem',
      bodySM: '0.875rem',
      mono: '0.875rem',
      labelCaps: '0.75rem'
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800
    },
    lineHeights: {
      none: 1,
      tight: 1.05,
      snug: 1.1,
      normal: 1.2,
      relaxed: 1.3,
      loose: 1.5,
      bodyLG: 1.55,
      bodyMD: 1.6,
      bodySM: 1.5,
      mono: 1.5
    },
    letterSpacing: {
      tighter: '-0.03em',
      tight: '-0.02em',
      normal: '0',
      wide: '0.01em',
      wider: '0.02em',
      widest: '0.05em',
      labelCaps: '0.1em'
    },
    fontFamilies: {
      sans: "'Inter', system-ui, -apple-system, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace"
    }
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '72px',
    '4xl': '96px'
  },

  radius: {
    xs: '4px',
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    full: '9999px'
  },

  shadows: {
    card: '0 1px 2px rgba(11,61,79,0.04), 0 2px 6px rgba(11,61,79,0.06)',
    cardHover: '0 2px 4px rgba(11,61,79,0.06), 0 8px 20px rgba(11,61,79,0.10)',
    modal: '0 12px 32px rgba(11,61,79,0.18)'
  }
};

const DesignTokensContext = createContext<DesignTokens | null>(null);

export const DesignTokensProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <DesignTokensContext.Provider value={designTokens}>{children}</DesignTokensContext.Provider>;
};

export const useDesignTokens = () => {
  const context = useContext(DesignTokensContext);
  if (!context) {
    throw new Error('useDesignTokens must be used within a DesignTokensProvider');
  }
  return context;
};

export default DesignTokensContext;