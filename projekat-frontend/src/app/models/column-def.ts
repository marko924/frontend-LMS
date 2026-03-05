export interface ColumnDef<T> {
  key: keyof T;  //  mora biti validan key iz T
  label: string;
  type?: 'text' | 'date' | 'number' | 'datetime';
  actionButton?: {label: string;event: string;};
}