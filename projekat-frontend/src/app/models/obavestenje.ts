export interface Obavestenje {

    id: number;
    naslov: string;
    sadrzaj: string;
    datumObjave: Date | string;
    fajloviId: number[];
    realizacijaPredmetaId?: number;
    nastavnikNaRealizacijiId?: number;
}
