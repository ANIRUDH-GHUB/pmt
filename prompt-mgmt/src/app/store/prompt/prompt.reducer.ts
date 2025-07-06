import { createReducer, on } from '@ngrx/store';
import { promptAdapter, initialPromptState } from './prompt.state';
import * as PromptActions from './prompt.actions';

export const promptReducer = createReducer(
  initialPromptState,
  
  // Load Prompts
  on(PromptActions.loadPrompts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(PromptActions.loadPromptsSuccess, (state, { prompts }) => ({
    ...promptAdapter.setAll(prompts, state),
    loading: false,
    error: null
  })),
  
  on(PromptActions.loadPromptsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Create Prompt
  on(PromptActions.createPrompt, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(PromptActions.createPromptSuccess, (state, { prompt }) => ({
    ...promptAdapter.addOne(prompt, state),
    loading: false,
    error: null
  })),
  
  on(PromptActions.createPromptFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Update Prompt
  on(PromptActions.updatePrompt, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(PromptActions.updatePromptSuccess, (state, { prompt }) => ({
    ...promptAdapter.updateOne(
      { id: prompt.id, changes: prompt },
      state
    ),
    loading: false,
    error: null
  })),
  
  on(PromptActions.updatePromptFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Publish Prompt
  on(PromptActions.publishPrompt, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(PromptActions.publishPromptSuccess, (state, { prompt }) => ({
    ...promptAdapter.updateOne(
      { id: prompt.id, changes: prompt },
      state
    ),
    loading: false,
    error: null
  })),
  
  on(PromptActions.publishPromptFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Delete Prompt
  on(PromptActions.deletePrompt, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(PromptActions.deletePromptSuccess, (state, { promptId }) => ({
    ...promptAdapter.removeOne(promptId, state),
    loading: false,
    error: null
  })),
  
  on(PromptActions.deletePromptFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // UI Actions
  on(PromptActions.selectPrompt, (state, { promptId }) => ({
    ...state,
    selectedPromptId: promptId
  })),
  
  on(PromptActions.clearSelectedPrompt, (state) => ({
    ...state,
    selectedPromptId: null
  })),
  
  on(PromptActions.setEditMode, (state, { isEditMode, prompt }) => ({
    ...state,
    isEditMode,
    editingPrompt: prompt || null
  })),
  
  on(PromptActions.clearEditMode, (state) => ({
    ...state,
    isEditMode: false,
    editingPrompt: null
  }))
); 