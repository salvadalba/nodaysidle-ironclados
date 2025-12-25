-- Create artifacts table
CREATE TABLE IF NOT EXISTS artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  artifact_type VARCHAR(50) NOT NULL CHECK (artifact_type IN ('PRD', 'ARD', 'TASK_LIST')),
  title VARCHAR(500) NOT NULL,
  content JSONB NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on session_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_artifacts_session_id ON artifacts(session_id);

-- Create index on artifact_type for filtering
CREATE INDEX IF NOT EXISTS idx_artifacts_type ON artifacts(artifact_type);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_artifacts_created_at ON artifacts(created_at DESC);

-- Create composite index for session + type filtering
CREATE INDEX IF NOT EXISTS idx_artifacts_session_type ON artifacts(session_id, artifact_type);
