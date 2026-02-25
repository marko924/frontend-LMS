export interface Fakultet {
  id: number;
  naziv: string;
  opis: string;
  univerzitetId: number;
  dekanId: number;
  studentskiProgramId: number[];
  adresaId: number;
}