import { Component, Injector, signal } from '@angular/core';
import { GenericTableComponent } from '../generic-table-component/generic-table-component';
import { CommonModule } from '@angular/common';
import { GenericCrudService } from '../../services/generic-crud-service';
import { ColumnDef } from '../../models/column-def';
import { ADMIN_ENTITIES } from '../../models/admin-config';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administracija-component',
  imports: [GenericTableComponent, CommonModule, FormsModule],
  templateUrl: './administracija-component.html',
  styleUrl: './administracija-component.css',
})
export class AdministracijaComponent {
  
  public ADMIN_ENTITIES = ADMIN_ENTITIES; //napravio sam ovu konstantu da bi je mogao koristiti u html kodu

  //Signale sam koristio da bih ubrazo ovu moju komponentu zato sto bez njih bih morao da osvezavam celu
  //komponentu svaki put kada mi se nesto promeni ili kada se okine neka specificna akcija ili poziv ka
  //backendu

  //Signal koji cuva instancu servisa za trenutno izabrani entitet. Na pocetku je null.
  activeService = signal<GenericCrudService<any, any> | null>(null);

  //Niz koji cuva definicije kolona (iz ColumnDef) za tabelu koja je trenutno na ekranu.
  activeColumns: ColumnDef<any>[] = [];

  //Obican niz koji cuva sirove podatke (npr. listu studenata) koje dobijes sa backenda.
  data: any[] = [];

  //Recnik koji cuva nizove podataka za padajuce liste (npr. adresaId: [niz svih adresa])
  foreignKeyOptions: Record<string, any[]> = {};
  
  //Ovde nam se cuva vrednost o izbranom kljucu po kojem znamo koji entitet iz mape ADMIN_ENTITIES
  //ternutno koristimo to jest ucitavamo
  currentEntityKey = signal<string | null>(null); 
  
  //Ovi svi signali sluze za kontrolu UI-a
  isLoading = signal(false); //ucitavanje podatak
  currentPage = signal(0); //trenutna stranica
  totalPages = signal(0); //ukupan broj strana
  pageSize = 10; //broj prikazanih redova tabele (podatak) po strani

  isEditModalOpen = signal(false); //sluzi da proveri da li je otvorena forma za izmenu i ako jeste da je popuni podacima
  selectedItem = signal<any>(null); //signal koji cuva objekat koji se trenutno dodaje ili menja
  isEditMode = signal(false); //proverava da li se pokrenula funkcija za izmenu

  constructor(private injector: Injector) {} //Injector mi omogucava da zatrazim bilo koji servis iz angulara tako da ne bih
                                             //morao da imam sve servise cime se gubi genricki pristup
  
  //Ovo se okida kada administrator izabere neki od entiteta iz opadajuce liste
  onEntitySelect(event: any) {
    const entityKey = event.target.value; //Uzima vrednost koju je korisnik kliknuo u padajucem meniju

    this.currentEntityKey.set(entityKey); //Pamti naziv kljuca za taj izbor
    
    if (!entityKey) {  //Ako admin izabere opciju "Izaberite entitet" (sto je prazna opcija) 
      this.resetState(); //Ova funkcija cisti ekran
      return;
    }

    const config = ADMIN_ENTITIES[entityKey];
    
    if (config) {
      const serviceInstance = this.injector.get(config.serviceToken) as GenericCrudService<any, any>;;
      this.activeService.set(serviceInstance);
      this.activeColumns = config.columns;
      
      this.currentPage.set(0);
      this.loadData();
    }
  }

  //Ovo je glavan funkcija za dobavljanje podataka sa backend-a
  loadData() {
    const service = this.activeService(); //uzima trenutni aktivni servis
    if (service) {
      this.isLoading.set(true); //ceka dok se podaci ne ucitaju
      
      //pravi parametar za paginaciju
      const params = { 
        page: this.currentPage(), 
        size: this.pageSize 
      };
      //pretplacuje se na getAll metodu generickog servisa
      service.getAll(params).subscribe({
        next: (res) => {
          //Kada podaci stignu puni data niz, azurira totalPages
          //i zaustavlja proces ucitavanja
          this.data = res.content;
          this.totalPages.set(res.totalPages);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Greška pri učitavanju:', err);
          this.isLoading.set(false);
        }
      });
    }
  }

  //Funkcija za promenu stranice
  changePage(delta: number) {
    const newPage = this.currentPage() + delta; //izracunava kada smo se vratili ili presli na novu stranicu
    if (newPage >= 0 && newPage < this.totalPages()) { //provera da ne odemo na stranicu -1 ili na onu koja ne postoji
      this.currentPage.set(newPage); //azurira signal da bi angular znao da je stranica promenjana
      this.loadData(); //povlaci podatke za novi broj stranica
    }
  }
  //Funkcija za obradu brisanja reda
  handleDelete(item: any) {
    const service = this.activeService(); //ucitava aktivni servis
    if (service && item.id && confirm(`Obriši stavku sa ID: ${item.id}?`)) { //sa confirme trazi dozvolu za brisanje
      service.delete(item.id).subscribe(() => { //poziva metodu za brisanje

        //Ako obrise poslednji element na stranici, automatski vraca admina na prethodnu stranicu
        if (this.data.length === 1 && this.currentPage() > 0) { 
          this.currentPage.update(p => p - 1);
        }
        this.loadData(); //na kraju ponovo ucitava podatke
      });
    }
  }

