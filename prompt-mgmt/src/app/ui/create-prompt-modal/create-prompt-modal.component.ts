import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CreatePromptFormComponent, CreatePromptFormData } from '../create-prompt-form/create-prompt-form.component';
import { ModalComponent } from '../modal/modal.component';
import { PromptModel } from '../prompt-card/prompt-card.model';

@Component({
  selector: 'app-create-prompt-modal',
  templateUrl: './create-prompt-modal.component.html',
  styleUrls: ['./create-prompt-modal.component.scss']
})
export class CreatePromptModalComponent {
  @Input() isOpen = false;
  @Input() initialData: CreatePromptFormData | null = null;
  @Input() isEditMode = false;
  @Input() availableVersions: string[] = ['1.0', '1.1', '1.2'];
  @Input() currentVersion: string = '1.0';
  @Output() save = new EventEmitter<CreatePromptFormData>();
  @Output() publish = new EventEmitter<CreatePromptFormData>();
  @Output() close = new EventEmitter<void>();
  @Output() versionChange = new EventEmitter<string>();

  onSave(formData: CreatePromptFormData) {
    this.save.emit(formData);
  }

  onPublish(formData: CreatePromptFormData) {
    this.publish.emit(formData);
  }

  onClose() {
    this.close.emit();
  }

  onVersionChange(version: string) {
    this.versionChange.emit(version);
  }
} 