export interface GenerationRequest {
  site_id: string;
  content_types?: string[];
  template_overrides?: Record<string, string>;
  output_path?: string;
  clean_output?: boolean;
}

export interface GenerationResult {
  success: boolean;
  generated_files: string[];
  errors: string[];
  warnings: string[];
  execution_time: number;
}

export interface TemplateConfig {
  name: string;
  path: string;
  content_type: string;
  output_pattern: string;
  variables?: Record<string, any>;
}

export interface SchemaInfo {
  tables: TableInfo[];
  relationships: RelationshipInfo[];
}

export interface TableInfo {
  name: string;
  columns: ColumnInfo[];
  primary_key: string[];
  foreign_keys: ForeignKeyInfo[];
  indexes: IndexInfo[];
}

export interface ColumnInfo {
  name: string;
  type: string;
  nullable: boolean;
  default_value?: any;
  is_primary_key: boolean;
  is_foreign_key: boolean;
  max_length?: number;
  precision?: number;
  scale?: number;
}

export interface ForeignKeyInfo {
  column: string;
  referenced_table: string;
  referenced_column: string;
  constraint_name: string;
}

export interface RelationshipInfo {
  table: string;
  column: string;
  referenced_table: string;
  referenced_column: string;
  relationship_type: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

export interface IndexInfo {
  name: string;
  columns: string[];
  is_unique: boolean;
  type: string;
}

export interface ComponentGenerationConfig {
  template_path: string;
  output_path: string;
  content_type: string;
  routing_enabled: boolean;
  seo_enabled: boolean;
  lazy_loading: boolean;
}

export interface RouteConfig {
  path: string;
  component: string;
  data?: Record<string, any>;
  children?: RouteConfig[];
  guards?: string[];
  resolve?: Record<string, string>;
}

export interface ComponentMetadata {
  name: string;
  selector: string;
  template_path: string;
  style_path?: string;
  inputs: string[];
  outputs: string[];
  providers: string[];
  imports: string[];
}