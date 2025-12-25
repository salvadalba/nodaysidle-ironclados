/**
 * Save Artifact Modal Component
 */

import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext.tsx';
import { saveArtifact } from '@/api/artifacts.ts';
import type { ArtifactType } from '@/api/types.ts';

interface SaveArtifactModalProps {
  content: Record<string, unknown>;
  onClose: () => void;
}

export function SaveArtifactModal({ content, onClose }: SaveArtifactModalProps) {
  const { sessionId, addArtifact } = useAppContext();
  const [title, setTitle] = useState('');
  const [artifactType, setArtifactType] = useState<ArtifactType>('PRD');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const artifact = await saveArtifact({
        session_id: sessionId,
        artifact_type: artifactType,
        title: title.trim(),
        content,
      });

      addArtifact(artifact);
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save artifact';
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Save Artifact</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter artifact title"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-1">
              Type *
            </label>
            <select
              id="type"
              value={artifactType}
              onChange={(e) => setArtifactType(e.target.value as ArtifactType)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="PRD">PRD</option>
              <option value="ARD">ARD</option>
              <option value="TASK_LIST">Task List</option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !title.trim()}
              className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
