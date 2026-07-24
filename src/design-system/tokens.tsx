import React from "react";

export interface BrutalistTokens {
  colors: {
    bg: string;
    bgAlt: string;
    bgCard: string;
    neonCyan: string;
    neonMagenta: string;
    neonLime: string;
    neonOrange: string;
    white: string;
    gray: string;
    grayLight: string;
    border: string;
    borderStrong: string;
    error: string;
    success: string;
  };
  typography: {
    fontSizes: {
      hero: string;
      display: string;
      h1: string;
      h2: string;
      h3: string;
      body: string;
      caption: string;
    };
    fontWeights: {
      regular: number;
      bold: number;
      black: number;
    };
    leading: {
      none: number;
      tight: number;
      snug: number;
      normal: number;
    };
    tracking: {
      tight: string;
      normal: string;
      wide: string;
      wider: string;
      widest: string;
    };
    fontFamilies: {
      sans: string;
      mono: string;
    };
  };
  spacing: Record<string, string>;
  borders: Record<string, string>;
  shadows: Record<string, string>;
}

const tokens: BrutalistTokens = {
  colors: {
    bg: "#050505",
    bgAlt: "#0a0a0a",
    bgCard: "#111111",
    neonCyan: "#00F0FF",
    neonMagenta: "#FF00FF",
    neonLime: "#39FF14",
    neonOrange: "#FF6B00",
    white: "#FFFFFF",
    gray: "#888888",
    grayLight: "#CCCCCC",
    border: "#222222",
    borderStrong: "#FFFFFF",
    error: "#FF0044",
    success: "#39FF14",
  },
  typography: {
    fontSizes: {
      hero: "7rem",
      display: "5rem",
      h1: "3.5rem",
      h2: "2.5rem",
      h3: "1.75rem",
      body: "1rem",
      caption: "0.75rem",
    },
    fontWeights: {
      regular: 600,
      bold: 700,
      black: 900,
    },
    leading: {
      none: 0.85,
      tight: 0.95,
      snug: 1.05,
      normal: 1.2,
    },
    tracking: {
      tight: "-0.04em",
      normal: "0em",
      wide: "0.05em",
      wider: "0.1em",
      widest: "0.2em",
    },
    fontFamilies: {
      sans: "'Inter', system-ui, -apple-system, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
  },
  spacing: {
    "0": "0px",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
    "16": "64px",
    "20": "80px",
    "24": "96px",
  },
  borders: {
    none: "0",
    thin: "1px",
    thick: "2px",
    heavy: "4px",
  },
  shadows: {
    neonCyan: "6px 6px 0px #00F0FF",
    neonMagenta: "6px 6px 0px #FF00FF",
    neonLime: "6px 6px 0px #39FF14",
    white: "6px 6px 0px #FFFFFF",
    none: "0 0 0 transparent",
  },
};

const BrutalistTokensContext = React.createContext<BrutalistTokens | null>(null);

export const BrutalistTokensProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <BrutalistTokensContext.Provider value={tokens}>
      {children}
    </BrutalistTokensContext.Provider>
  );
};

export const useBrutalistTokens = (): BrutalistTokens => {
  const context = React.useContext(BrutalistTokensContext);
  if (!context) {
    throw new Error(
      "useBrutalistTokens must be used within a BrutalistTokensProvider"
    );
  }
  return context;
};

export default BrutalistTokensContext;
