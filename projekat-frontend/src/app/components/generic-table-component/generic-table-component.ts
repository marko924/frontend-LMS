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

  @Input() data: T[] = [];
  @Input() columns: ColumnDef<T>[] = [];
  @Input() actions: { edit?: boolean; delete?: boolean; view?: boolean } = {
    edit: false,
    delete: false,
    view: false
  };

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() view = new EventEmitter<T>();
  @Output() customEvent = new EventEmitter<{ row: T; event: string }>();

  formatCell(value: unknown, type?: string): string {
    if (value == null) return '-';

    if (type === 'date') {
      return new Date(value as string | number | Date).toLocaleDateString();
    }

    if (type === 'number') {
      return Number(value).toString();
    }

    return String(value);
  }

  onCustomEvent(row: T, event: string) {
    this.customEvent.emit({ row, event });
  }

  onEdit(row: T) {
    this.edit.emit(row);
  }

  onDelete(row: T) {
    this.delete.emit(row);
  }

  onView(row: T) {
    this.view.emit(row);
  }
}