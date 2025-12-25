/**
 * Global application state context
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Artifact } from '@/api/types.ts';

interface AppState {
  sessionId: string;
  artifacts: Artifact[];
  isLoading: boolean;
}

interface AppContextValue extends AppState {
  setArtifacts: (artifacts: Artifact[]) => void;
  addArtifact: (artifact: Artifact) => void;
  removeArtifact: (id: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

/**
 * Generate or retrieve session ID from localStorage
 */
function getOrCreateSessionId(): string {
  const stored = localStorage.getItem('ironclad_session_id');
  if (stored) {
    return stored;
  }
  const newId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  localStorage.setItem('ironclad_session_id', newId);
  return newId;
}

export function AppProvider({ children }: AppProviderProps) {
  const [sessionId, setSessionId] = useState('');
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session ID on mount
  useEffect(() => {
    setSessionId(getOrCreateSessionId());
    setIsLoading(false);
  }, []);

  const addArtifact = (artifact: Artifact) => {
    setArtifacts((prev) => [artifact, ...prev]);
  };

  const removeArtifact = (id: string) => {
    setArtifacts((prev) => prev.filter((a) => a.id !== id));
  };

  const value: AppContextValue = {
    sessionId,
    artifacts,
    isLoading,
    setArtifacts,
    addArtifact,
    removeArtifact,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
