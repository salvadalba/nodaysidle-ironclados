-- Drop composite index
DROP INDEX IF EXISTS idx_artifacts_session_type;

-- Drop created_at index
DROP INDEX IF EXISTS idx_artifacts_created_at;

-- Drop artifact_type index
DROP INDEX IF EXISTS idx_artifacts_type;

-- Drop session_id index
DROP INDEX IF EXISTS idx_artifacts_session_id;

-- Drop artifacts table
DROP TABLE IF EXISTS artifacts;
