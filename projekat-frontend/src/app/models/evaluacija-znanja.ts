export interface EvaluacijaZnanja {

    id: number;
    vremePocetka: Date | string;
    vremeZavrsetka: Date | string;
    maksimalniBodovi: number;
    tipEvaluacijeId: number;
    realizacijaPredmetaId: number;
    instrumentEvaluacijeId: number;
    ispitniRokId: number;
    polaganjaId?: number[];
    ishodi?: number[]; 
}
