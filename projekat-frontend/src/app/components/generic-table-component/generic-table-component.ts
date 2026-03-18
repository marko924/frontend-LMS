import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnDef } from '../../models/column-def';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-table-component.html',
  styleUrls: ['./generic-table-component.css']
})
export class GenericTableComponent<T extends Record<string, any>> {

  //Deo u nazivu komponente <T extends Record<string, any>> govori da genericki tip T mora biti objekat sa stringovnim 
  //kljucevima (što svaki JSON objekat jeste). To je neophodno da bih u HTML-u mogao dinamicki da pristupam osobinama 
  //objekta pomocu sintakse row[col.key]

  @Input() data: T[] = [];  //Preko ovoga tabela prima podatke za popunjavanje redova tabele

  @Input() columns: ColumnDef<T>[] = []; //Preko ovoga tabela prima niz konfiguracionih objekata koji definisu izgled kolona.

  @Input() actions: {  //Prima objekat sa logickim vrednostima (true/false) kako bi kontrolisao vidljivost akcija u svakom redu
    edit?: boolean;
    delete?: boolean;
    view?: boolean;
  } = {
    edit: false,
    delete: false,
    view: false
  };

  //Prva tri emitera salju signal u formatu celog objekta T roditeljskoj komponenti kada se klikne na neku od akcija u tabeli
  //kako bi on mogao da je sprovede
  @Output() edit = new EventEmitter<T>();  
  @Output() delete = new EventEmitter<T>();
  @Output() view = new EventEmitter<T>();
  @Output() customEvent = new EventEmitter<{ row: T; event: string }>(); //Sluzi za emitovanje neke posebne akcije iz tabele

  //Prolazi kroz sve kolone (columns) i proverava da li ijedna od njih ima definisan actionButton
  //Koristi se da bi tabela znala da li treba da iscrta dodatnu dugmad unutar samih ćelija sa podacima. 
  hasActionButtons(): boolean {
    return this.columns?.some(col => !!col.actionButton) ?? false;
  }

  //Proverava da li uopste treba da iscrta kolonu Akcije 
  //Ako roditelj ne pošalje nikakve akcije, ova metoda vraća false 
  //i tabela uopšte ne iscrtava praznu kolonu "Akcije" na kraju
  hasAnyActions(): boolean {
    return (
      !!this.actions?.view ||
      !!this.actions?.edit ||
      !!this.actions?.delete ||
      this.hasActionButtons()
    );
  }

  //Obezbeđuje da se podaci prikazu u tabeli u odredjenom formatu u zavisnosti kog su tipa, 
  //bez obzira na to kako dolaze sa bekenda.
  formatCell(value: unknown, type?: string): string {
    if (value == null) return '-';

    if (type === 'date') {
      return new Date(value as string | number | Date).toLocaleString('sr-RS', { //koristimo srpsko lokalno vreme
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }

    if (type === 'datetime') {
      return new Date(value as string | number | Date).toLocaleString('sr-RS', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    if (type === 'number') {
      return Number(value).toString();
    }

    return String(value);
  }

  //Koristi se kao odasiljac ako korisnik kilikne na neku posebnu akciju u tabeli
  //Pakuje podatke o tom redu i naziv događaja, pa ih salje kroz customEvent
  onCustomEvent(row: T, event: string) {
    this.customEvent.emit({ row, event });
  }

  //Jednostavna metode koja se aktivira na klik dugmeta "Izmeni". Samo se uzmu podaci tog reda i salju se 
  //kroz odgovarajuce EventEmitter-e roditelju.
  onEdit(row: T) {
    this.edit.emit(row);
  }

  //Jednostavna metode koja se aktivira na klik dugmeta "Obrisi". Samo se uzmu podaci tog reda i salju se 
  //kroz odgovarajuce EventEmitter-e roditelju.
  onDelete(row: T) {
    this.delete.emit(row);
  }
}