import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface ModalConfig {
  title?: string;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showBackdrop?: boolean;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() config: ModalConfig = {};
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.config.closeOnEscape !== false && this.isOpen) {
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit();
  }

  onBackdropClick(event: Event) {
    if (this.config.closeOnBackdropClick !== false && event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  get modalClasses(): string {
    const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden';
    const sizeClasses = {
      sm: 'w-full max-w-md',
      md: 'w-full max-w-lg',
      lg: 'w-full max-w-2xl',
      xl: 'w-full max-w-4xl',
      full: 'w-full max-w-7xl'
    };

    const size = this.config.size || 'lg';
    return `${baseClasses} ${sizeClasses[size]}`;
  }

  get backdropClasses(): string {
    const baseClasses = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    const backdropClass = this.config.showBackdrop !== false ? 'bg-black bg-opacity-50' : '';
    return `${baseClasses} ${backdropClass}`;
  }

  get showCloseButton(): boolean {
    return this.config.showCloseButton !== false;
  }

  get showTitle(): boolean {
    return !!this.config.title;
  }
} 