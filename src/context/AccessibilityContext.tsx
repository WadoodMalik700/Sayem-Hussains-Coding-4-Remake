import React, { createContext, useState, ReactNode } from 'react';

type AccessibilityContextType = {
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reduceMotion: boolean;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setHighContrast: (value: boolean) => void;
  setReduceMotion: (value: boolean) => void;
};

export const AccessibilityContext = createContext<AccessibilityContextType>({
  fontSize: 'medium',
  highContrast: false,
  reduceMotion: false,
  setFontSize: () => {},
  setHighContrast: () => {},
  setReduceMotion: () => {},
});

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        highContrast,
        reduceMotion,
        setFontSize,
        setHighContrast,
        setReduceMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
