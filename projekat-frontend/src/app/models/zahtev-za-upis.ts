import { StatusZahteva } from "./status-zahteva.enum";

export interface ZahtevZaUpis {

    id: number;
    fakultetId: number;
    studijskiProgramId: number;
    studentId: number;
    godinaStudijaId: number;
    status: StatusZahteva;
    vremePodnosenja: Date | string;
    napomena?: string;
}
