export interface GodinaStudija {
  id: number;
  godina: number;
  pocetak: Date | string;
  kraj: Date | string;
  predmetiId: number[];
  studijskiProgramId: number;
}