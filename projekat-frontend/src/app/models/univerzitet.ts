export interface Univerzitet {
  id: number;
  naziv: string;
  datumOsnivanja: Date;
  rektorId: number;
  fakultetId: number[];
  adresaId: number;
}