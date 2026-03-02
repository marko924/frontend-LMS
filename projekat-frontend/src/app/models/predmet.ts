export interface Predmet {
  id: number;
  naziv: string;
  opis: string;
  espb: number;
  studijskiProgramiId: number[];
  realizacijeId: number[];
}