import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState } from './filter.state';

export const selectFilterState = createFeatureSelector<FilterState>('filter');

export const selectSearchQuery = createSelector(
  selectFilterState,
  (state) => state.searchQuery
);

export const selectCurrentFilter = createSelector(
  selectFilterState,
  (state) => state.currentFilter
);

export const selectShowMyPrompts = createSelector(
  selectFilterState,
  (state) => state.showMyPrompts
);

export const selectSelectedUseCase = createSelector(
  selectFilterState,
  (state) => state.selectedUseCase
);

export const selectSelectedSubUseCase = createSelector(
  selectFilterState,
  (state) => state.selectedSubUseCase
);

// Combined filter selector
export const selectAllFilters = createSelector(
  selectSearchQuery,
  selectCurrentFilter,
  selectShowMyPrompts,
  selectSelectedUseCase,
  selectSelectedSubUseCase,
  (searchQuery, currentFilter, showMyPrompts, selectedUseCase, selectedSubUseCase) => ({
    searchQuery,
    currentFilter,
    showMyPrompts,
    selectedUseCase,
    selectedSubUseCase
  })
); 