import { createAction, props } from '@ngrx/store';

export const updateSearchQuery = createAction(
  '[Filter] Update Search Query',
  props<{ query: string }>()
);

export const updateCurrentFilter = createAction(
  '[Filter] Update Current Filter',
  props<{ filter: string }>()
);

export const toggleMyPrompts = createAction(
  '[Filter] Toggle My Prompts',
  props<{ show: boolean }>()
);

export const selectUseCase = createAction(
  '[Filter] Select Use Case',
  props<{ useCase: string | null }>()
);

export const selectSubUseCase = createAction(
  '[Filter] Select Sub Use Case',
  props<{ subUseCase: string | null }>()
);

export const clearFilters = createAction('[Filter] Clear Filters'); 