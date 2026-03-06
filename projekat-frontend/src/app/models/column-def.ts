export interface ColumnDef<T> {
  key: string;
  label: string;
  type?: 'text' | 'date' | 'number' | 'datetime';
  actionButton?: {label: string;event: string;};
  references?: {
    serviceToken: any; //servis za ucitavanje npr. MestoService
    displayField: string; //naziv polja za popunjavanje liste (npr. 'naziv')
  };
}