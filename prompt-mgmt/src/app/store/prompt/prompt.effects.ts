import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { PromptService } from '../../services/prompt.service';
import * as PromptActions from './prompt.actions';
import { PromptModel } from '../../ui/prompt-card/prompt-card.model';

@Injectable()
export class PromptEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private promptService = inject(PromptService);

  // Load prompts effect
  loadPrompts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PromptActions.loadPrompts),
      mergeMap(() => this.promptService.getPrompts()
        .pipe(
          map((prompts: PromptModel[]) => PromptActions.loadPromptsSuccess({ prompts })),
          catchError(error => of(PromptActions.loadPromptsFailure({ error: error.message })))
        ))
    );
  });

  // Create prompt effect
  createPrompt$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PromptActions.createPrompt),
      mergeMap(({ formData }) => this.promptService.createPrompt(formData)
        .pipe(
          map((prompt: PromptModel) => PromptActions.createPromptSuccess({ prompt })),
          catchError(error => of(PromptActions.createPromptFailure({ error: error.message })))
        ))
    );
  });

  // Update prompt effect
  updatePrompt$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PromptActions.updatePrompt),
      mergeMap(({ prompt }) => this.promptService.updatePrompt(prompt.id, {
        name: prompt.name,
        description: prompt.description,
        useCase: prompt.useCase,
        subUseCase: prompt.subUseCase,
        reportType: prompt.reportType,
        modelType: prompt.modelType,
        modelVersion: prompt.modelVersion,
        temperature: prompt.temperature,
        topP: prompt.topP,
        frequencyPenalty: prompt.frequencyPenalty,
        presencePenalty: prompt.presencePenalty,
        promptSections: prompt.promptSections.map((section, index) => ({
          id: section.id || `section_${index + 1}`,
          title: section.sectionName || `Section ${index + 1}`,
          content: section.sectionText,
          isActive: index === 0
        }))
      })
        .pipe(
          map((updatedPrompt: PromptModel) => PromptActions.updatePromptSuccess({ prompt: updatedPrompt })),
          catchError(error => of(PromptActions.updatePromptFailure({ error: error.message })))
        ))
    );
  });

  // Publish prompt effect
  publishPrompt$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PromptActions.publishPrompt),
      mergeMap(({ formData }) => this.promptService.publishPrompt(formData)
        .pipe(
          map((prompt: PromptModel) => PromptActions.publishPromptSuccess({ prompt })),
          catchError(error => of(PromptActions.publishPromptFailure({ error: error.message })))
        ))
    );
  });

  // Delete prompt effect
  deletePrompt$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PromptActions.deletePrompt),
      mergeMap(({ promptId }) => this.promptService.deletePrompt(promptId)
        .pipe(
          map(() => PromptActions.deletePromptSuccess({ promptId })),
          catchError(error => of(PromptActions.deletePromptFailure({ error: error.message })))
        ))
    );
  });
} 