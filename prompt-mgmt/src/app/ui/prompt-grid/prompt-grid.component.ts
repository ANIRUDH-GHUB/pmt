import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';


import { PromptCardComponent } from '../prompt-card/prompt-card.component';
import { PromptModel } from '../prompt-card/prompt-card.model';

@Component({
  selector: 'app-prompt-grid',
  templateUrl: './prompt-grid.component.html',
  styleUrls: ['./prompt-grid.component.scss']
})
export class PromptGridComponent {
  @Input() prompts: PromptModel[] = [];
  @Input() currentUser: string = '';
  @Output() editPrompt = new EventEmitter<PromptModel>();

  constructor(private router: Router) {}

  onEdit(prompt: PromptModel) {
    this.editPrompt.emit(prompt);
  }

  onEditPrompt(prompt: PromptModel) {
    this.editPrompt.emit(prompt);
  }

  onOpenPlayground(prompt: PromptModel) {
    this.router.navigate(['/playground', prompt.id]);
  }
} 