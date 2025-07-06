import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface DropdownItem {
  id: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  className?: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() items: DropdownItem[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() selectedItem?: DropdownItem;
  @Input() disabled: boolean = false;
  @Input() width: string = 'w-full';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'default' | 'outline' | 'ghost' = 'default';
  @Input() showIcon: boolean = true;
  @Input() searchable: boolean = false;
  @Input() maxHeight: string = 'max-h-60';
  
  @Output() selectionChange = new EventEmitter<DropdownItem>();
  @Output() dropdownToggle = new EventEmitter<boolean>();

  isOpen = false;
  searchTerm = '';

  get filteredItems(): DropdownItem[] {
    if (!this.searchable || !this.searchTerm) {
      return this.items;
    }
    return this.items.filter(item => 
      !item.divider && 
      item.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get displayText(): string {
    if (this.selectedItem) {
      return this.selectedItem.label;
    }
    return this.placeholder;
  }

  get sizeClasses(): string {
    switch (this.size) {
      case 'sm': return 'px-3 py-1.5 text-sm';
      case 'lg': return 'px-4 py-3 text-lg';
      default: return 'px-4 py-2 text-base';
    }
  }

  get variantClasses(): string {
    switch (this.variant) {
      case 'outline': return 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700';
      case 'ghost': return 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700';
      default: return 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600';
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isOpen) return;
    
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.closeDropdown();
    }
  }

  toggleDropdown(event: MouseEvent) {
    if (this.disabled) return;
    
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    this.dropdownToggle.emit(this.isOpen);
    
    if (this.isOpen && this.searchable) {
      // Focus search input after dropdown opens
      setTimeout(() => {
        const searchInput = document.querySelector('.dropdown-search') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
  }

  selectItem(item: DropdownItem, event: MouseEvent) {
    if (item.disabled || item.divider) return;
    
    event.stopPropagation();
    this.selectedItem = item;
    this.selectionChange.emit(item);
    this.closeDropdown();
    this.searchTerm = '';
  }

  closeDropdown() {
    this.isOpen = false;
    this.dropdownToggle.emit(false);
  }

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  clearSearch() {
    this.searchTerm = '';
  }

  trackByFn(index: number, item: DropdownItem): string | number {
    return item.id;
  }
} 