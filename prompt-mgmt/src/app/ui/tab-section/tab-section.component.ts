import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface TabSection {
  id: string;
  title: string;
  content: string;
  isActive?: boolean;
  isEditing?: boolean;
}

export interface TabSectionConfig {
  title: string;
  placeholder?: string;
  allowAdd?: boolean;
  allowRemove?: boolean;
  allowEdit?: boolean;
  maxSections?: number;
  minSections?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
}

@Component({
  selector: 'app-tab-section',
  templateUrl: './tab-section.component.html',
  styleUrls: ['./tab-section.component.scss']
})
export class TabSectionComponent implements OnChanges {
  @Input() config!: TabSectionConfig;
  @Input() sections: TabSection[] = [];
  @Input() activeSectionId?: string;
  @Output() sectionsChange = new EventEmitter<TabSection[]>();
  @Output() activeSectionChange = new EventEmitter<string>();
  @Output() sectionAdd = new EventEmitter<TabSection>();
  @Output() sectionRemove = new EventEmitter<string>();
  @Output() sectionUpdate = new EventEmitter<TabSection>();

  editingSection: TabSection | null = null;
  editingTitle: string = '';
  editingContent: string = '';

  ngOnInit() {
    if (this.sections.length > 0 && !this.activeSectionId) {
      this.activeSectionId = this.sections[0].id;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sections']) {
      // If the currently edited section was removed, cancel editing
      if (this.editingSection && !this.sections.find(s => s.id === this.editingSection!.id)) {
        this.cancelEditing();
      }
      // If the active section was removed, set to first section
      if (this.activeSectionId && !this.sections.find(s => s.id === this.activeSectionId)) {
        this.activeSectionId = this.sections.length > 0 ? this.sections[0].id : undefined;
      }
    }
  }

  addSection() {
    if (this.config.maxSections && this.sections.length >= this.config.maxSections) {
      return;
    }

    const newSection: TabSection = {
      id: this.generateId(),
      title: `Section ${this.sections.length + 1}`,
      content: '',
      isActive: false
    };

    this.sectionAdd.emit(newSection);
  }

  removeSection(sectionId: string) {
    if (this.config.minSections && this.sections.length <= this.config.minSections) {
      return;
    }
    this.sectionRemove.emit(sectionId);
  }

  setActiveSection(sectionId: string) {
    this.activeSectionId = sectionId;
    this.activeSectionChange.emit(sectionId);
  }

  startEditing(section: TabSection) {
    if (!this.config.allowEdit) return;
    
    this.editingSection = section;
    this.editingTitle = section.title;
    this.editingContent = section.content;
  }

  saveEditing() {
    if (!this.editingSection) return;

    const updatedSection: TabSection = {
      ...this.editingSection,
      title: this.editingTitle,
      content: this.editingContent
    };

    this.sectionUpdate.emit(updatedSection);
    this.cancelEditing();
  }

  cancelEditing() {
    this.editingSection = null;
    this.editingTitle = '';
    this.editingContent = '';
  }

  private generateId(): string {
    return 'section_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  get activeSection(): TabSection | undefined {
    return this.sections.find(s => s.id === this.activeSectionId);
  }

  get canAdd(): boolean {
    return this.config.allowAdd !== false && 
           (!this.config.maxSections || this.sections.length < this.config.maxSections);
  }

  get canRemove(): boolean {
    return this.config.allowRemove !== false && 
           (!this.config.minSections || this.sections.length > this.config.minSections);
  }

  get canEdit(): boolean {
    return this.config.allowEdit !== false;
  }

  get tabClasses(): string {
    const baseClasses = 'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2';
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-4 py-2.5 text-base'
    };
    const variantClasses = {
      outline: 'border-transparent hover:border-gray-300 dark:hover:border-gray-600',
      filled: 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
    };

    const size = this.config.size || 'md';
    const variant = this.config.variant || 'outline';
    
    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
  }

  get activeTabClasses(): string {
    const baseClasses = 'border-accent text-accent';
    return `${this.tabClasses} ${baseClasses}`;
  }

  get inactiveTabClasses(): string {
    const baseClasses = 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white';
    return `${this.tabClasses} ${baseClasses}`;
  }
} 