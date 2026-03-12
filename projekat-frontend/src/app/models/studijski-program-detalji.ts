import { GodinaStudijaDetalji } from "./godina-studija-detalji";

export interface StudijskiProgramDetalji {
  id: number;
  naziv: string;
  opis: string;
  fakultetNaziv: string;
  rukovodilacIme: string;
  rukovodilacPrezime: string;
  rukovodilacEmail: string;
  godineStudija: GodinaStudijaDetalji[];
}