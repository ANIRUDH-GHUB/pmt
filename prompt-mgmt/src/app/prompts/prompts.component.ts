import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../ui/header/header.component';
import { PromptGridComponent } from '../ui/prompt-grid/prompt-grid.component';
import { FilterBarComponent } from '../ui/filter-bar/filter-bar.component';
import { CreatePromptModalComponent } from '../ui/create-prompt-modal/create-prompt-modal.component';
import { PromptModel, PromptSection } from '../ui/prompt-card/prompt-card.model';
import { CreatePromptFormData } from '../ui/create-prompt-form/create-prompt-form.component';
import * as PromptActions from '../store/prompt/prompt.actions';
import * as PromptSelectors from '../store/prompt/prompt.selectors';
import * as FilterSelectors from '../store/filter/filter.selectors';
import * as UISelectors from '../store/ui/ui.selectors';
import * as UIActions from '../store/ui/ui.actions';

interface FilterState {
  searchTerm: string;
  useCase: string;
  subUseCase: string;
  reportType: string;
  myPrompts: boolean;
}

@Component({
  selector: 'app-prompts',
  templateUrl: './prompts.component.html',
  styleUrls: ['./prompts.component.scss']
})
export class PromptsComponent implements OnInit {
  private store = inject(Store);

  title = 'Agenta.ai Lookalike';
  currentUser = 'Aniroodh Suddhapalli(07YNF)'; // Current user ID

  // Observables
  prompts$ = this.store.select(PromptSelectors.selectAllPrompts);
  filteredPrompts$ = this.store.select(PromptSelectors.selectFilteredPrompts);
  promptLoading$ = this.store.select(PromptSelectors.selectPromptLoading);
  promptError$ = this.store.select(PromptSelectors.selectPromptError);
  isModalOpen$ = this.store.select(UISelectors.selectIsModalOpen);
  editingPrompt$ = this.store.select(PromptSelectors.selectEditingPrompt);
  isEditMode$ = this.store.select(PromptSelectors.selectIsEditMode);
  isDarkMode$ = this.store.select(UISelectors.selectIsDarkMode);
  promptVersions$ = this.store.select(PromptSelectors.selectPromptVersions);
  
  prompts: PromptModel[] = [];
  
  filterState: FilterState = {
    searchTerm: '',
    useCase: 'All',
    subUseCase: 'All',
    reportType: 'All',
    myPrompts: false
  };

  editingPromptInitialData: CreatePromptFormData | null = null;

