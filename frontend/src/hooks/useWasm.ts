import { useState, useEffect, useCallback, useRef } from 'react';
import type { WasmModule, DemoOutput } from '@/types/wasm';

interface UseWasmResult {
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  executeDemo: (input: string) => Promise<DemoOutput>;
  cleanup: () => void;
}

/**
 * Custom hook for loading and managing the WASM demo engine
 */
export function useWasm(): UseWasmResult {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const wasmRef = useRef<WasmModule | null>(null);

  // Load WASM module
  useEffect(() => {
    let isMounted = true;

    async function loadWasm() {
      try {
        setIsLoading(true);
        setError(null);

        // Import the WASM module
        // Note: This path should point to the compiled WASM package
        // @ts-ignore
        const wasmModule = await import('../../../wasm/pkg/ironclad_wasm.js');

        if (!wasmModule) {
          throw new Error('Imported WASM module is undefined');
        }

        // Initialize the WASM memory (required for target web)
        if (typeof wasmModule.default === 'function') {
          await wasmModule.default();
        }

        // Initialize our custom logic
        if (typeof wasmModule.initialize === 'function') {
          wasmModule.initialize();
        } else {
          console.warn('initialize function not found in WASM module, skipping custom init');
        }

        wasmRef.current = wasmModule;

        if (isMounted) {
          setIsInitialized(true);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load WASM module:', err);
        let message = 'Unknown error loading WASM';
        if (err instanceof Error) message = err.message;
        else if (typeof err === 'string') message = err;

        if (isMounted) {
          setError(message);
          setIsLoading(false);
        }
      }
    }

    loadWasm();

    // Cleanup on unmount
    return () => {
      isMounted = false;
      if (wasmRef.current) {
        try {
          if (typeof wasmRef.current.cleanup === 'function') {
            wasmRef.current.cleanup();
          }
        } catch (err) {
          console.error('Error cleaning up WASM:', err);
        }
      }
    };
  }, []);

  // Execute demo function
  const executeDemo = useCallback(async (input: string): Promise<DemoOutput> => {
    if (!wasmRef.current) {
      throw new Error('WASM module not loaded');
    }

    if (!isInitialized) {
      throw new Error('WASM module not initialized');
    }

    try {
      const result = wasmRef.current.executeDemo(input);
      return result as DemoOutput;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error executing demo';
      throw new Error(message);
    }
  }, [isInitialized]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (wasmRef.current) {
      try {
        wasmRef.current.cleanup();
        wasmRef.current = null;
        setIsInitialized(false);
      } catch (err) {
        console.error('Error cleaning up WASM:', err);
      }
    }
  }, []);

  return {
    isLoading,
    error,
    isInitialized,
    executeDemo,
    cleanup,
  };
}
