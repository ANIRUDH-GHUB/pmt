import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { promptReducer } from './prompt/prompt.reducer';
import { filterReducer } from './filter/filter.reducer';
import { uiReducer } from './ui/ui.reducer';
import { PromptEffects } from './prompt/prompt.effects';

export const storeProviders = [
  provideStore({
    prompt: promptReducer,
    filter: filterReducer,
    ui: uiReducer
  }),
  provideEffects([PromptEffects])
]; 