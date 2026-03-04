import { ColumnDef } from "./column-def";

export interface EntityAdminConfig {
  serviceToken: any;
  columns: ColumnDef<any>[];
  label: string; // Prijateljski naziv za UI (select listu)
}

export const ADMIN_ENTITIES: Record<string, EntityAdminConfig> = { 
    
}