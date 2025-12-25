import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { query, closePool } from '../pool.ts';
import { env } from '../../config/env.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MIGRATIONS_DIR = join(__dirname, '.');

interface Migration {
  name: string;
  up: string;
  down: string;
}

async function getMigrations(): Promise<Migration[]> {
  const files = readdirSync(MIGRATIONS_DIR);
  const migrations: Migration[] = [];

  for (const file of files) {
    if (file.endsWith('.up.sql')) {
      const name = file.replace('.up.sql', '');
      const upPath = join(MIGRATIONS_DIR, file);
      const downPath = join(MIGRATIONS_DIR, file.replace('.up.sql', '.down.sql'));

      try {
        const up = readFileSync(upPath, 'utf-8');
        const down = readFileSync(downPath, 'utf-8');
        migrations.push({ name, up, down });
      } catch {
        console.warn(`Could not read migration pair for ${name}`);
      }
    }
  }

  return migrations.sort((a, b) => a.name.localeCompare(b.name));
}

async function getExecutedMigrations(): Promise<string[]> {
  try {
    const result = await query<{ migration_name: string }>(
      'SELECT migration_name FROM schema_migrations ORDER BY executed_at'
    );
    return result.rows.map((row) => row.migration_name);
  } catch (error: any) {
    if (error.code === '42P01') {
      // Table doesn't exist, return empty array
      return [];
    }
    throw error;
  }
}

async function createMigrationsTable(): Promise<void> {
  const trackerPath = join(MIGRATIONS_DIR, 'migration-tracker.sql');
  const trackerSql = readFileSync(trackerPath, 'utf-8');
  await query(trackerSql);
  console.log('Created schema_migrations table');
}

async function runMigration(migration: Migration): Promise<void> {
  console.log(`Running migration: ${migration.name}`);
  try {
    await query('BEGIN');
    await query(migration.up);
    await query('INSERT INTO schema_migrations (migration_name) VALUES ($1)', [migration.name]);
    await query('COMMIT');
    console.log(`Migration ${migration.name} completed`);
  } catch (error) {
    await query('ROLLBACK');
    console.error(`Migration ${migration.name} failed:`, error);
    throw error;
  }
}

export async function migrate(): Promise<void> {
  console.log('Starting migrations...');

  // Ensure migrations table exists
  await createMigrationsTable();

  const migrations = await getMigrations();
  const executed = await getExecutedMigrations();
  const pending = migrations.filter((m) => !executed.includes(m.name));

  console.log(`Found ${migrations.length} migrations, ${pending.length} pending`);

  for (const migration of pending) {
    await runMigration(migration);
  }

  console.log('Migrations completed');
}

export async function rollback(targetMigration?: string): Promise<void> {
  console.log('Rolling back migrations...');

  const migrations = await getMigrations();
  const executed = await getExecutedMigrations();

  let toRollback: string[];

  if (targetMigration) {
    const targetIndex = migrations.findIndex((m) => m.name === targetMigration);
    if (targetIndex === -1) {
      throw new Error(`Migration ${targetMigration} not found`);
    }
    toRollback = executed.filter((name) => {
      const index = migrations.findIndex((m) => m.name === name);
      return index > targetIndex;
    });
  } else {
    // Rollback last migration
    toRollback = [executed[executed.length - 1]];
  }

  for (const name of toRollback.reverse()) {
    const migration = migrations.find((m) => m.name === name);
    if (!migration) continue;

    console.log(`Rolling back migration: ${migration.name}`);
    try {
      await query('BEGIN');
      await query(migration.down);
      await query('DELETE FROM schema_migrations WHERE migration_name = $1', [migration.name]);
      await query('COMMIT');
      console.log(`Rollback ${migration.name} completed`);
    } catch (error) {
      await query('ROLLBACK');
      console.error(`Rollback ${migration.name} failed:`, error);
      throw error;
    }
  }

  console.log('Rollback completed');
}

// Run migrations if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrate()
    .then(() => {
      console.log('All migrations completed successfully');
      closePool();
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      closePool();
      process.exit(1);
    });
}