  constructor(
    private overlayContainer: OverlayContainer,
    private cdr: ChangeDetectorRef
  ) {
    // Subscribe to theme changes
    this.store.select(UISelectors.selectIsDarkMode).subscribe(isDarkMode => {
      const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
      const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
      if (themeClassesToRemove.length) {
        overlayContainerClasses.remove(...themeClassesToRemove);
      }
      overlayContainerClasses.add(isDarkMode ? 'dark-theme' : 'light-theme');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    this.prompts$.subscribe(prompts => {
      this.prompts = prompts;
    });
  }

  ngOnInit() {
    // Load prompts when component initializes
    this.store.dispatch(PromptActions.loadPrompts());
  }

  toggleDarkMode() {
    this.store.dispatch({ type: '[UI] Toggle Dark Mode' });
  }

  onFilterChange(event: { type: string; value: string | boolean }) {
    switch (event.type) {
      case 'search':
        this.filterState.searchTerm = event.value as string;
        break;
      case 'useCase':
        this.filterState.useCase = event.value as string;
        break;
      case 'subUseCase':
        this.filterState.subUseCase = event.value as string;
        break;
      case 'reportType':
        this.filterState.reportType = event.value as string;
        break;
      case 'myPrompts':
        this.filterState.myPrompts = event.value as boolean;
        break;
    }
    // Trigger change detection to update the filtered prompts
    this.cdr.detectChanges();
  }

  onCreatePrompt() {
    this.store.dispatch(PromptActions.clearEditMode());
    this.store.dispatch(UIActions.openModal({ modalType: 'create' }));
  }

  onEditPrompt(prompt: PromptModel) {
    this.store.dispatch(PromptActions.setEditMode({ isEditMode: true, prompt }));
    this.store.dispatch(UIActions.openModal({ modalType: 'edit' }));
  }

  onSavePrompt(formData: CreatePromptFormData) {
    this.editingPrompt$.subscribe(editingPrompt => {
      if (editingPrompt) {
        // Update the existing prompt with new data but keep the same version
        const updatedPrompt = {
          ...editingPrompt,
          ...formData,
          promptSections: this.convertFormDataToPromptSections(formData)
        };
        this.store.dispatch(PromptActions.updatePrompt({ prompt: updatedPrompt }));
      } else {
        this.store.dispatch(PromptActions.createPrompt({ formData }));
      }
    }).unsubscribe();
    this.onCloseCreatePromptModal();
  }

  onPublishPrompt(formData: CreatePromptFormData) {
    this.editingPrompt$.subscribe(editingPrompt => {
      if (editingPrompt) {
        // Create a new version of the prompt with auto-incremented version
        const newPrompt: PromptModel = {
          ...editingPrompt,
          ...formData,
          promptSections: this.convertFormDataToPromptSections(formData),
          version: parseFloat(editingPrompt.version.toString()) + 0.1,
          published: true,
          updatedAt: new Date(),
          id: `${editingPrompt.id.split('v')[0]}v${(parseFloat(editingPrompt.version.toString()) + 0.1).toFixed(1)}`
        };
        this.store.dispatch(PromptActions.createPrompt({ formData }));
      } else {
        this.store.dispatch(PromptActions.createPrompt({ formData }));
      }
    }).unsubscribe();
    this.onCloseCreatePromptModal();
  }

  onCloseCreatePromptModal() {
    this.store.dispatch(UIActions.closeModal());
    this.store.dispatch(PromptActions.clearEditMode());
  }

  onCloseModal() {
    this.store.dispatch(UIActions.closeModal());
    this.store.dispatch(PromptActions.clearEditMode());
  }

  convertPromptToFormData(prompt: PromptModel): CreatePromptFormData {
    return {
      name: prompt.name,
      description: prompt.description,
      useCase: prompt.useCase,
      subUseCase: prompt.subUseCase,
      reportType: prompt.reportType,
      modelType: prompt.modelType,
      modelVersion: prompt.modelVersion,
      temperature: prompt.temperature,
      topP: prompt.topP,
      frequencyPenalty: prompt.frequencyPenalty,
      presencePenalty: prompt.presencePenalty,
      promptSections: prompt.promptSections.map((section, index) => ({
        id: section.id || `section_${index + 1}`,
        title: section.sectionName || `Section ${index + 1}`,
        content: section.sectionText,
        isActive: index === 0
      }))
    };
  }

  convertFormDataToPromptSections(formData: CreatePromptFormData): PromptSection[] {
    return formData.promptSections.map((section, index) => ({
      id: section.id,
      sequence: index + 1,
      sectionName: section.title,
      sectionText: section.content,
      createdBy: this.currentUser,
      createdAt: Date.now(),
      updatedBy: this.currentUser,
      updatedAt: Date.now()
    }));
  }

  getUniqueUseCases(): string[] {
    const useCases = new Set(this.prompts.map(prompt => prompt.useCase));
    return ['All', ...Array.from(useCases).sort()];
  }

  getUniqueSubUseCases(): string[] {
    const subUseCases = new Set(this.prompts.map(prompt => prompt.subUseCase));
    return ['All', ...Array.from(subUseCases).sort()];
  }

  getUniqueReportTypes(): string[] {
    const reportTypes = new Set(this.prompts.map(prompt => prompt.reportType));
    return ['All', ...Array.from(reportTypes).sort()];
  }

  getAvailableVersions(prompt: PromptModel): string[] {
    const key = `${prompt.name}-${prompt.useCase}-${prompt.subUseCase}`;
    const versions = this.prompts.filter(p => 
      p.name === prompt.name && 
      p.useCase === prompt.useCase && 
      p.subUseCase === prompt.subUseCase
    );
    return versions.map(p => p.version.toString()).sort((a, b) => parseInt(b) - parseInt(a));
  }

  get filteredPrompts(): PromptModel[] {
    let filtered = this.prompts;

    // Apply search filter
    if (this.filterState.searchTerm) {
      const searchTerm = this.filterState.searchTerm.toLowerCase();
      filtered = filtered.filter(prompt =>
        prompt.name.toLowerCase().includes(searchTerm) ||
        prompt.description.toLowerCase().includes(searchTerm) ||
        prompt.useCase.toLowerCase().includes(searchTerm) ||
        prompt.subUseCase.toLowerCase().includes(searchTerm)
      );
    }

    // Apply use case filter
    if (this.filterState.useCase && this.filterState.useCase !== 'All') {
      filtered = filtered.filter(prompt => prompt.useCase === this.filterState.useCase);
    }

    // Apply sub use case filter
    if (this.filterState.subUseCase && this.filterState.subUseCase !== 'All') {
      filtered = filtered.filter(prompt => prompt.subUseCase === this.filterState.subUseCase);
    }

    // Apply report type filter
    if (this.filterState.reportType && this.filterState.reportType !== 'All') {
      filtered = filtered.filter(prompt => prompt.reportType === this.filterState.reportType);
    }

    // Apply "My Prompts" filter
    if (this.filterState.myPrompts) {
      filtered = filtered.filter(prompt => prompt.createdBy === this.currentUser);
    }

    // Group prompts by name, useCase, and subUseCase, and select the best version
    const groupedPrompts = new Map<string, PromptModel>();
    
    filtered.forEach((prompt: PromptModel) => {
      const key = `${prompt.name}-${prompt.useCase}-${prompt.subUseCase}`;
      const existing = groupedPrompts.get(key);
      
      if (!existing) {
        groupedPrompts.set(key, prompt);
      } else {
        // Prefer published versions, then latest version
        if (prompt.published && !existing.published) {
          groupedPrompts.set(key, prompt);
        } else if (prompt.published === existing.published && prompt.version > existing.version) {
          groupedPrompts.set(key, prompt);
        }
      }
    });

    return Array.from(groupedPrompts.values());
  }

  onVersionChange(version: string, editingPrompt: PromptModel | null) {
    if (!editingPrompt) return;
    // Find the prompt for the selected version
    const promptForVersion = this.prompts.find(p =>
      p.name === editingPrompt.name &&
      p.useCase === editingPrompt.useCase &&
      p.subUseCase === editingPrompt.subUseCase &&
      p.version.toString() === version
    );
    if (promptForVersion) {
      this.editingPromptInitialData = this.convertPromptToFormData(promptForVersion);
    }
  }
} 