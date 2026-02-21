export interface Zvanje {
  id: number;
  datumIzbora: Date;
  datumOtkaza: Date | null;
  nastavnikId: number;
  tipZvanjaId: number;
  naucnaOblastId: number;
}