import { ColumnDef } from "./column-def";
import { AdresaService } from "../services/adresa-service";
import { DrzavaService } from "../services/drzava-service";
import { EvaluacijaZnanjaService } from "../services/evaluacija-znanja-service";
import { FajlService } from "../services/fajl-service";
import { FakultetService } from "../services/fakultet-service";
import { GodinaStudijaService } from "../services/godina-studija-service";
import { InstrumentEvaluacijeService } from "../services/instrument-evaluacije-service";
import { IshodService } from "../services/ishod-service";
import { IspitniRokService } from "../services/ispitni-rok-service";
import { MestoService } from "../services/mesto-service";
import { NastavnikNaRealizacijiService } from "../services/nastavnik-na-realizaciji-service";
import { NastavnikService } from "../services/nastavnik-service";
import { NaucnaOblastService } from "../services/naucna-oblast-service";
import { ObrazovniCiljService } from "../services/obrazovni-cilj-service";
import { OsobljeStudentskeSluzbeService } from "../services/osoblje-studentske-sluzbe-service";
import { PohadjanjePredmetaService } from "../services/pohadjanje-predmeta-service";
import { PolaganjeService } from "../services/polaganje-service";
import { PredmetService } from "../services/predmet-service";
import { RealizacijaPredmetaService } from "../services/realizacija-predmeta-service";
import { RegistrovaniKorisnikService } from "../services/registrovani-korisnik-service";
import { StudentNaGodiniService } from "../services/student-na-godini-service";
import { StudentService } from "../services/student-service";
import { StudijskiProgramService } from "../services/studijski-program-service";
import { TerminNastaveService } from "../services/termin-nastave-service";
import { TipEvaluacijeService } from "../services/tip-evaluacije-service";
import { TipNastaveService } from "../services/tip-nastave-service";
import { TipZvanjaService } from "../services/tip-zvanja-service";
import { UniverzitetService } from "../services/univerzitet-service";
import { ZahtevZaUpisService } from "../services/zahtev-za-upis-service";
import { ZvanjeService } from "../services/zvanje-service";

export interface EntityAdminConfig {
  serviceToken: any;
  columns: ColumnDef<any>[];
  label: string; //naziv za select listu
}

