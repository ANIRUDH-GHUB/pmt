import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

export interface PromptVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array';
  description?: string;
  defaultValue?: any;
  required?: boolean;
}

@Component({
  selector: 'app-variable-panel',
  templateUrl: './variable-panel.component.html',
  styleUrls: ['./variable-panel.component.scss']
})
export class VariablePanelComponent {
  @Input() variables: PromptVariable[] = [];
  @Input() opened = false;

  getTypeIcon(type: string): string {
    switch (type) {
      case 'string': return 'text_fields';
      case 'number': return 'pin';
      case 'boolean': return 'check_box';
      case 'array': return 'list';
      default: return 'code';
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'string': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'number': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'boolean': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'array': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  }
} 