import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PromptState, promptAdapter } from './prompt.state';
import { PromptModel } from '../../ui/prompt-card/prompt-card.model';

export const selectPromptState = createFeatureSelector<PromptState>('prompt');

export const selectAllPrompts = createSelector(
  selectPromptState,
  promptAdapter.getSelectors().selectAll
);

export const selectPromptLoading = createSelector(
  selectPromptState,
  (state: PromptState) => state.loading
);

export const selectPromptError = createSelector(
  selectPromptState,
  (state: PromptState) => state.error
);

export const selectEditingPrompt = createSelector(
  selectPromptState,
  (state: PromptState) => state.editingPrompt
);

export const selectIsEditMode = createSelector(
  selectPromptState,
  (state: PromptState) => state.isEditMode
);

export const selectFilteredPrompts = createSelector(
  selectAllPrompts,
  (prompts: PromptModel[]) => {
    // Group prompts by name, useCase, and subUseCase, and select the best version
    const groupedPrompts = new Map<string, PromptModel>();
    
    prompts.forEach(prompt => {
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
);

export const selectSelectedPromptId = createSelector(
  selectPromptState,
  (state) => state.selectedPromptId
);

export const selectSelectedPrompt = createSelector(
  selectPromptState,
  selectAllPrompts,
  (state, prompts) => {
    if (!state.selectedPromptId) return null;
    return prompts.find(p => p.id === state.selectedPromptId) || null;
  }
);

export const selectPromptsByUseCase = createSelector(
  selectFilteredPrompts,
  (prompts) => {
    const useCaseMap = new Map<string, PromptModel[]>();
    prompts.forEach(prompt => {
      if (!useCaseMap.has(prompt.useCase)) {
        useCaseMap.set(prompt.useCase, []);
      }
      useCaseMap.get(prompt.useCase)!.push(prompt);
    });
    return useCaseMap;
  }
);

export const selectPromptVersions = createSelector(
  selectAllPrompts,
  (prompts: PromptModel[]) => {
    const versionMap = new Map<string, PromptModel[]>();
    
    prompts.forEach(prompt => {
      const key = `${prompt.name}-${prompt.useCase}-${prompt.subUseCase}`;
      if (!versionMap.has(key)) {
        versionMap.set(key, []);
      }
      versionMap.get(key)!.push(prompt);
    });
    
    // Sort versions for each group
    versionMap.forEach((versions, key) => {
      versions.sort((a, b) => b.version - a.version);
    });
    
    return versionMap;
  }
);

 