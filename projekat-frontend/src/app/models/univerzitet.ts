export interface Univerzitet {
  id: number;
  naziv: string;
  opis: string;
  datumOsnivanja: Date;
  rektorId: number;
  fakultetId: number[];
  adresaId: number;
}