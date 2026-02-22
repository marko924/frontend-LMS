export interface Poruka {

    id: number;
    naslov: string;
    sadrzaj: string;
    vremeSlanja: Date | string;
    posiljalacId: number;
    primalacId: number;
    fajloviId: number[];
}
