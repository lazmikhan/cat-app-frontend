// ActiveContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

type ActiveContextType = {
  active: number;
  setActive: (index: number) => void;
};

const ActiveContext = createContext<ActiveContextType | undefined>(undefined);

export function ActiveProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<number>(0);

  return (
    <ActiveContext.Provider value={{ active, setActive }}>
      {children}
    </ActiveContext.Provider>
  );
}

export function useActive() {
  const context = useContext(ActiveContext);
  if (!context) {
    throw new Error('useActive must be used within an ActiveProvider');
  }
  return context;
}
