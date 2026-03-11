export interface Univerzitet {
  id: number;
  naziv: string;
  opis: string;
  kontakt: string;
  datumOsnivanja: Date;
  rektorId: number;
  fakultetId: number[];
  adresaId: number;
}