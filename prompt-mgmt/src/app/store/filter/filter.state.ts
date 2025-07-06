export interface FilterState {
  searchQuery: string;
  currentFilter: string;
  showMyPrompts: boolean;
  selectedUseCase: string | null;
  selectedSubUseCase: string | null;
}

export const initialFilterState: FilterState = {
  searchQuery: '',
  currentFilter: 'all',
  showMyPrompts: false,
  selectedUseCase: null,
  selectedSubUseCase: null
}; 