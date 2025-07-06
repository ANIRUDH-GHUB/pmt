import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { promptReducer } from './store/prompt/prompt.reducer';
import { filterReducer } from './store/filter/filter.reducer';
import { uiReducer } from './store/ui/ui.reducer';
import { PromptEffects } from './store/prompt/prompt.effects';

const storeConfig = {
  prompt: promptReducer,
  filter: filterReducer,
  ui: uiReducer
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore(storeConfig),
    provideEffects([PromptEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    })
  ]
};
