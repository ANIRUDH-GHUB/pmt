import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DropdownComponent, DropdownItem } from '../dropdown/dropdown.component';
import { PromptModel } from '../prompt-card/prompt-card.model';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    DropdownComponent
  ],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit, OnChanges {
  @Input() prompts: PromptModel[] = [];
  @Input() currentUser: string = 'Aniroodh Suddhapalli(07YNF)'; // Default current user
  @Input() useCases: string[] = [];
  @Input() subUseCases: string[] = [];
  @Input() reportTypes: string[] = [];
  @Output() filterChange = new EventEmitter<{ type: string; value: string | boolean }>();
  @Output() createPrompt = new EventEmitter<void>();

  searchTerm = '';
  selectedUseCase: DropdownItem = { id: 'All', label: 'All' };
  selectedSubUseCase: DropdownItem = { id: 'All', label: 'All' };
  selectedReportType = 'All';
  showMyPromptsOnly = false;

  useCaseItems: DropdownItem[] = [];
  subUseCaseItems: DropdownItem[] = [];
  allSubUseCaseItems: DropdownItem[] = []; // Store all sub-use case items

  ngOnInit() {
    this.extractFilterOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['prompts']) {
      this.extractFilterOptions();
    }
  }

  onCreatePrompt() {
    this.createPrompt.emit();
  }

  toggleMyPrompts() {
    this.showMyPromptsOnly = !this.showMyPromptsOnly;
    this.filterChange.emit({ type: 'myPrompts', value: this.showMyPromptsOnly });
  }

  private extractFilterOptions() {
    // Extract unique use cases
    const useCases = new Set<string>();
    const allSubUseCases = new Set<string>();
    const useCaseSubTypeMap = new Map<string, Set<string>>();

    this.prompts.forEach(prompt => {
      useCases.add(prompt.useCase);
      
      if (!useCaseSubTypeMap.has(prompt.useCase)) {
        useCaseSubTypeMap.set(prompt.useCase, new Set());
      }
      // Handle the case where subUseCase might not exist
      if (prompt.subUseCase) {
        useCaseSubTypeMap.get(prompt.useCase)!.add(prompt.subUseCase);
        allSubUseCases.add(prompt.subUseCase);
      }
    });

    // Create use case dropdown items with "All" option
    this.useCaseItems = [
      { id: 'All', label: 'All', icon: 'category' },
      ...Array.from(useCases).map(useCase => ({
        id: useCase,
        label: useCase,
        icon: 'category'
      }))
    ];

    // Create all sub-use case items with "All" option
    this.allSubUseCaseItems = [
      { id: 'All', label: 'All', icon: 'subdirectory_arrow_right' },
      ...Array.from(allSubUseCases).map(subUseCase => ({
        id: subUseCase,
        label: subUseCase,
        icon: 'subdirectory_arrow_right'
      }))
    ];

    // Update sub-use case items if a use case is selected
    this.updateSubUseCaseItems();
  }

  private updateSubUseCaseItems() {
    if (!this.selectedUseCase || this.selectedUseCase.label === 'All') {
      // Show all sub-use cases when no use case is selected
      this.subUseCaseItems = [...this.allSubUseCaseItems];
      return;
    }

    const useCase = this.selectedUseCase.label;
    const subUseCases = new Set<string>();

    this.prompts.forEach(prompt => {
      if (prompt.useCase === useCase && prompt.subUseCase) {
        subUseCases.add(prompt.subUseCase);
      }
    });

    this.subUseCaseItems = [
      { id: 'All', label: 'All', icon: 'subdirectory_arrow_right' },
      ...Array.from(subUseCases).map(subUseCase => ({
        id: subUseCase,
        label: subUseCase,
        icon: 'subdirectory_arrow_right'
      }))
    ];
  }

  onSearchChange() {
    this.filterChange.emit({ type: 'search', value: this.searchTerm });
  }

  onUseCaseChange(item: DropdownItem) {
    this.selectedUseCase = item;
    this.selectedSubUseCase = { id: 'All', label: 'All' };
    this.updateSubUseCaseItems();
    this.filterChange.emit({ type: 'useCase', value: item.label });
  }

  onSubUseCaseChange(item: DropdownItem) {
    this.selectedSubUseCase = item;
    this.filterChange.emit({ type: 'subUseCase', value: item.label });
  }

  onReportTypeChange() {
    this.filterChange.emit({ type: 'reportType', value: this.selectedReportType });
  }

  onMyPromptsChange() {
    this.filterChange.emit({ type: 'myPrompts', value: this.showMyPromptsOnly });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedUseCase = { id: 'All', label: 'All' };
    this.selectedSubUseCase = { id: 'All', label: 'All' };
    this.selectedReportType = 'All';
    this.showMyPromptsOnly = false;
    this.updateSubUseCaseItems(); // This will show all sub-use cases
    
    // Emit clear events
    this.filterChange.emit({ type: 'search', value: '' });
    this.filterChange.emit({ type: 'useCase', value: 'All' });
    this.filterChange.emit({ type: 'subUseCase', value: 'All' });
    this.filterChange.emit({ type: 'reportType', value: 'All' });
    this.filterChange.emit({ type: 'myPrompts', value: false });
  }

  get hasActiveFilters(): boolean {
    return !!this.searchTerm || 
           (this.selectedUseCase && this.selectedUseCase.label !== 'All') || 
           (this.selectedSubUseCase && this.selectedSubUseCase.label !== 'All') || 
           this.selectedReportType !== 'All' || 
           this.showMyPromptsOnly;
  }

  get activeFilterCount(): number {
    let count = 0;
    if (this.searchTerm) count++;
    if (this.selectedUseCase && this.selectedUseCase.label !== 'All') count++;
    if (this.selectedSubUseCase && this.selectedSubUseCase.label !== 'All') count++;
    if (this.selectedReportType !== 'All') count++;
    if (this.showMyPromptsOnly) count++;
    return count;
  }

  get myPromptsCount(): number {
    return this.prompts.filter(prompt => prompt.createdBy === this.currentUser).length;
  }
} 