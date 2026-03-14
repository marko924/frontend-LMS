import { PredmetDetalji } from "./predmet-detalji";

export interface GodinaStudijaDetalji {
  id: number;
  godina: number;
  predmeti: PredmetDetalji[];
}