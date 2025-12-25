/**
 * Health check API endpoint
 */

import { fetchApi } from './client.ts';
import type { HealthResponse } from './types.ts';

/**
 * Check API health
 */
export async function healthCheck(): Promise<HealthResponse> {
  return fetchApi<HealthResponse>('/health');
}
