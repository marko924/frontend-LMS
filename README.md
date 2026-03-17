# frontend-LMS

# Podela posla

## 📋 Tabela podele posla

| Član tima  | Oblast rada                                  | Zaduženja                                                                                                                                                                                                                                                                                               |
| ---------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stefan** | Funkcionalnosti nastavnika i studenta, prikaz profila | - Upis studenta na godinu<br>- Pregled ostvarenih rezultata studenta<br>- Unos ocena<br>- Prijava ispita<br>- Prikaz profila registrovanog  korisnika                                                            |
| **Marko**  | Autentifikacija i funkcionalnosti administratora i osoblja studentske službe               | - Registracija korisnika (bcrypt, JWT, auth middleware)<br>- Prijava korisnika (login)<br>- Zaštita ruta (role: student, profesor, služba, admin)<br>- Upis studenata na godinu<br>- Zakazivanje ispitnih rokova i ispita<br> - Dodavanje novog studentskog osoblja<br> - Administracija sistema |

---

## 🛠️ Preporučeni način rada sa Git-om

Da bi se izbegli konflikti:

### 1. Raspodela posla

* Stefan je zadužen za entitete: Student, StudentNaGodini, Nastavnik, NastavnikNaRealizaciji, Zvanje, NaucnaOblast, TipZvanja, 
                                 StudijskiProgram, GodinaStudija, Predmet, RealizacijaPredmeta, PohadjanjePredmeta, TerminNastave, TipNastave, NastavniMaterijal, Fakultet, Univerzitet, PrijavaIspita i Polaganje.

* Marko je zadužen za entitete: RegistrovaniKorisnik, OsobljeStudentskeSluzbe, Administrator, Uloga, Adresa, Mesto, Drzava,       EvaluacijaZnanja, TipEvaluacije, Ishod, ObrazovniCilj, Fajl, InstrumentEvaluacije, Obavestenje, Poruka, KorisnikNaForumu, Tema, Forum, Objava, IshodObrazovniCilj, KorisnikUloga, ZahtevZaUpis i IspitniRok.

### 2. Rad na posebnim granama

Svaki član radi na svojoj grani:

```bash
# Stefan
git checkout stefan

# Marko
git checkout marko
```

### 3. Redovno spajanje sa development granom

Pre većih izmena:

```bash
git checkout development
git pull origin development
git merge grana-clana-tima
git push origin development
```

Zatim se vraćamo na svoju granu i pull-ujemo izmene sa development grane:

```bash
git pull origin development
```