export const ADMIN_ENTITIES: Record<string, EntityAdminConfig> = { 
  'korisnici': {
    label: 'Registrovani korisnici',
    serviceToken: RegistrovaniKorisnikService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'korisnickoIme', label: 'Korisničko Ime', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' }
    ]
  },
  'studenti': {
    label: 'Studenti',
    serviceToken: StudentService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'ime', label: 'Ime', type: 'text' },
      { key: 'prezime', label: 'Prezime', type: 'text' },
      { key: 'jmbg', label: 'JMBG', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' }
    ]
  },
  'nastavnici': {
    label: 'Nastavnici',
    serviceToken: NastavnikService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'ime', label: 'Ime', type: 'text' },
      { key: 'prezime', label: 'Prezime', type: 'text' },
      { key: 'biografija', label: 'Biografija', type: 'text' }
    ]
  },
  'osoblje': {
    label: 'Osoblje studentske službe',
    serviceToken: OsobljeStudentskeSluzbeService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'ime', label: 'Ime', type: 'text' },
      { key: 'prezime', label: 'Prezime', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' }
    ]
  },
  'studenti_na_godini': {
    label: 'Studenti na godini',
    serviceToken: StudentNaGodiniService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'brojIndeksa', label: 'Indeks', type: 'text' },
      { key: 'datumUpisa', label: 'Datum Upisa', type: 'date' },
      { key: 'studentId', label: 'ID Studenta', references: {serviceToken: StudentService, displayField: 'id' } }
    ]
  },
  'nastavnici_realizacija': {
    label: 'Nastavnici na realizaciji',
    serviceToken: NastavnikNaRealizacijiService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'brojCasova', label: 'Časova', type: 'number' },
      { key: 'nastavnikId', label: 'ID Nastavnika', references: {serviceToken: NastavnikService, displayField: 'id' } }
    ]
  },
  'adrese': {
    label: 'Adrese',
    serviceToken: AdresaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'ulica', label: 'Ulica', type: 'text' },
      { key: 'broj', label: 'Broj', type: 'text' },
      { key: 'mestoId', label: 'Mesto', references: {serviceToken: MestoService, displayField: 'naziv' } }
    ]
  },
  'mesta': {
    label: 'Mesta',
    serviceToken: MestoService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text' },
      { key: 'drzavaId', label: 'ID Države', references: {serviceToken: DrzavaService, displayField: 'naziv' } }
    ]
  },
  'drzave': {
    label: 'Države',
    serviceToken: DrzavaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text' }
    ]
  },
  'univerziteti': {
    label: 'Univerziteti',
    serviceToken: UniverzitetService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text' },
      { key: 'datumOsnivanja', label: 'Osnivanje', type: 'date' },
      { key: 'kontakt', label: 'Kontakt', type: 'text' }
    ]
  },
  'fakulteti': {
    label: 'Fakulteti',
    serviceToken: FakultetService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text' },
      { key: 'univerzitetId', label: 'ID Univ.', references: {serviceToken: UniverzitetService, displayField: 'naziv' } }
    ]
  },
  'predmeti': {
    label: 'Predmeti',
    serviceToken: PredmetService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv Predmeta', type: 'text' },
      { key: 'espb', label: 'ESPB', type: 'number' },
      { key: 'opis', label: 'Opis', type: 'text' }
    ]
  },
  'realizacije': {
    label: 'Realizacija predmeta',
    serviceToken: RealizacijaPredmetaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'predmetId', label: 'ID Predmeta', references: {serviceToken: PredmetService, displayField: 'naziv' } }
    ]
  },
  'pohadjanja': {
    label: 'Pohađanja predmeta',
    serviceToken: PohadjanjePredmetaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'konacnaOcena', label: 'Ocena', type: 'number' },
      { key: 'studentNaGodiniId', label: 'Student', references: {serviceToken: StudentNaGodiniService, displayField: 'brojIndeksa' } },
      { key: 'realizacijaId', label: 'ID Realizacije', references: {serviceToken: RealizacijaPredmetaService, displayField: 'id' } }
    ]
  },
  'studijski_programi': {
    label: 'Studijski programi',
    serviceToken: StudijskiProgramService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text' },
      { key: 'fakultetId', label: 'ID Fakulteta', references: {serviceToken: FakultetService, displayField: 'naziv' } }
    ]
  },
  'godine_studija': {
    label: 'Godine studija',
    serviceToken: GodinaStudijaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'godina', label: 'Godina', type: 'number' }
    ]
  },
  'evaluacije_znanja': {
    label: 'Evaluacije znanja',
    serviceToken: EvaluacijaZnanjaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'vremePocetka', label: 'Početak', type: 'date' },
      { key: 'vremeZavrsetka', label: 'Završetak', type: 'date' },
      { key: 'maksimalniBodovi', label: 'Max Bodovi', type: 'number' }
    ]
  },
  'tipovi_evaluacije': {
    label: 'Tipovi evaluacije',
    serviceToken: TipEvaluacijeService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text' }
    ]
  },
  'instrumenti_evaluacije': {
    label: 'Instrumenti evaluacije',
    serviceToken: InstrumentEvaluacijeService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text' },
      { key: 'opis', label: 'Opis', type: 'text' }
    ]
  },
  'fajlovi': {
    label: 'Fajlovi',
    serviceToken: FajlService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'opis', label: 'Opis', type: 'text' },
      { key: 'url', label: 'URL', type: 'text' }
    ]
  },
  'ishodi': {
    label: 'Ishodi učenja',
    serviceToken: IshodService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'opis', label: 'Opis Ishoda', type: 'text' },
      { key: 'predmetId', label: 'ID Predmeta', references: {serviceToken: PredmetService, displayField: 'id' } }
    ]
  },
  'obrazovni_ciljevi': {
    label: 'Obrazovni ciljevi',
    serviceToken: ObrazovniCiljService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'opis', label: 'Opis Cilja', type: 'text' }
    ]
  },
  'zvanja': {
    label: 'Zvanja nastavnika',
    serviceToken: ZvanjeService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'datumIzbora', label: 'Izbor', type: 'date' },
      { key: 'datumOtkaza', label: 'Otkaz', type: 'date' },
      { key: 'nastavnikId', label: 'ID Nastavnika', references: {serviceToken: NastavnikService, displayField: 'id' } }
    ]
  },
  'tipovi_zvanja': {
    label: 'Tipovi zvanja',
    serviceToken: TipZvanjaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text' }
    ]
  },
  'naucne_oblasti': {
    label: 'Naučne oblasti',
    serviceToken: NaucnaOblastService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv Oblasti', type: 'text' }
    ]
  },
  'polaganja': {
    label: 'Polaganja ispita',
    serviceToken: PolaganjeService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'osvojeniBodovi', label: 'Bodovi', type: 'number' },
      { key: 'napomena', label: 'Napomena', type: 'text' }
    ]
  },
  'zahtevi_za_upis': {
    label: 'Zahtevi za upis',
    serviceToken: ZahtevZaUpisService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'status', label: 'Status', type: 'text' },
      { key: 'vremePodnosenja', label: 'Podneto', type: 'date' },
      { key: 'studentId', label: 'ID Studenta', references: {serviceToken: StudentService, displayField: 'id' } }
    ]
  },
  'ispitni_rokovi': {
    label: 'Ispitni rokovi',
    serviceToken: IspitniRokService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv Roka', type: 'text' },
      { key: 'datumPocetka', label: 'Od', type: 'date' },
      { key: 'datumZavrsetka', label: 'Do', type: 'date' }
    ]
  },
  'termini_nastave': {
    label: 'Termini nastave',
    serviceToken: TerminNastaveService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'vremePocetka', label: 'Početak', type: 'date' },
      { key: 'vremeZavrsetka', label: 'Kraj', type: 'date' },
      { key: 'realizacijaId', label: 'ID Realizacije', references: {serviceToken: RealizacijaPredmetaService, displayField: 'id' } }
    ]
  },
  'tipovi_nastave': {
    label: 'Tipovi nastave',
    serviceToken: TipNastaveService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Tip Nastave', type: 'text' }
    ]
  }    
}