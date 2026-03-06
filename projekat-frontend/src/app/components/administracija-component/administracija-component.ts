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
  
  public ADMIN_ENTITIES = ADMIN_ENTITIES;

  activeService = signal<GenericCrudService<any, any> | null>(null);
  activeColumns: ColumnDef<any>[] = [];
  data: any[] = [];
  foreignKeyOptions: Record<string, any[]> = {};
  
  isLoading = signal(false);
  currentPage = signal(0);
  totalPages = signal(0);
  pageSize = 10;

  isEditModalOpen = signal(false);
  selectedItem = signal<any>(null);
  isEditMode = signal(false);

  constructor(private injector: Injector) {}

  onEntitySelect(event: any) {
    const entityKey = event.target.value;
    
    if (!entityKey) {
      this.resetState();
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

  loadData() {
    const service = this.activeService();
    if (service) {
      this.isLoading.set(true);
      
      const params = { 
        page: this.currentPage(), 
        size: this.pageSize 
      };

      service.getAll(params).subscribe({
        next: (res) => {
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

  changePage(delta: number) {
    const newPage = this.currentPage() + delta;
    if (newPage >= 0 && newPage < this.totalPages()) {
      this.currentPage.set(newPage);
      this.loadData();
    }
  }

  handleDelete(item: any) {
    const service = this.activeService();
    if (service && item.id && confirm(`Obriši stavku sa ID: ${item.id}?`)) {
      service.delete(item.id).subscribe(() => {
        if (this.data.length === 1 && this.currentPage() > 0) {
          this.currentPage.update(p => p - 1);
        }
        this.loadData();
      });
    }
  }

  openCreateModal() {
    this.isEditMode.set(false);
    const newItem: any = {};
    this.activeColumns.forEach(col => newItem[col.key] = null);
    
    this.selectedItem.set(newItem);
    this.foreignKeyOptions = {};

    for (const col of this.activeColumns) {
      if (col.references) {
        this.loadReferenceData(col);
      }
    }

    this.isEditModalOpen.set(true);
  }

  handleEdit(item: any) {
    this.isEditMode.set(true);
    this.selectedItem.set({ ...item });
    this.foreignKeyOptions = {};

    for (const col of this.activeColumns) {
      if (col.references) {
        this.loadReferenceData(col);
      }
    }
    this.isEditModalOpen.set(true);
  }

  loadReferenceData(col: ColumnDef<any>) {
    if (!col.references) return;

    const refService = this.injector.get(col.references.serviceToken) as GenericCrudService<any, any>;

    refService.getAllWithoutPagination().subscribe({
      next: (data) => {
        this.foreignKeyOptions[col.key] = data;
      },
      error: (err) => console.error(`Greška pri učitavanju referenci za ${col.key}:`, err)
    });
  }

  closeModal() {
    this.isEditModalOpen.set(false);
    this.selectedItem.set(null);
  }

  saveChanges() {
    const service = this.activeService();
    const item = this.selectedItem();

    if (!service || !item) return;

    if (this.isEditMode()) {
      // EDIT LOGIKA
      if (item.id) {
        service.update(item.id, item).subscribe({
          next: () => this.afterSaveSuccess('Uspešno sačuvano!'),
          error: (err) => console.error('Greška pri ažuriranju:', err)
        });
      }
    } else {
      // CREATE LOGIKA
      service.create(item).subscribe({
        next: () => this.afterSaveSuccess('Uspešno kreirano!'),
        error: (err) => console.error('Greška pri kreiranju:', err)
      });
    }
  }

  private afterSaveSuccess(message: string) {
    alert(message);
    this.loadData();
    this.closeModal();
  }

  private resetState() {
    this.activeService.set(null);
    this.data = [];
    this.currentPage.set(0);
    this.totalPages.set(0);
  }
}