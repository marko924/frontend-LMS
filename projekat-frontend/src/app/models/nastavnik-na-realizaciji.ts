export interface NastavnikNaRealizaciji {
  id: number;
  brojCasova: number;
  nastavnikId: number;
  realizacijaId: number;
  tipNastaveId: number;
  obavestenjaId?: number[];
}