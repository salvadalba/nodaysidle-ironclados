/**
 * Artifacts API endpoints
 */

import { fetchApi } from './client.ts';
import type {
  Artifact,
  ArtifactCreate,
  ArtifactListFilters,
  ArtifactListResponse,
} from './types.ts';

/**
 * Create a new artifact
 */
export async function saveArtifact(
  data: ArtifactCreate
): Promise<Artifact> {
  return fetchApi<Artifact>('/api/artifacts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Get a single artifact by ID
 */
export async function loadArtifact(id: string): Promise<Artifact> {
  return fetchApi<Artifact>(`/api/artifacts/${id}`);
}

/**
 * List artifacts with optional filters
 */
export async function listArtifacts(
  filters: ArtifactListFilters = {}
): Promise<ArtifactListResponse> {
  const params = new URLSearchParams();

  if (filters.session_id) {
    params.append('session_id', filters.session_id);
  }
  if (filters.artifact_type) {
    params.append('artifact_type', filters.artifact_type);
  }
  if (filters.limit) {
    params.append('limit', filters.limit.toString());
  }
  if (filters.offset) {
    params.append('offset', filters.offset.toString());
  }

  const query = params.toString();
  return fetchApi<ArtifactListResponse>(`/api/artifacts${query ? `?${query}` : ''}`);
}

/**
 * Delete an artifact by ID
 */
export async function deleteArtifact(id: string): Promise<{ deleted: boolean }> {
  return fetchApi<{ deleted: boolean }>(`/api/artifacts/${id}`, {
    method: 'DELETE',
  });
}
