import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

import { InputFieldComponent } from '../input-field/input-field.component';
import { SliderInputComponent } from '../slider-input/slider-input.component';
import { TabSectionComponent } from '../tab-section/tab-section.component';
import { DropdownComponent, DropdownItem } from '../dropdown/dropdown.component';

export interface CreatePromptFormData {
  name: string;
  description: string;
  useCase: string;
  subUseCase: string;
  reportType: string;
  modelType: string;
  modelVersion: string;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  promptSections: TabSection[];
}

export interface TabSection {
  id: string;
  title: string;
  content: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-create-prompt-form',
  templateUrl: './create-prompt-form.component.html',
  styleUrls: ['./create-prompt-form.component.scss']
})
export class CreatePromptFormComponent implements OnInit, OnChanges {
  @Input() initialData: CreatePromptFormData | null = null;
  @Input() isEditMode = false;
  @Input() availableVersions: string[] = [];
  @Input() currentVersion: string = '1.0';
  @Output() save = new EventEmitter<CreatePromptFormData>();
  @Output() publish = new EventEmitter<CreatePromptFormData>();
  @Output() cancel = new EventEmitter<void>();
  @Output() versionChange = new EventEmitter<string>();

  formData: CreatePromptFormData = {
    name: '',
    description: '',
    useCase: '',
    subUseCase: '',
    reportType: '',
    modelType: 'OpenAI',
    modelVersion: 'gpt-4o',
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        id: 'section_1',
        title: 'System Instructions',
        content: '',
        isActive: true
      }
    ]
  };

  // Dropdown items
  selectedModelType: DropdownItem = { id: 'OpenAI', label: 'OpenAI' };
  selectedModelVersion: DropdownItem = { id: 'gpt-4o', label: 'GPT-4o' };
  selectedVersion: string = '1.0';

  // Error handling
  errors: { [key: string]: string } = {};
  hasErrors = false;

  // Configuration objects
  config = {
    title: 'Create New Prompt',
    cancelButtonText: 'Cancel',
    submitButtonText: 'Save Draft',
    publishButtonText: 'Publish'
  };

  nameConfig = {
    label: 'Prompt Name',
    placeholder: 'Enter prompt name...',
    required: true,
    maxLength: 100
  };

  descriptionConfig = {
    label: 'Description',
    placeholder: 'Enter prompt description...',
    required: true,
    maxLength: 500,
    rows: 3
  };

  temperatureConfig = {
    label: 'Temperature',
    min: 0,
    max: 2,
    step: 0.1,
    description: 'Controls randomness in the output'
  };

  topPConfig = {
    label: 'Top P',
    min: 0,
    max: 1,
    step: 0.1,
    description: 'Controls diversity via nucleus sampling'
  };

  frequencyPenaltyConfig = {
    label: 'Frequency Penalty',
    min: -2,
    max: 2,
    step: 0.1,
    description: 'Reduces repetition of similar content'
  };

  presencePenaltyConfig = {
    label: 'Presence Penalty',
    min: -2,
    max: 2,
    step: 0.1,
    description: 'Encourages new topics and content'
  };

  promptSectionsConfig = {
    title: 'Prompt Sections',
    addButtonText: 'Add Section',
    removeButtonText: 'Remove'
  };

  activeSectionId: string = 'section_1';

  // Dropdown selections
  selectedUseCase: DropdownItem = { id: '', label: '' };
  selectedSubUseCase: DropdownItem = { id: '', label: '' };
  selectedReportType: DropdownItem = { id: '', label: '' };

  useCases = [
    'Summarization',
    'Generation',
    'Tutoring',
    'Review',
    'Explanation',
    'Writing',
    'Analysis',
    'Translation',
    'Marketing',
    'Research'
  ];

  subUseCases = [
    'headline_generation',
    'headline',
    'math',
    'essay',
    'code',
    'creative',
    'data',
    'multilingual',
    'copywriting',
    'academic',
    'Article Summary'
  ];

  reportTypes = [
    'Generic',
    'Creative',
    'Technical',
    'Analytics',
    'Translation',
    'Marketing',
    'Academic'
  ];

  modelTypes = [
    'OpenAI',
    'Anthropic',
    'Google'
  ];

  modelVersions = {
    'OpenAI': ['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    'Anthropic': ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
    'Google': ['gemini-pro', 'gemini-pro-vision']
  };

  get modelTypeItems(): DropdownItem[] {
    return this.modelTypes.map(type => ({ id: type, label: type }));
  }

  get modelVersionItems(): DropdownItem[] {
    const versions = this.modelVersions[this.formData.modelType as keyof typeof this.modelVersions] || [];
    return versions.map(version => ({ id: version, label: version }));
  }

  get useCaseItems(): DropdownItem[] {
    return this.useCases.map(useCase => ({ id: useCase, label: useCase }));
  }

  get subUseCaseItems(): DropdownItem[] {
    return this.subUseCases.map(subUseCase => ({ id: subUseCase, label: subUseCase }));
  }

  get reportTypeItems(): DropdownItem[] {
    return this.reportTypes.map(reportType => ({ id: reportType, label: reportType }));
  }

  ngOnInit() {
    // Set title based on edit mode
    this.config.title = this.isEditMode ? 'Edit Prompt' : 'Create New Prompt';
    this.config.submitButtonText = this.isEditMode ? 'Update Draft' : 'Save Draft';
    this.config.publishButtonText = this.isEditMode ? 'Update & Publish' : 'Publish';
    
    if (this.initialData) {
      this.formData = { ...this.initialData };
    }
    this.selectedVersion = this.currentVersion;
    this.updateSelectedItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && changes['initialData'].currentValue) {
      this.formData = { ...changes['initialData'].currentValue };
      this.updateSelectedItems();
    }
  }

  updateSelectedItems() {
    this.selectedModelType = { id: this.formData.modelType, label: this.formData.modelType };
    this.selectedModelVersion = { id: this.formData.modelVersion, label: this.formData.modelVersion };
    this.selectedUseCase = { id: this.formData.useCase, label: this.formData.useCase };
    this.selectedSubUseCase = { id: this.formData.subUseCase, label: this.formData.subUseCase };
    this.selectedReportType = { id: this.formData.reportType, label: this.formData.reportType };
  }

  onSave() {
    this.validateForm();
    if (!this.hasErrors) {
      this.save.emit(this.formData);
    }
  }

  onPublish() {
    this.validateForm();
    if (!this.hasErrors) {
      // Auto-increment version when publishing in edit mode
      if (this.isEditMode && this.availableVersions.length > 0) {
        const currentVersionNum = parseFloat(this.selectedVersion);
        const nextVersion = (currentVersionNum + 0.1).toFixed(1);
        this.selectedVersion = nextVersion;
      }
      this.publish.emit(this.formData);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onModelTypeChange(item: DropdownItem) {
    this.formData.modelType = item.label;
    // Reset model version when model type changes
    const versions = this.modelVersions[this.formData.modelType as keyof typeof this.modelVersions];
    if (versions && versions.length > 0) {
      this.formData.modelVersion = versions[0];
      this.selectedModelVersion = { id: versions[0], label: versions[0] };
    }
  }

  onModelVersionChange(item: DropdownItem) {
    this.formData.modelVersion = item.label;
  }

  onUseCaseChange(item: DropdownItem) {
    this.formData.useCase = item.label;
    this.selectedUseCase = item;
    // Reset sub use case when use case changes
    this.formData.subUseCase = '';
    this.selectedSubUseCase = { id: '', label: '' };
  }

  onSubUseCaseChange(item: DropdownItem) {
    this.formData.subUseCase = item.label;
    this.selectedSubUseCase = item;
  }

  onReportTypeChange(item: DropdownItem) {
    this.formData.reportType = item.label;
    this.selectedReportType = item;
  }

  onVersionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedVersion = target.value;
    this.versionChange.emit(this.selectedVersion);
  }

  addPromptSection() {
    const newSection: TabSection = {
      id: `section_${this.formData.promptSections.length + 1}`,
      title: `Section ${this.formData.promptSections.length + 1}`,
      content: '',
      isActive: false
    };
    this.formData.promptSections.push(newSection);
  }

  removePromptSection(index: number) {
    if (this.formData.promptSections.length > 1) {
      this.formData.promptSections.splice(index, 1);
      // Ensure at least one section is active
      if (!this.formData.promptSections.some(section => section.isActive)) {
        this.formData.promptSections[0].isActive = true;
      }
    }
  }

  onSectionChange(sections: TabSection[]) {
    this.formData.promptSections = sections;
  }

  onSectionsChange(sections: TabSection[]) {
    this.formData.promptSections = sections;
  }

  onActiveSectionChange(sectionId: string) {
    this.activeSectionId = sectionId;
  }

  onSectionAdd(section: TabSection) {
    this.formData.promptSections.push(section);
  }

  onSectionRemove(sectionId: string) {
    const index = this.formData.promptSections.findIndex(s => s.id === sectionId);
    if (index !== -1) {
      this.removePromptSection(index);
    }
  }

  onSectionUpdate(section: TabSection) {
    const index = this.formData.promptSections.findIndex(s => s.id === section.id);
    if (index !== -1) {
      this.formData.promptSections[index] = section;
    }
  }

  validateForm() {
    this.errors = {};
    this.hasErrors = false;

    if (!this.formData.name.trim()) {
      this.errors['name'] = 'Name is required';
      this.hasErrors = true;
    }

    if (!this.formData.description.trim()) {
      this.errors['description'] = 'Description is required';
      this.hasErrors = true;
    }

    if (!this.formData.useCase) {
      this.errors['useCase'] = 'Use case is required';
      this.hasErrors = true;
    }

    if (!this.formData.modelType) {
      this.errors['modelType'] = 'Model type is required';
      this.hasErrors = true;
    }

    if (!this.formData.modelVersion) {
      this.errors['modelVersion'] = 'Model version is required';
      this.hasErrors = true;
    }

    if (this.formData.promptSections.length === 0) {
      this.errors['promptSections'] = 'At least one prompt section is required';
      this.hasErrors = true;
    }
  }

  getErrorValues(): string[] {
    return Object.values(this.errors);
  }
} 