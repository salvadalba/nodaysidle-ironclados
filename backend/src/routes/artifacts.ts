/**
 * Artifacts API routes
 */

import { Router, type Request, type Response, type NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { query, getClient } from '../db/pool.ts';
import { artifactCreateSchema, artifactListFiltersSchema } from '../validators/artifacts.ts';
import type { ArtifactCreate, ArtifactType } from '../types/artifacts.ts';

const artifactsRouter = Router();

/**
 * POST /api/artifacts
 * Create a new artifact
 */
artifactsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request body
    const validatedData = artifactCreateSchema.parse(req.body);

    // Generate UUID and timestamps
    const id = uuidv4();
    const now = new Date();

    // Insert into database
    const result = await query(
      `INSERT INTO artifacts (id, session_id, artifact_type, title, content, metadata, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, created_at, updated_at`,
      [
        id,
        validatedData.session_id,
        validatedData.artifact_type,
        validatedData.title,
        JSON.stringify(validatedData.content),
        JSON.stringify(validatedData.metadata || {}),
        now,
        now,
      ]
    );

    res.status(201).json({
      id,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    });
  } catch (error: any) {
    if (error.code?.startsWith('23')) {
      // Database constraint/validation error
      return res.status(400).json({
        error: {
          code: 'INVALID_ARTIFACT_TYPE',
          message: 'Invalid artifact_type or database constraint violation',
        },
      });
    }
    next(error);
  }
});

/**
 * GET /api/artifacts/:id
 * Get a single artifact by ID
 */
artifactsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({
        error: {
          code: 'INVALID_UUID',
          message: 'Invalid UUID format',
        },
      });
    }

    const result = await query(
      `SELECT id, session_id, artifact_type, title, content, metadata, created_at, updated_at
       FROM artifacts
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: {
          code: 'ARTIFACT_NOT_FOUND',
          message: 'Artifact not found',
        },
      });
    }

    const row = result.rows[0];
    res.json({
      id: row.id,
      session_id: row.session_id,
      artifact_type: row.artifact_type,
      title: row.title,
      content: row.content,
      metadata: row.metadata,
      created_at: row.created_at,
      updated_at: row.updated_at,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/artifacts
 * List artifacts with optional filters
 */
artifactsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate query parameters
    const filters = artifactListFiltersSchema.parse(req.query);

    // Build query conditions
    const conditions: string[] = [];
    const params: (string | number)[] = [];
    let paramIndex = 1;

    if (filters.session_id) {
      conditions.push(`session_id = $${paramIndex++}`);
      params.push(filters.session_id);
    }

    if (filters.artifact_type) {
      conditions.push(`artifact_type = $${paramIndex++}`);
      params.push(filters.artifact_type);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get count
    const countResult = await query(
      `SELECT COUNT(*) as total FROM artifacts ${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].total, 10);

    // Get paginated results
    params.push(filters.limit, filters.offset);
    const dataResult = await query(
      `SELECT id, session_id, artifact_type, title, content, metadata, created_at, updated_at
       FROM artifacts
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
      params
    );

    res.json({
      artifacts: dataResult.rows,
      total,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/artifacts/:id
 * Delete an artifact by ID
 */
artifactsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({
        error: {
          code: 'INVALID_UUID',
          message: 'Invalid UUID format',
        },
      });
    }

    const result = await query('DELETE FROM artifacts WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: {
          code: 'ARTIFACT_NOT_FOUND',
          message: 'Artifact not found',
        },
      });
    }

    res.json({ deleted: true });
  } catch (error) {
    next(error);
  }
});

export { artifactsRouter };
