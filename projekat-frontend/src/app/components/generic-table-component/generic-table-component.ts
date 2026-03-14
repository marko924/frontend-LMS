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

  @Input() actions: {
    edit?: boolean;
    delete?: boolean;
    view?: boolean;
  } = {
    edit: false,
    delete: false,
    view: false
  };

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() view = new EventEmitter<T>();
  @Output() customEvent = new EventEmitter<{ row: T; event: string }>();

  hasActionButtons(): boolean {
    return this.columns?.some(col => !!col.actionButton) ?? false;
  }

  hasAnyActions(): boolean {
    return (
      !!this.actions?.view ||
      !!this.actions?.edit ||
      !!this.actions?.delete ||
      this.hasActionButtons()
    );
  }

  formatCell(value: unknown, type?: string): string {
    if (value == null) return '-';

    if (type === 'date') {
      return new Date(value as string | number | Date).toLocaleString('sr-RS', {
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

  onCustomEvent(row: T, event: string) {
    this.customEvent.emit({ row, event });
  }

  onEdit(row: T) {
    this.edit.emit(row);
  }

  onDelete(row: T) {
    this.delete.emit(row);
  }
}