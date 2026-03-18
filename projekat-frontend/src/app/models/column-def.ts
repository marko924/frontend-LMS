export interface ColumnDef<T> { //sluzi nam da bi smo mogli da konfigurisemo polja i vrednosti u tabeli i formi
  key: string;  //Koji podatak iz baze da čita (key, npr. "ime").
  label: string;  //Koji naslov da stavi u zaglavlje (label, npr. "Ime studenta").
  type?: 'text' | 'number' | 'date' | 'datetime' | 'boolean';  //Kako da formatira taj podatak (type, npr. 'date').
  actionButton?: {label: string;event: string;};  //Koje akcije da se prikazu
  references?: { //Da li to polje zahteva referencu (vezu sa drugom tabelom)
    serviceToken: any; //servis za ucitavanje npr. MestoService
    displayField: string; //naziv polja za popunjavanje liste (npr. 'naziv')
  };
  required?: boolean;  //Da li je ovo polje obavezno zbog validacije forme
}