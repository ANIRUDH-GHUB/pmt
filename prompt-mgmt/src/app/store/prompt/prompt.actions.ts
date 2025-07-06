import { createAction, props } from '@ngrx/store';
import { PromptModel } from '../../ui/prompt-card/prompt-card.model';
import { CreatePromptFormData } from '../../ui/create-prompt-form/create-prompt-form.component';

// Load Prompts
export const loadPrompts = createAction('[Prompt] Load Prompts');
export const loadPromptsSuccess = createAction(
  '[Prompt] Load Prompts Success',
  props<{ prompts: PromptModel[] }>()
);
export const loadPromptsFailure = createAction(
  '[Prompt] Load Prompts Failure',
  props<{ error: string }>()
);

// Create Prompt
export const createPrompt = createAction(
  '[Prompt] Create Prompt',
  props<{ formData: CreatePromptFormData }>()
);
export const createPromptSuccess = createAction(
  '[Prompt] Create Prompt Success',
  props<{ prompt: PromptModel }>()
);
export const createPromptFailure = createAction(
  '[Prompt] Create Prompt Failure',
  props<{ error: string }>()
);

// Update Prompt
export const updatePrompt = createAction(
  '[Prompt] Update Prompt',
  props<{ prompt: PromptModel }>()
);
export const updatePromptSuccess = createAction(
  '[Prompt] Update Prompt Success',
  props<{ prompt: PromptModel }>()
);
export const updatePromptFailure = createAction(
  '[Prompt] Update Prompt Failure',
  props<{ error: string }>()
);

// Publish Prompt
export const publishPrompt = createAction(
  '[Prompt] Publish Prompt',
  props<{ formData: CreatePromptFormData }>()
);
export const publishPromptSuccess = createAction(
  '[Prompt] Publish Prompt Success',
  props<{ prompt: PromptModel }>()
);
export const publishPromptFailure = createAction(
  '[Prompt] Publish Prompt Failure',
  props<{ error: string }>()
);

// Delete Prompt
export const deletePrompt = createAction(
  '[Prompt] Delete Prompt',
  props<{ promptId: string }>()
);
export const deletePromptSuccess = createAction(
  '[Prompt] Delete Prompt Success',
  props<{ promptId: string }>()
);
export const deletePromptFailure = createAction(
  '[Prompt] Delete Prompt Failure',
  props<{ error: string }>()
);

// UI Actions
export const selectPrompt = createAction(
  '[Prompt] Select Prompt',
  props<{ promptId: string }>()
);
export const clearSelectedPrompt = createAction('[Prompt] Clear Selected Prompt');
export const setEditMode = createAction(
  '[Prompt] Set Edit Mode',
  props<{ isEditMode: boolean; prompt?: PromptModel }>()
);
export const clearEditMode = createAction('[Prompt] Clear Edit Mode'); 