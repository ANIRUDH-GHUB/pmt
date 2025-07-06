import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PromptModel } from '../ui/prompt-card/prompt-card.model';
import { CreatePromptFormData } from '../ui/create-prompt-form/create-prompt-form.component';
import { PROMPT_DATA } from '../ui/prompt-card/prompt-card.model';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private prompts: PromptModel[] = [...PROMPT_DATA];

  constructor() {}

  // Load all prompts
  getPrompts(): Observable<PromptModel[]> {
    return of(this.prompts).pipe(delay(500)); // Simulate API delay
  }

  // Create new prompt
  createPrompt(formData: CreatePromptFormData): Observable<PromptModel> {
    const newPrompt: PromptModel = {
      id: this.generateId(),
      name: formData.name,
      description: formData.description,
      useCase: formData.useCase,
      subUseCase: formData.subUseCase,
      reportType: formData.reportType,
      modelType: formData.modelType,
      modelVersion: formData.modelVersion,
      temperature: formData.temperature,
      topP: formData.topP,
      frequencyPenalty: formData.frequencyPenalty,
      presencePenalty: formData.presencePenalty,
      promptSections: formData.promptSections.map((section, index) => ({
        id: section.id,
        sequence: index + 1,
        sectionName: section.title,
        sectionText: section.content,
        createdBy: 'Aniroodh Suddhapalli(07YNF)',
        createdAt: Date.now(),
        updatedBy: 'Aniroodh Suddhapalli(07YNF)',
        updatedAt: Date.now()
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'Aniroodh Suddhapalli(07YNF)',
      published: false,
      version: 1,
      modelSettings: {
        temperature: formData.temperature,
        topP: formData.topP,
        frequencyPenalty: formData.frequencyPenalty,
        presencePenalty: formData.presencePenalty,
        modelType: formData.modelType,
        modelVersion: formData.modelVersion
      }
    };

    this.prompts.push(newPrompt);
    return of(newPrompt).pipe(delay(300));
  }

  // Update existing prompt
  updatePrompt(id: string, formData: CreatePromptFormData): Observable<PromptModel> {
    const index = this.prompts.findIndex(p => p.id === id);
    if (index !== -1) {
      const updatedPrompt: PromptModel = {
        ...this.prompts[index],
        name: formData.name,
        description: formData.description,
        useCase: formData.useCase,
        subUseCase: formData.subUseCase,
        reportType: formData.reportType,
        modelType: formData.modelType,
        modelVersion: formData.modelVersion,
        temperature: formData.temperature,
        topP: formData.topP,
        frequencyPenalty: formData.frequencyPenalty,
        presencePenalty: formData.presencePenalty,
        promptSections: formData.promptSections.map((section, index) => ({
          id: section.id,
          sequence: index + 1,
          sectionName: section.title,
          sectionText: section.content,
          createdBy: 'Aniroodh Suddhapalli(07YNF)',
          createdAt: Date.now(),
          updatedBy: 'Aniroodh Suddhapalli(07YNF)',
          updatedAt: Date.now()
        })),
        updatedAt: new Date(),
        modelSettings: {
          temperature: formData.temperature,
          topP: formData.topP,
          frequencyPenalty: formData.frequencyPenalty,
          presencePenalty: formData.presencePenalty,
          modelType: formData.modelType,
          modelVersion: formData.modelVersion
        }
      };

      this.prompts[index] = updatedPrompt;
      return of(updatedPrompt).pipe(delay(300));
    }
    throw new Error('Prompt not found');
  }

  // Publish prompt
  publishPrompt(formData: CreatePromptFormData): Observable<PromptModel> {
    const newPrompt: PromptModel = {
      id: this.generateId(),
      name: formData.name,
      description: formData.description,
      useCase: formData.useCase,
      subUseCase: formData.subUseCase,
      reportType: formData.reportType,
      modelType: formData.modelType,
      modelVersion: formData.modelVersion,
      temperature: formData.temperature,
      topP: formData.topP,
      frequencyPenalty: formData.frequencyPenalty,
      presencePenalty: formData.presencePenalty,
      promptSections: formData.promptSections.map((section, index) => ({
        id: section.id,
        sequence: index + 1,
        sectionName: section.title,
        sectionText: section.content,
        createdBy: 'Aniroodh Suddhapalli(07YNF)',
        createdAt: Date.now(),
        updatedBy: 'Aniroodh Suddhapalli(07YNF)',
        updatedAt: Date.now()
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'Aniroodh Suddhapalli(07YNF)',
      published: true,
      version: 1,
      modelSettings: {
        temperature: formData.temperature,
        topP: formData.topP,
        frequencyPenalty: formData.frequencyPenalty,
        presencePenalty: formData.presencePenalty,
        modelType: formData.modelType,
        modelVersion: formData.modelVersion
      }
    };

    this.prompts.push(newPrompt);
    return of(newPrompt).pipe(delay(300));
  }

  // Delete prompt
  deletePrompt(id: string): Observable<void> {
    const index = this.prompts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.prompts.splice(index, 1);
      return of(void 0).pipe(delay(200));
    }
    throw new Error('Prompt not found');
  }

  // Get prompt by ID
  getPromptById(id: string): Observable<PromptModel | undefined> {
    const prompt = this.prompts.find(p => p.id === id);
    return of(prompt).pipe(delay(200));
  }

  // Get prompts by use case
  getPromptsByUseCase(useCase: string): Observable<PromptModel[]> {
    const filtered = this.prompts.filter(p => p.useCase === useCase);
    return of(filtered).pipe(delay(200));
  }

  // Get user's prompts
  getUserPrompts(userId: string): Observable<PromptModel[]> {
    const userPrompts = this.prompts.filter(p => p.createdBy.includes(userId));
    return of(userPrompts).pipe(delay(200));
  }

  // Search prompts
  searchPrompts(query: string): Observable<PromptModel[]> {
    const searchResults = this.prompts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.useCase.toLowerCase().includes(query.toLowerCase())
    );
    return of(searchResults).pipe(delay(200));
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
} 