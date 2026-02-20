# frontend-LMS

# Podela posla

## 📋 Tabela podele posla

| Član tima  | Oblast rada                                  | Zaduženja                                                                                                                                                                                                                                                                                               |
| ---------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stefan** | Prikaz javnog sadržaja i funkcionalnosti nastavnika i studenta | - Prijava ispita<br>- Prijava korisnika (login)<br>- Pregled ostvarenih rezultata studenta- Unos ocena (profesor)<br>- Stranica univerziteta (podaci o univerzitetu)<br>- Stranice fakulteta<br>- Studijski programi i predmeti<br> - Silabusi i nastavni materijali                                                             |
| **Marko**  | Autentifikacija i funkcionalnosti administratora i osoblja studentske službe               | - Registracija korisnika (bcrypt, JWT, auth middleware)<br>- Prijava korisnika (login)<br>- Zaštita ruta (role: student, profesor, služba)<br>- Upis studenata na godinu/fakultet/program<br>- Zakazivanje ispitnih rokova i ispita |

---

## 🛠️ Preporučeni način rada sa Git-om

Da bi se izbegli konflikti:

### 1. Raspodela posla

* Stefan je zadužen za entitete: Student, StudentNaGodini, Nastavnik, NastavnikNaRealizaciji, Zvanje, NaucnaOblast, TipZvanja, 
                                 StudijskiProgram, GodinaStudija, Predmet, RealizacijaPredmeta, PohadjanjePredmeta, TerminNastave, TipNastave, NastavniMaterijal, Fakultet, Univerzitet.

* Marko je zadužen za entitete: RegistrovaniKorisnik, OsobljeStudentskeSluzbe, Administrator, Uloga, Adresa, Mesto, Drzava, Polaganje, EvaluacijaZnanja, TipEvaluacije, Ishod, ObrazovniCilj, Fajl, InstrumentEvaluacije, Obavestenje, Poruka, KorisnikNaForumu, Tema, Forum, Objava.

### 2. Rad na posebnim granama

Svaki član radi na svojoj grani:

```bash
# Stefan
git switch -c stefan

# Marko
git switch -c marko
```

### 3. Redovno spajanje sa development granom

Pre većih izmena:

```bash
git switch development
git pull
```

Zatim se vraćanje na svoju granu i merge-ujete:

```bash
git merge development
```