/**
 * Artifact validation schemas
 */

import { z } from 'zod';
import type { ArtifactType } from '../types/artifacts.ts';

export const artifactTypeSchema = z.enum(['PRD', 'ARD', 'TASK_LIST'], {
  errorMap: () => ({ message: 'artifact_type must be one of: PRD, ARD, TASK_LIST' }),
});

export const artifactCreateSchema = z.object({
  session_id: z.string().min(1, 'session_id is required').max(255),
  artifact_type: artifactTypeSchema,
  title: z.string().min(1, 'title is required').max(500),
  content: z.object({
    type: z.any(),
  }).refine((val) => {
    const size = JSON.stringify(val).length;
    return size <= 1_048_576; // 1MB max
  }, {
    message: 'content size exceeds 1MB limit',
  }),
  metadata: z.object({
    type: z.any(),
  }).optional().default({}),
});

export const artifactListFiltersSchema = z.object({
  session_id: z.string().max(255).optional(),
  artifact_type: artifactTypeSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export type ArtifactCreateInput = z.infer<typeof artifactCreateSchema>;
export type ArtifactListFiltersInput = z.infer<typeof artifactListFiltersSchema>;
