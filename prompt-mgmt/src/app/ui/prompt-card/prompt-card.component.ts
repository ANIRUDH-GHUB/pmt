import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';

import { MatMenuModule } from '@angular/material/menu';

import { PromptModel } from './prompt-card.model';

@Component({
  selector: 'app-prompt-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatMenuModule
  ],
  templateUrl: './prompt-card.component.html',
  styleUrls: ['./prompt-card.component.scss']
})
export class PromptCardComponent {
  @Input() prompt!: PromptModel;
  @Output() edit = new EventEmitter<PromptModel>();

  showMenu = false;

  constructor(private router: Router) {}

  onCardClick() {
    this.onOpenPlayground();
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  onEdit() {
    this.edit.emit(this.prompt);
    this.showMenu = false;
  }

  onOpenPlayground() {
    this.router.navigate(['/playground', this.prompt.id]);
  }

  getStatusColor(): string {
    if (this.prompt.published) {
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    }
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
  }

  getStatusText(): string {
    return this.prompt.published ? 'Published' : 'Draft';
  }

  get updatedAtDate(): string {
    return this.prompt.updatedAt.toLocaleDateString();
  }
} 