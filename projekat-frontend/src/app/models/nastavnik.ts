export interface Nastavnik {
  id: number;
  ime: string;
  prezime: string;
  biografija: string;
  adresaId: number;
  zvanjaId: number[];
  angazovanjaId: number[];
  korisnickoIme: string;
  lozinka: string;
  email: string;
}