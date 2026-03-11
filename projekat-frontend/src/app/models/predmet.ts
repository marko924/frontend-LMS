export interface Predmet {
  id: number;
  naziv: string;
  opis: string;
  espb: number;
  obavezan: boolean;
  brojPredavanja: number;
  brojVezbi: number;
  drugiObliciNastave: number;
  istrazivackiRad: number;
  ostaliCasovi: number;
  preduslovId?: number;
  ishodiId: number[];
  realizacijeId: number[];
}