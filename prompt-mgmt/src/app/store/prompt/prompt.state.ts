import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PromptModel } from '../../ui/prompt-card/prompt-card.model';

export interface PromptState extends EntityState<PromptModel> {
  loading: boolean;
  error: string | null;
  selectedPromptId: string | null;
  editingPrompt: PromptModel | null;
  isEditMode: boolean;
}

export const promptAdapter: EntityAdapter<PromptModel> = createEntityAdapter<PromptModel>({
  selectId: (prompt: PromptModel) => prompt.id,
  sortComparer: (a: PromptModel, b: PromptModel) => b.version - a.version
});

export const initialPromptState: PromptState = promptAdapter.getInitialState({
  loading: false,
  error: null,
  selectedPromptId: null,
  editingPrompt: null,
  isEditMode: false
}); 