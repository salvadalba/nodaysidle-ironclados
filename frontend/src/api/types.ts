/**
 * API type definitions
 */

export type ArtifactType = 'PRD' | 'ARD' | 'TASK_LIST';

export interface Artifact {
  id: string;
  session_id: string;
  artifact_type: ArtifactType;
  title: string;
  content: Record<string, unknown>;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ArtifactCreate {
  session_id: string;
  artifact_type: ArtifactType;
  title: string;
  content: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ArtifactListFilters {
  session_id?: string;
  artifact_type?: ArtifactType;
  limit?: number;
  offset?: number;
}

export interface ArtifactListResponse {
  artifacts: Artifact[];
  total: number;
}

export interface HealthResponse {
  status: string;
  version: string;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}
