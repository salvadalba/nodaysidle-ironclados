/**
 * Home Page - Main landing page with demo engine
 */

import { DemoEngine } from '@/components/DemoEngine.tsx';
import { ArtifactManager } from '@/components/ArtifactManager.tsx';
import { useState } from 'react';
import type { DemoOutput } from '@/types/wasm.ts';
import { SaveArtifactModal } from '@/components/SaveArtifactModal.tsx';

export default function Home() {
  const [demoOutput, setDemoOutput] = useState<DemoOutput | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleSavePRD = () => {
    if (demoOutput?.prd) {
      setDemoOutput(null);
      setShowSaveModal(true);
    }
  };

  const handleSaveARD = () => {
    if (demoOutput?.ard) {
      setDemoOutput(null);
      setShowSaveModal(true);
    }
  };

  const handleSaveTaskList = () => {
    if (demoOutput?.task_list) {
      setDemoOutput(null);
      setShowSaveModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Ironclad OS</h1>
              <p className="text-sm text-gray-500 mt-1">
                Deterministic AI-powered software development platform
              </p>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Transform Ideas into Production Artifacts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your project idea below and instantly generate structured PRDs,
            architecture diagrams, and actionable task lists—all running client-side
            for maximum privacy and speed.
          </p>
        </section>

        {/* Demo Engine */}
        <section className="mb-16">
          <DemoEngine />
          {demoOutput && (
            <div className="mt-6 flex gap-4 justify-center">
              <button
                onClick={handleSavePRD}
                className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
              >
                Save PRD
              </button>
              <button
                onClick={handleSaveARD}
                className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
              >
                Save ARD
              </button>
              <button
                onClick={handleSaveTaskList}
                className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
              >
                Save Task List
              </button>
            </div>
          )}
        </section>

        {/* Saved Artifacts */}
        <section>
          <ArtifactManager />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2024 Ironclad OS. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Core logic runs locally in your browser via WASM
            </p>
          </div>
        </div>
      </footer>

      {/* Save Modal */}
      {showSaveModal && (
        <SaveArtifactModal
          content={demoOutput || {}}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
}
