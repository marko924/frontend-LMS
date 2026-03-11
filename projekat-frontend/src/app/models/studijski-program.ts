export interface StudijskiProgram {
  id: number;
  naziv: string;
  opis: string;
  fakultetId: number;
  rukovodilacId: number;
  godineStudijaId: number[];
}