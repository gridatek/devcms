import { Pool } from 'pg';
import { SchemaInfo, TableInfo, ColumnInfo, ForeignKeyInfo, IndexInfo } from '@devcms/shared';

export class SchemaIntrospector {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/devcms'
    });
  }

  async introspect(): Promise<SchemaInfo> {
    try {
      const tables = await this.getTables();
      const relationships = await this.getRelationships();

      return {
        tables,
        relationships
      };
    } catch (error) {
      throw new Error(`Schema introspection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async getTables(): Promise<TableInfo[]> {
    const query = `
      SELECT
        t.table_name,
        c.column_name,
        c.data_type,
        c.is_nullable,
        c.column_default,
        c.character_maximum_length,
        c.numeric_precision,
        c.numeric_scale,
        CASE WHEN pk.column_name IS NOT NULL THEN true ELSE false END as is_primary_key,
        CASE WHEN fk.column_name IS NOT NULL THEN true ELSE false END as is_foreign_key
      FROM information_schema.tables t
      LEFT JOIN information_schema.columns c ON t.table_name = c.table_name
      LEFT JOIN (
        SELECT ku.table_name, ku.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage ku ON tc.constraint_name = ku.constraint_name
        WHERE tc.constraint_type = 'PRIMARY KEY'
      ) pk ON c.table_name = pk.table_name AND c.column_name = pk.column_name
      LEFT JOIN (
        SELECT ku.table_name, ku.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage ku ON tc.constraint_name = ku.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
      ) fk ON c.table_name = fk.table_name AND c.column_name = fk.column_name
      WHERE t.table_schema = 'public'
        AND t.table_type = 'BASE TABLE'
        AND c.column_name IS NOT NULL
      ORDER BY t.table_name, c.ordinal_position;
    `;

    const result = await this.pool.query(query);
    const tablesMap = new Map<string, TableInfo>();

    for (const row of result.rows) {
      if (!tablesMap.has(row.table_name)) {
        tablesMap.set(row.table_name, {
          name: row.table_name,
          columns: [],
          primary_key: [],
          foreign_keys: [],
          indexes: []
        });
      }

      const table = tablesMap.get(row.table_name)!;

      const column: ColumnInfo = {
        name: row.column_name,
        type: row.data_type,
        nullable: row.is_nullable === 'YES',
        default_value: row.column_default,
        is_primary_key: row.is_primary_key,
        is_foreign_key: row.is_foreign_key,
        max_length: row.character_maximum_length,
        precision: row.numeric_precision,
        scale: row.numeric_scale
      };

      table.columns.push(column);

      if (column.is_primary_key) {
        table.primary_key.push(column.name);
      }
    }

    // Get foreign keys
    for (const [tableName, table] of tablesMap) {
      table.foreign_keys = await this.getForeignKeys(tableName);
      table.indexes = await this.getIndexes(tableName);
    }

    return Array.from(tablesMap.values());
  }

  private async getForeignKeys(tableName: string): Promise<ForeignKeyInfo[]> {
    const query = `
      SELECT
        kcu.column_name,
        ccu.table_name AS referenced_table,
        ccu.column_name AS referenced_column,
        tc.constraint_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_name = $1;
    `;

    const result = await this.pool.query(query, [tableName]);
    return result.rows.map(row => ({
      column: row.column_name,
      referenced_table: row.referenced_table,
      referenced_column: row.referenced_column,
      constraint_name: row.constraint_name
    }));
  }

  private async getIndexes(tableName: string): Promise<IndexInfo[]> {
    const query = `
      SELECT
        i.relname as index_name,
        array_agg(a.attname ORDER BY a.attnum) as columns,
        ix.indisunique as is_unique,
        am.amname as index_type
      FROM pg_class t
      JOIN pg_index ix ON t.oid = ix.indrelid
      JOIN pg_class i ON i.oid = ix.indexrelid
      JOIN pg_am am ON i.relam = am.oid
      JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = ANY(ix.indkey)
      WHERE t.relname = $1
        AND t.relkind = 'r'
      GROUP BY i.relname, ix.indisunique, am.amname;
    `;

    const result = await this.pool.query(query, [tableName]);
    return result.rows.map(row => ({
      name: row.index_name,
      columns: row.columns,
      is_unique: row.is_unique,
      type: row.index_type
    }));
  }

  private async getRelationships(): Promise<any[]> {
    const query = `
      SELECT
        tc.table_name,
        kcu.column_name,
        ccu.table_name AS referenced_table,
        ccu.column_name AS referenced_column,
        'one-to-many' as relationship_type
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY';
    `;

    const result = await this.pool.query(query);
    return result.rows;
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}