  //Ova funkcija na klik dugmeta Dodaj otvara formu za dodavanje to jest priprema je 
  //za unos novog podatka
  openCreateModal() {
    this.isEditMode.set(false); //Ovo nam daje informaciju o tome da je izabrano dodavanje
    const newItem: any = {}; //Objekat koji nam sluzi za cuvanje podataka iz forme
    this.activeColumns.forEach(col => { //Prolazmo kroz definiciju svih kolona tabele
      if (col.type === 'boolean') {  //Ako je polje tip checkbox 
        newItem[col.key] = false;  //Inicijalizuje ga na false
      } else {
        newItem[col.key] = null;  //Sva ostala polja postavlja na null (da bi forma bila cista)
      }
    });
    
    this.selectedItem.set(newItem);  //ubacuje novi prazan objekat u signal koji je povezan sa ngModel u fromi kako bi se 
                                     //napravila odgovarajuca polja
    this.foreignKeyOptions = {};     //cisti stare opcije iz padajucih lista da se podaci ne bi pomesali

    for (const col of this.activeColumns) { //Proverava svaku kolonu: ako je to polje koje vuče podatke iz druge tabele 
      if (col.references) {                 //(npr. lista Smerova), poziva metodu da ih ucita
        this.loadReferenceData(col);
      }
    }

    this.isEditModalOpen.set(true); //Pali vidljivost forme na ekranu
  }

  //Ova funkcija sluzi za prikazivanje forme za izmenu i popunjavanje 
  //polja unutar nje podacima iz izabranog reda
  handleEdit(item: any) {
    this.isEditMode.set(true);  //Postavlja mod na "Izmena". HTML sada prikazuje dugme "Sacuvaj izmene".

    this.selectedItem.set({ ...item }); //Pravi kopiju objekta da se ne bi menjali podaci u tabeli dok admin kuca podatke u formi
                                        //Podaci ce se osveziti tek kada stigne potvrda sa backenda o uspesnoj izmeni

    this.foreignKeyOptions = {}; //Isto ko kod dodavanje, da bi se ucitali novi podaci za padajuce liste

    for (const col of this.activeColumns) { //Proverava definiciju kolone: ako je to polje koje vuče podatke iz druge tabele
      if (col.references) {                 //poziva metodu da ih ucita
        this.loadReferenceData(col);
      }
    }
    this.isEditModalOpen.set(true); //Prikazuje model sa vec popunjenim podacima
  }

  //Sluzi za resavanje reference (stranog kljuca)
  loadReferenceData(col: ColumnDef<any>) {
    //Ako kolona referencira drugu tabelu
    if (!col.references) return;

    //Pomocu injector-a uzima servis drugog entiteta kako bi se prikazali navedeni podaci
    const refService = this.injector.get(col.references.serviceToken) as GenericCrudService<any, any>;

    //Poziva ovu funkciju iz servisa da bi dobila potrebne podatke o referenci
    refService.getAllWithoutPagination().subscribe({
      next: (data) => {
        this.foreignKeyOptions[col.key] = data;
      },
      error: (err) => console.error(`Greška pri učitavanju referenci za ${col.key}:`, err)
    });
  }

  //Kada admin odustene od izmene ova funkcija vraca sve na prvobitno stanje
  closeModal() {
    this.isEditModalOpen.set(false); //Sakriva model sa ekrana
    this.selectedItem.set(null);  //Brise referncu na model koji smo menjali da ne bi ostali podaci u memoriji
  }

  //Ova funkcija sluzi da bi odlucila da li idemo na POST (dodavanje) ili PUT (izmenu) rutu
  saveChanges() {
    const service = this.activeService();  //uzima trenutno aktivni servis
    const item = this.selectedItem(); 

    if (!service || !item) return; //Ako nesto od ova dva gore podatka fali prekida se izvrsavanje

    //Proverava da li radimo izmenu ili brisanje
    if (this.isEditMode()) {
      // EDIT LOGIKA
      if (item.id) {
        service.update(item.id, item).subscribe({
          next: () => this.afterSaveSuccess('Uspešno sačuvano!'), 
          error: (err) => console.error('Greška pri ažuriranju:', err)
        });
      }
    } else { //A ako nije mod za izmenu onda poziva funkciju create iz servisa 
      // CREATE LOGIKA
      service.create(item).subscribe({
        next: () => this.afterSaveSuccess('Uspešno kreirano!'),
        error: (err) => console.error('Greška pri kreiranju:', err)
      });
    }
  }

  //Ako je sve uredu sa dodavanjem ili izmenom osvezava tabelu i zatvara model
  private afterSaveSuccess(message: string) {
    alert(message);
    this.loadData(); //odmah prikazuje nove ili izmenjene podatke
    this.closeModal();
  }

  //Ova funkcija proverava da li su u fromu upisane vrednosti za sva required polja koja su bila definisana
  //u ADMIN_ENTITIES kako ne bi smo poslali polovicne podatke backendu
  isFormValid(): boolean {
    const item = this.selectedItem(); //citamo vrednosti iz signala za odabrani objekat
    if (!item) return false; //ako objekat iz nekog razloga ne postoji, funkcija odmah vraca false (sprecava pucanje)

    return this.activeColumns.every(col => { //prolazimo kroz sve kolone definisane za taj objekat (entitet)
      if (col.required) {
        const value = item[col.key]; //vrednost iz kljuca kolone

        //Ako makar jedno obavezno polje fali, metoda vraca false, a dugme u HTML-u postaje sivo (disablovano)
        return value !== null && value !== undefined && String(value).trim() !== '';
      }
      return true;
    });
  }

  //Cisti sve varijable. Koristi se da ugasi tabelu i sve pratece elemente kada korisnik ponisti izbor entiteta.
  private resetState() {
    this.activeService.set(null);
    this.currentEntityKey.set(null);
    this.data = [];
    this.currentPage.set(0);
    this.totalPages.set(0);
  }
}