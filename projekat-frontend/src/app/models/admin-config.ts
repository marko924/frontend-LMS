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
import { ForumService } from "../services/forum-service";
import { KorisnikNaForumuService } from "../services/korisnik-na-forumu-service";
import { NastavniMaterijalService } from "../services/nastavni-materijal-service";
import { ObjavaService } from "../services/objava-service";
import { ObavestenjeService } from "../services/obavestenje-service";
import { PorukaService } from "../services/poruka-service";
import { PrijaviIspitComponent } from "../components/prijavi-ispit-component/prijavi-ispit-component";
import { TemaService } from "../services/tema-service";
import { UlogaService } from "../services/uloga-service";
import { IshodObrazovniCiljService } from "../services/ishod-obrazovni-cilj-service";

export interface EntityAdminConfig {
  serviceToken: any;
  columns: ColumnDef<any>[];
  label: string; //naziv za select listu
}

export const ADMIN_ENTITIES: Record<string, EntityAdminConfig> = { 

  'registrovani_korisnici': {
    label: 'Registrovani korisnici',
    serviceToken: RegistrovaniKorisnikService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'korisnickoIme', label: 'Korisničko Ime', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'text', required: true }
    ]
  },
  'studenti': {
    label: 'Studenti',
    serviceToken: StudentService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'ime', label: 'Ime', type: 'text', required: true },
      { key: 'prezime', label: 'Prezime', type: 'text', required: true },
      { key: 'jmbg', label: 'JMBG', type: 'text', required: true },
      { key: 'adresaId', label: 'ID Adrese', references: {serviceToken: AdresaService, displayField: 'ulica' }, required: true }
    ]
  },
  'nastavnici': {
    label: 'Nastavnici',
    serviceToken: NastavnikService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'ime', label: 'Ime', type: 'text', required: true },
      { key: 'prezime', label: 'Prezime', type: 'text', required: true },
      { key: 'biografija', label: 'Biografija', type: 'text', required: true },
      { key: 'adresaId', label: 'ID Adrese', references: {serviceToken: AdresaService, displayField: 'ulica' }, required: true }
    ]
  },
  'osoblje': {
    label: 'Osoblje studentske službe',
    serviceToken: OsobljeStudentskeSluzbeService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'ime', label: 'Ime', type: 'text', required: true },
      { key: 'prezime', label: 'Prezime', type: 'text', required: true }
    ]
  },
  'uloge': {
    label: 'Uloga',
    serviceToken: UlogaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text', required: true }
    ]
  },
  'studenti_na_godini': {
    label: 'Studenti na godini',
    serviceToken: StudentNaGodiniService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'brojIndeksa', label: 'Indeks', type: 'text', required: true },
      { key: 'datumUpisa', label: 'Datum Upisa', type: 'datetime', required: true },
      { key: 'studentId', label: 'ID Studenta', references: {serviceToken: StudentService, displayField: 'id' }, required: true },
      { key: 'godinaStudijaId', label: 'ID Godine studija', references: {serviceToken: GodinaStudijaService, displayField: 'godina' }, required: true }
    ]
  },
  'nastavnici_na_realizacija': {
    label: 'Nastavnici na realizaciji',
    serviceToken: NastavnikNaRealizacijiService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'brojCasova', label: 'Broj časova', type: 'number', required: true },
      { key: 'nastavnikId', label: 'ID Nastavnika', references: {serviceToken: NastavnikService, displayField: 'id' }, required: true },
      { key: 'realizacijaId', label: 'ID Realizacije', references: {serviceToken: RealizacijaPredmetaService, displayField: 'id' }, required: true },
      { key: 'tipNastaveId', label: 'ID Tipa Nastave', references: {serviceToken: TipNastaveService, displayField: 'naziv' }, required: true }
    ]
  },
  'adrese': {
    label: 'Adrese',
    serviceToken: AdresaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'ulica', label: 'Ulica', type: 'text', required: true },
      { key: 'broj', label: 'Broj', type: 'text', required: true },
      { key: 'mestoId', label: 'ID Mesta', references: {serviceToken: MestoService, displayField: 'naziv' }, required: true }
    ]
  },
  'mesta': {
    label: 'Mesta',
    serviceToken: MestoService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text', required: true },
      { key: 'drzavaId', label: 'ID Države', references: {serviceToken: DrzavaService, displayField: 'naziv' }, required: true }
    ]
  },
  'drzave': {
    label: 'Države',
    serviceToken: DrzavaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text', required: true }
    ]
  },
  'univerziteti': {
    label: 'Univerziteti',
    serviceToken: UniverzitetService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text', required: true },
      { key: 'opis', label: 'Opis', type: 'text', required: true },
      { key: 'datumOsnivanja', label: 'Osnivanje', type: 'datetime', required: true },
      { key: 'kontakt', label: 'Kontakt', type: 'text', required: true },
      { key: 'rektorId', label: 'ID Rektora', references: {serviceToken: NastavnikService, displayField: 'id' }, required: true },
      { key: 'adresaId', label: 'ID Adrese', references: {serviceToken: AdresaService, displayField: 'ulica' }, required: true }
    ]
  },
  'fakulteti': {
    label: 'Fakulteti',
    serviceToken: FakultetService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text', required: true },
      { key: 'opis', label: 'Opis', type: 'text', required: true },
      { key: 'univerzitetId', label: 'ID Univ.', references: {serviceToken: UniverzitetService, displayField: 'naziv' }, required: true },
      { key: 'dekanId', label: 'ID Dekana', references: {serviceToken: NastavnikService, displayField: 'id' }, required: true },
      { key: 'adresaId', label: 'ID Adrese', references: {serviceToken: AdresaService, displayField: 'ulica' }, required: true }
    ]
  },
  'predmeti': {
    label: 'Predmeti',
    serviceToken: PredmetService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv Predmeta', type: 'text', required: true },
      { key: 'espb', label: 'ESPB', type: 'number', required: true },
      { key: 'opis', label: 'Opis', type: 'text', required: true },
      { key: 'brojPredavanja', label: 'Broj predavanja', type: 'number', required: true },
      { key: 'brojVezbi', label: 'Broj vezbi', type: 'number', required: true },
      { key: 'obavezan', label: 'Obavezan', type: 'boolean', required: true },
      { key: 'ostaliCasovi', label: 'Ostali casovi', type: 'number', required: true },
      { key: 'drugiObliciNastave', label: 'Drugi oblici nastave', type: 'number', required: true },
      { key: 'istrazivackiRad', label: 'Istrazivacki rad', type: 'number', required: true },
      { key: 'godinaStudijaId', label: 'ID Godine studija', references: {serviceToken: GodinaStudijaService, displayField: 'godina' }, required: true },
      { key: 'preduslovId', label: 'ID Preduslova', references: {serviceToken: PredmetService, displayField: 'naziv' }, required: true }
    ]
  },
  'realizacije': {
    label: 'Realizacija predmeta',
    serviceToken: RealizacijaPredmetaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'predmetId', label: 'ID Predmeta', references: {serviceToken: PredmetService, displayField: 'naziv' }, required: true }
    ]
  },
  'pohadjanja': {
    label: 'Pohađanja predmeta',
    serviceToken: PohadjanjePredmetaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'konacnaOcena', label: 'Ocena', type: 'number', required: true },
      { key: 'studentNaGodiniId', label: 'Student', references: {serviceToken: StudentNaGodiniService, displayField: 'brojIndeksa' }, required: true },
      { key: 'realizacijaId', label: 'ID Realizacije', references: {serviceToken: RealizacijaPredmetaService, displayField: 'id' }, required: true }
    ]
  },
  'studijski_programi': {
    label: 'Studijski programi',
    serviceToken: StudijskiProgramService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text', required: true },
      { key: 'opis', label: 'Opis', type: 'text', required: true },
      { key: 'fakultetId', label: 'ID Fakulteta', references: {serviceToken: FakultetService, displayField: 'naziv' }, required: true },
      { key: 'rukovodilacId', label: 'ID Rukovodioca', references: {serviceToken: NastavnikService, displayField: 'id' }, required: true }
    ]
  },
  'godine_studija': {
    label: 'Godine studija',
    serviceToken: GodinaStudijaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'godina', label: 'Godina', type: 'number', required: true },
      { key: 'pocetak', label: 'Početak', type: 'date', required: true },
      { key: 'kraj', label: 'Kraj', type: 'date', required: true },
      { key: 'studijskiProgramId', label: 'ID Studijskog programa', references: {serviceToken: StudijskiProgramService, displayField: 'naziv' }, required: true }
    ]
  },
  'evaluacije_znanja': {
    label: 'Evaluacije znanja',
    serviceToken: EvaluacijaZnanjaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'vremePocetka', label: 'Početak', type: 'datetime', required: true },
      { key: 'vremeZavrsetka', label: 'Završetak', type: 'datetime', required: true },
      { key: 'maksimalniBodovi', label: 'Max Bodovi', type: 'number', required: true },
      { key: 'tipEvaluacijeId', label: 'ID Tipa evaluacije', references: {serviceToken: TipEvaluacijeService, displayField: 'naziv' }, required: true },
      { key: 'realizacijaPredmetaId', label: 'ID Realizacije', references: {serviceToken: RealizacijaPredmetaService, displayField: 'id' }, required: true },
      { key: 'ispitniRokId', label: 'ID Ispitnog roka', references: {serviceToken: IspitniRokService, displayField: 'naziv' }, required: true },
      { key: 'instrumentEvaluacijeId', label: 'ID Instrumenta eval.', references: {serviceToken: InstrumentEvaluacijeService, displayField: 'naziv' }, required: true }
    ]
  },
  'tipovi_evaluacije': {
    label: 'Tipovi evaluacije',
    serviceToken: TipEvaluacijeService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text', required: true }
    ]
  },
  'instrumenti_evaluacije': {
    label: 'Instrumenti evaluacije',
    serviceToken: InstrumentEvaluacijeService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text', required: true },
      { key: 'opis', label: 'Opis', type: 'text', required: true }
    ]
  },
  'fajlovi': {
    label: 'Fajlovi',
    serviceToken: FajlService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'opis', label: 'Opis', type: 'text', required: true },
      { key: 'url', label: 'URL', type: 'text', required: true },
      { key: 'nastavniMaterijalId', label: 'ID Nastavnog mate.', references: {serviceToken: NastavniMaterijalService, displayField: 'naziv' }, required: true },
      { key: 'instrumentEvaluacijeId', label: 'ID Instrumenta eval.', references: {serviceToken: InstrumentEvaluacijeService, displayField: 'naziv' }, required: true },
      { key: 'obavestenjeId', label: 'ID Obavestenja', references: {serviceToken: ObavestenjeService, displayField: 'naslov' } },
      { key: 'objavaId', label: 'ID Objave', references: {serviceToken: ObjavaService, displayField: 'id' } },
      { key: 'porukaId', label: 'ID Poruke', references: {serviceToken: PorukaService, displayField: 'naslov' } },
    ]
  },
  'ishodi': {
    label: 'Ishodi',
    serviceToken: IshodService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'opis', label: 'Opis', type: 'text', required: true },
      { key: 'predmetId', label: 'ID Predmeta', references: {serviceToken: PredmetService, displayField: 'naziv' }, required: true },
      { key: 'evaluacijaId', label: 'ID Evaluacije znanja', references: {serviceToken: EvaluacijaZnanjaService, displayField: 'id' }, required: true },
      { key: 'terminNastaveId', label: 'ID Termina nastave', references: {serviceToken: TerminNastaveService, displayField: 'id' }, required: true }
    ]
  },
  'obrazovni_ciljevi': {
    label: 'Obrazovni ciljevi',
    serviceToken: ObrazovniCiljService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'opis', label: 'Opis', type: 'text', required: true }
    ]
  },
  'ishodi_obrazovni_ciljevi': {
    label: 'Ishodi - Obrazovni ciljevi',
    serviceToken: IshodObrazovniCiljService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'ishodId', label: 'ID Isoda', references: {serviceToken: IshodService, displayField: 'id' }, required: true },
      { key: 'obrazovniCiljId', label: 'ID Obrazovnog cilja', references: {serviceToken: ObrazovniCiljService, displayField: 'id' }, required: true }
    ]
  },
  'zvanja': {
    label: 'Zvanja nastavnika',
    serviceToken: ZvanjeService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'datumIzbora', label: 'Izbor', type: 'datetime', required: true },
      { key: 'datumOtkaza', label: 'Otkaz', type: 'datetime', required: true },
      { key: 'nastavnikId', label: 'ID Nastavnika', references: {serviceToken: NastavnikService, displayField: 'id' }, required: true },
      { key: 'naucnaOblastId', label: 'ID Naucne oblasti', references: {serviceToken: NaucnaOblastService, displayField: 'naziv' }, required: true },
      { key: 'tipZvanjaId', label: 'ID Tipa zvanja', references: {serviceToken: TipZvanjaService, displayField: 'naziv' }, required: true }
    ]
  },
  'tipovi_zvanja': {
    label: 'Tipovi zvanja',
    serviceToken: TipZvanjaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text', required: true }
    ]
  },
  'naucne_oblasti': {
    label: 'Naučne oblasti',
    serviceToken: NaucnaOblastService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text', required: true }
    ]
  },
  'polaganja': {
    label: 'Polaganja ispita',
    serviceToken: PolaganjeService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'osvojeniBodovi', label: 'Bodovi', type: 'number', required: true },
      { key: 'napomena', label: 'Napomena', type: 'text', required: true },
      { key: 'studentNaGodiniId', label: 'ID Studenta na godini', references: {serviceToken: StudentNaGodiniService, displayField: 'brojIndeksa' }, required: true },
      { key: 'evaluacijaZnanjaId', label: 'ID Evaluacije', references: {serviceToken: EvaluacijaZnanjaService, displayField: 'id' }, required: true }
    ]
  },
  'prijave_ispita': {
    label: 'Prijava ispita',
    serviceToken: PrijaviIspitComponent,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'studentNaGodiniId', label: 'ID Studenta na godini', references: {serviceToken: StudentNaGodiniService, displayField: 'brojIndeksa' }, required: true },
      { key: 'evaluacijaZnanjaId', label: 'ID Evaluacije', references: {serviceToken: EvaluacijaZnanjaService, displayField: 'id' }, required: true }
    ]
  },
  'zahtevi_za_upis': {
    label: 'Zahtevi za upis',
    serviceToken: ZahtevZaUpisService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'status', label: 'Status', type: 'text', required: true },
      { key: 'vremePodnosenja', label: 'Podneto', type: 'datetime', required: true },
      { key: 'napomena', label: 'Napomena', type: 'text', required: true },
      { key: 'studentId', label: 'ID Studenta', references: {serviceToken: StudentService, displayField: 'korisnickoIme' }, required: true },
      { key: 'studijskiProgramId', label: 'ID Studijskog programa', references: {serviceToken: StudijskiProgramService, displayField: 'naziv' }, required: true },
      { key: 'godinaStudijaId', label: 'ID Godine studija', references: {serviceToken: GodinaStudijaService, displayField: 'godina' }, required: true },
      { key: 'fakultetId', label: 'ID Fakulteta', references: {serviceToken: FakultetService, displayField: 'naziv' }, required: true }
    ]
  },
  'ispitni_rokovi': {
    label: 'Ispitni rokovi',
    serviceToken: IspitniRokService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Naziv', type: 'text', required: true },
      { key: 'datumPocetka', label: 'Od', type: 'datetime', required: true },
      { key: 'datumZavrsetka', label: 'Do', type: 'datetime', required: true }
    ]
  },
  'termini_nastave': {
    label: 'Termini nastave',
    serviceToken: TerminNastaveService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'vremePocetka', label: 'Početak', type: 'datetime', required: true },
      { key: 'vremeZavrsetka', label: 'Kraj', type: 'datetime', required: true },
      { key: 'realizacijaId', label: 'ID Realizacije', references: {serviceToken: RealizacijaPredmetaService, displayField: 'id' }, required: true },
      { key: 'tipNastaveId', label: 'ID Tipa nastave', references: {serviceToken: TipNastaveService, displayField: 'naziv' }, required: true }
    ]
  },
  'tipovi_nastave': {
    label: 'Tipovi nastave',
    serviceToken: TipNastaveService,
    columns: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'naziv', label: 'Tip Nastave', type: 'text', required: true }
    ]
  },
  'forumi': {
    label: 'Forum',
    serviceToken: ForumService,
    columns: [
      { key: 'id', label: 'ID', type: 'number'},
      { key: 'javni', label: 'Javni', type: 'boolean', required: true}
    ]
  },
  'korisnici_na_forumima': {
    label: 'Korisnik na forumu',
    serviceToken: KorisnikNaForumuService,
    columns: [
      { key: 'id', label: 'ID', type: 'number'},
      { key: 'korisnikId', label: 'ID Korisnika', references: {serviceToken: RegistrovaniKorisnikService, displayField: 'korisnickoIme' }, required: true },
      { key: 'forumId', label: 'ID Foruma', references: {serviceToken: ForumService, displayField: 'id' }, required: true },
      { key: 'ulogaId', label: 'ID Uloge', references: {serviceToken: UlogaService, displayField: 'naziv' }, required: true }
    ]
  },
  'nastavni_materijali': {
    label: 'Nastavni materijal',
    serviceToken: NastavniMaterijalService,
    columns: [
      { key: 'id', label: 'ID', type: 'number'},
      { key: 'naziv', label: 'Naziv', type: 'text', required: true},
      { key: 'opis', label: 'Opis', type: 'text', required: true},
      { key: 'ishodId', label: 'ID Ishoda', references: {serviceToken: IshodService, displayField: 'id' }, required: true }
    ]
  },
  'objave': {
    label: 'Objava',
    serviceToken: ObjavaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number'},
      { key: 'sadrzaj', label: 'Sadrzaj', type: 'text', required: true},
      { key: 'vremeObjave', label: 'Vreme', type: 'datetime', required: true},
      { key: 'autorId', label: 'ID Autora', references: {serviceToken: KorisnikNaForumuService, displayField: 'id' } },
      { key: 'temaId', label: 'ID Teme', references: {serviceToken: TemaService, displayField: 'naslov' }, required: true }
    ]
  },
  'obavestenja': {
    label: 'Obavestenje',
    serviceToken: ObavestenjeService,
    columns: [
      { key: 'id', label: 'ID', type: 'number'},
      { key: 'naslov', label: 'Naslov', type: 'text', required: true},
      { key: 'sadrzaj', label: 'Sadrzaj', type: 'text', required: true},
      { key: 'datumObjave', label: 'Datum', type: 'datetime', required: true},
      { key: 'nastavnikNaRealizacijiId', label: 'ID Nastavnika', references: {serviceToken: NastavnikNaRealizacijiService, displayField: 'id' }, required: true },
      { key: 'realizacijaPredmetaId', label: 'ID Realizacije', references: {serviceToken: RealizacijaPredmetaService, displayField: 'id' }, required: true }
    ]
  },
  'poruke': {
    label: 'Poruka',
    serviceToken: PorukaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number'},
      { key: 'naslov', label: 'Naslov', type: 'text', required: true},
      { key: 'sadrzaj', label: 'Sadrzaj', type: 'text', required: true},
      { key: 'vremeSlanja', label: 'Vreme slanja', type: 'datetime', required: true},
      { key: 'posiljalacId', label: 'ID Posiljaoca', references: {serviceToken: RegistrovaniKorisnikService, displayField: 'korisnickoIme' }, required: true },
      { key: 'primalacId', label: 'ID Primalac', references: {serviceToken: RegistrovaniKorisnikService, displayField: 'korisnickoIme' }, required: true }
    ]
  },
  'teme': {
    label: 'Tema',
    serviceToken: TemaService,
    columns: [
      { key: 'id', label: 'ID', type: 'number'},
      { key: 'naslov', label: 'Naslov', type: 'text', required: true},
      { key: 'vremeKreiranja', label: 'Vreme kreiranja', type: 'datetime', required: true},
      { key: 'autorId', label: 'ID Autora', references: {serviceToken: KorisnikNaForumuService, displayField: 'id' } },
      { key: 'forumId', label: 'ID Foruma', references: {serviceToken: ForumService, displayField: 'id' }, required: true }
    ]
  }
}