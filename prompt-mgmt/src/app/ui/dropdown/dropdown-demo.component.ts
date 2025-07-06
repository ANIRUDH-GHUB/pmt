import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent, DropdownItem } from './dropdown.component';

@Component({
  selector: 'app-dropdown-demo',
  template: `
    <div class="p-6 space-y-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dropdown Component Demo</h2>
      
      <!-- Basic Dropdown -->
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Basic Dropdown</h3>
        <app-dropdown
          [items]="basicItems"
          placeholder="Select a category"
          (selectionChange)="onSelectionChange($event)"
          class="w-64"
        ></app-dropdown>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Selected: {{ selectedBasicItem?.label || 'None' }}
        </p>
      </div>

      <!-- Searchable Dropdown -->
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Searchable Dropdown</h3>
        <app-dropdown
          [items]="searchableItems"
          [searchable]="true"
          placeholder="Search and select..."
          (selectionChange)="onSearchableSelectionChange($event)"
          class="w-80"
        ></app-dropdown>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Selected: {{ selectedSearchableItem?.label || 'None' }}
        </p>
      </div>

      <!-- Different Sizes -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Different Sizes</h3>
        <div class="flex gap-4 items-end">
          <div class="space-y-2">
            <label class="text-sm text-gray-600 dark:text-gray-400">Small</label>
            <app-dropdown
              [items]="sizeItems"
              [size]="'sm'"
              placeholder="Small"
              class="w-48"
            ></app-dropdown>
          </div>
          <div class="space-y-2">
            <label class="text-sm text-gray-600 dark:text-gray-400">Medium</label>
            <app-dropdown
              [items]="sizeItems"
              [size]="'md'"
              placeholder="Medium"
              class="w-48"
            ></app-dropdown>
          </div>
          <div class="space-y-2">
            <label class="text-sm text-gray-600 dark:text-gray-400">Large</label>
            <app-dropdown
              [items]="sizeItems"
              [size]="'lg'"
              placeholder="Large"
              class="w-48"
            ></app-dropdown>
          </div>
        </div>
      </div>

      <!-- Different Variants -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Different Variants</h3>
        <div class="flex gap-4 items-end">
          <div class="space-y-2">
            <label class="text-sm text-gray-600 dark:text-gray-400">Default</label>
            <app-dropdown
              [items]="variantItems"
              [variant]="'default'"
              placeholder="Default"
              class="w-48"
            ></app-dropdown>
          </div>
          <div class="space-y-2">
            <label class="text-sm text-gray-600 dark:text-gray-400">Outline</label>
            <app-dropdown
              [items]="variantItems"
              [variant]="'outline'"
              placeholder="Outline"
              class="w-48"
            ></app-dropdown>
          </div>
          <div class="space-y-2">
            <label class="text-sm text-gray-600 dark:text-gray-400">Ghost</label>
            <app-dropdown
              [items]="variantItems"
              [variant]="'ghost'"
              placeholder="Ghost"
              class="w-48"
            ></app-dropdown>
          </div>
        </div>
      </div>

      <!-- With Icons and Dividers -->
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">With Icons and Dividers</h3>
        <app-dropdown
          [items]="iconItems"
          [showIcon]="true"
          placeholder="Select an action"
          class="w-64"
        ></app-dropdown>
      </div>

      <!-- Disabled State -->
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Disabled State</h3>
        <app-dropdown
          [items]="disabledItems"
          [disabled]="true"
          placeholder="Disabled dropdown"
          class="w-64"
        ></app-dropdown>
      </div>
    </div>
  `
})
export class DropdownDemoComponent {
  selectedBasicItem?: DropdownItem;
  selectedSearchableItem?: DropdownItem;

  basicItems: DropdownItem[] = [
    { id: 1, label: 'Technology' },
    { id: 2, label: 'Business' },
    { id: 3, label: 'Health' },
    { id: 4, label: 'Education' },
    { id: 5, label: 'Entertainment' }
  ];

  searchableItems: DropdownItem[] = [
    { id: 'react', label: 'React.js' },
    { id: 'angular', label: 'Angular' },
    { id: 'vue', label: 'Vue.js' },
    { id: 'svelte', label: 'Svelte' },
    { id: 'next', label: 'Next.js' },
    { id: 'nuxt', label: 'Nuxt.js' },
    { id: 'gatsby', label: 'Gatsby' },
    { id: 'remix', label: 'Remix' }
  ];

  sizeItems: DropdownItem[] = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' }
  ];

  variantItems: DropdownItem[] = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' }
  ];

  iconItems: DropdownItem[] = [
    { id: 'edit', label: 'Edit', icon: 'edit' },
    { id: 'copy', label: 'Copy', icon: 'content_copy' },
    { id: 'share', label: 'Share', icon: 'share' },
    { divider: true, id: 'divider1', label: '' },
    { id: 'delete', label: 'Delete', icon: 'delete', disabled: true },
    { id: 'archive', label: 'Archive', icon: 'archive' }
  ];

  disabledItems: DropdownItem[] = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' }
  ];

  onSelectionChange(item: DropdownItem) {
    this.selectedBasicItem = item;
    console.log('Basic dropdown selection:', item);
  }

  onSearchableSelectionChange(item: DropdownItem) {
    this.selectedSearchableItem = item;
    console.log('Searchable dropdown selection:', item);
  }
} 