import { createReducer, on } from '@ngrx/store';
import { initialFilterState } from './filter.state';
import * as FilterActions from './filter.actions';

export const filterReducer = createReducer(
  initialFilterState,
  
  on(FilterActions.updateSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query
  })),
  
  on(FilterActions.updateCurrentFilter, (state, { filter }) => ({
    ...state,
    currentFilter: filter
  })),
  
  on(FilterActions.toggleMyPrompts, (state, { show }) => ({
    ...state,
    showMyPrompts: show
  })),
  
  on(FilterActions.selectUseCase, (state, { useCase }) => ({
    ...state,
    selectedUseCase: useCase
  })),
  
  on(FilterActions.selectSubUseCase, (state, { subUseCase }) => ({
    ...state,
    selectedSubUseCase: subUseCase
  })),
  
  on(FilterActions.clearFilters, () => ({
    ...initialFilterState
  }))
); 