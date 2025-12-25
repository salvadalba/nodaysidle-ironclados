/**
 * Artifact Manager Component - List and manage saved artifacts
 */

import { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext.tsx';
import { listArtifacts, deleteArtifact } from '@/api/artifacts.ts';
import type { Artifact } from '@/api/types.ts';

export function ArtifactManager() {
  const { sessionId, artifacts, setArtifacts, removeArtifact } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  useEffect(() => {
    loadArtifacts();
  }, [sessionId]);

  const loadArtifacts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await listArtifacts({ session_id: sessionId });
      setArtifacts(response.artifacts);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load artifacts';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this artifact?')) return;

    try {
      await deleteArtifact(id);
      removeArtifact(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete artifact';
      alert(message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-600">Loading artifacts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-900">Error loading artifacts</h3>
        <p className="mt-2 text-red-700">{error}</p>
        <button
          onClick={loadArtifacts}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (selectedArtifact) {
    return (
      <div>
        <button
          onClick={() => setSelectedArtifact(null)}
          className="mb-4 text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to list
        </button>
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded">
                {selectedArtifact.artifact_type}
              </span>
              <h2 className="mt-2 text-2xl font-bold">{selectedArtifact.title}</h2>
            </div>
            <button
              onClick={() => handleDelete(selectedArtifact.id)}
              className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100"
            >
              Delete
            </button>
          </div>
          <div className="mt-6">
            <pre className="p-4 bg-gray-50 rounded overflow-auto max-h-96 text-sm">
              {JSON.stringify(selectedArtifact.content, null, 2)}
            </pre>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Created: {new Date(selectedArtifact.created_at).toLocaleString()}</p>
            <p>Updated: {new Date(selectedArtifact.updated_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Artifacts</h2>
        <button
          onClick={loadArtifacts}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Refresh
        </button>
      </div>

      {artifacts.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No artifacts saved yet.</p>
          <p className="mt-2 text-sm text-gray-400">
            Generate artifacts using the demo engine above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {artifacts.map((artifact) => (
            <div
              key={artifact.id}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 transition-colors cursor-pointer"
              onClick={() => setSelectedArtifact(artifact)}
            >
              <div className="flex justify-between items-start">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded">
                  {artifact.artifact_type}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(artifact.id);
                  }}
                  className="text-gray-400 hover:text-red-600"
                >
                  ×
                </button>
              </div>
              <h3 className="mt-3 font-semibold">{artifact.title}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {new Date(artifact.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
