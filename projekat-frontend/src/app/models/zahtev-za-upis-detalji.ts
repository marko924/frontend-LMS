import { StatusZahteva } from "./status-zahteva.enum";

export interface ZahtevZaUpisDetalji {
  id: number;
  studentImePrezime: string;
  studentJmbg: string;
  studentEmail: string;
  fakultetNaziv: string;
  studijskiProgramNaziv: string;
  godinaStudijaBroj: number;
  status: StatusZahteva;
  vremePodnosenja: string | Date;
  napomena?: string;
}