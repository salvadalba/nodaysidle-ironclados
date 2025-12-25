/**
 * Artifact type definitions
 */

export type ArtifactType = 'PRD' | 'ARD' | 'TASK_LIST';

export interface ArtifactCreate {
  session_id: string;
  artifact_type: ArtifactType;
  title: string;
  content: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface Artifact {
  id: string;
  session_id: string;
  artifact_type: ArtifactType;
  title: string;
  content: Record<string, unknown>;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}

export interface ArtifactListFilters {
  session_id?: string;
  artifact_type?: ArtifactType;
  limit?: number;
  offset?: number;
}
