import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PromptModel } from '../ui/prompt-card/prompt-card.model';
import { selectAllPrompts } from '../store/prompt/prompt.selectors';

interface PlaygroundState {
  prompt: PromptModel | null;
  availableVersions: PromptModel[];
  selectedVersion: PromptModel | null;
  inputText: string;
  outputText: string;
  isGenerating: boolean;
  progress: number;
  uploadedFileName: string | null;
  showModelSettings: boolean;
  modelSettings: {
    temperature: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
    modelType: string;
    modelVersion: string;
  };
}

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatBadgeModule
  ],
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  prompts$ = this.store.select(selectAllPrompts);
  
  playgroundState: PlaygroundState = {
    prompt: null,
    availableVersions: [],
    selectedVersion: null,
    inputText: '',
    outputText: '',
    isGenerating: false,
    progress: 0,
    uploadedFileName: null,
    showModelSettings: false,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: 'OpenAI',
      modelVersion: 'gpt-4o'
    }
  };

  ngOnInit() {
    this.route.params.pipe(
      map(params => params['promptId']),
      switchMap(promptId => 
        combineLatest([this.prompts$, this.route.params]).pipe(
          map(([prompts, params]) => {
            const id = params['promptId'];
            const selectedPrompt = this.findPromptById(prompts, id);
            const promptGroup = prompts.filter(p => 
              p.name === selectedPrompt?.name &&
              p.useCase === selectedPrompt?.useCase &&
              p.subUseCase === selectedPrompt?.subUseCase
            );
            
            return {
              promptId: id,
              promptGroup,
              selectedPrompt
            };
          })
        )
      )
    ).subscribe(({ promptId, promptGroup, selectedPrompt }) => {
      if (selectedPrompt) {
        this.playgroundState.prompt = selectedPrompt;
        this.playgroundState.availableVersions = promptGroup.sort((a, b) => b.version - a.version);
        this.playgroundState.selectedVersion = selectedPrompt;
        this.initializeModelSettings(selectedPrompt);
      } else {
        this.router.navigate(['/prompts']);
      }
    });
  }

  private findPromptById(prompts: PromptModel[], id: string): PromptModel | undefined {
    return prompts.find(p => p.id === id);
  }

  private initializeModelSettings(prompt: PromptModel) {
    if (prompt.modelSettings) {
      this.playgroundState.modelSettings = { ...prompt.modelSettings };
    } else {
      this.playgroundState.modelSettings = {
        temperature: prompt.temperature || 0,
        topP: prompt.topP || 1,
        frequencyPenalty: prompt.frequencyPenalty || 0,
        presencePenalty: prompt.presencePenalty || 0,
        modelType: prompt.modelType || 'OpenAI',
        modelVersion: prompt.modelVersion || 'gpt-4o'
      };
    }
  }

  onVersionChange(version: PromptModel) {
    this.playgroundState.selectedVersion = version;
    this.initializeModelSettings(version);
  }

  onModelSettingsChange() {
    this.playgroundState.showModelSettings = false;
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.playgroundState.uploadedFileName = file.name;
      this.extractTextFromFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    target.classList.add('border-accent', 'bg-accent/5');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('border-accent', 'bg-accent/5');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('border-accent', 'bg-accent/5');
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.playgroundState.uploadedFileName = file.name;
      this.extractTextFromFile(file);
    }
  }

  private extractTextFromFile(file: File) {
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        this.playgroundState.inputText = text;
      };
      reader.readAsText(file, 'UTF-8');
    } else if (file.type === 'application/pdf') {
      this.playgroundState.inputText = `[PDF File: ${file.name}]\n\nPDF text extraction is not implemented in this demo. Please copy and paste the text content manually, or upload a text file instead.\n\nFile size: ${(file.size / 1024).toFixed(1)} KB`;
    } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      this.playgroundState.inputText = `[Word Document: ${file.name}]\n\nWord document text extraction is not implemented in this demo. Please copy and paste the text content manually, or upload a text file instead.\n\nFile size: ${(file.size / 1024).toFixed(1)} KB`;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result && result.length > 0 && !/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(result)) {
          this.playgroundState.inputText = result;
        } else {
          this.playgroundState.inputText = `[Binary File: ${file.name}]\n\nThis file appears to be binary and cannot be read as text. Please upload a text file (.txt) or copy and paste the content manually.\n\nFile size: ${(file.size / 1024).toFixed(1)} KB`;
        }
      };
      reader.onerror = () => {
        this.playgroundState.inputText = `[Error Reading File: ${file.name}]\n\nUnable to read this file. Please upload a text file (.txt) or copy and paste the content manually.\n\nFile size: ${(file.size / 1024).toFixed(1)} KB`;
      };
      reader.readAsText(file, 'UTF-8');
    }
  }

  onClearInput() {
    this.playgroundState.inputText = '';
    this.playgroundState.uploadedFileName = null;
  }

  onGenerateOutput() {
    if (!this.playgroundState.inputText.trim()) {
      this.snackBar.open('Please enter some input text first', 'Close', { duration: 3000 });
      return;
    }

    this.playgroundState.isGenerating = true;
    this.playgroundState.progress = 0;

    const interval = setInterval(() => {
      this.playgroundState.progress += Math.random() * 15;
      if (this.playgroundState.progress >= 100) {
        this.playgroundState.progress = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          this.playgroundState.outputText = this.generateMockOutput();
          this.playgroundState.isGenerating = false;
        }, 500);
      }
    }, 200);
  }

  private generateMockOutput(): string {
    const prompt = this.playgroundState.selectedVersion;
    if (!prompt) return 'No prompt selected';

    const input = this.playgroundState.inputText;
    const settings = this.playgroundState.modelSettings;

    return `Generated output for "${prompt.name}" (v${prompt.version})

Model: ${settings.modelType} ${settings.modelVersion}
Temperature: ${settings.temperature}
Top P: ${settings.topP}
Frequency Penalty: ${settings.frequencyPenalty}
Presence Penalty: ${settings.presencePenalty}

Input: ${input.substring(0, 100)}${input.length > 100 ? '...' : ''}

Output: This is a simulated response based on the prompt configuration and input text. In a real implementation, this would be the actual AI-generated content based on the selected model settings and prompt template.

Generated at: ${new Date().toLocaleString()}`;
  }

  onCopyOutput() {
    navigator.clipboard.writeText(this.playgroundState.outputText).then(() => {
      this.snackBar.open('Output copied to clipboard', 'Close', { duration: 2000 });
    });
  }

  onClearOutput() {
    this.playgroundState.outputText = '';
  }

  public getWordCount(text: string): number {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }

  public getCharacterCount(text: string): number {
    return text.length;
  }

  toggleModelSettings() {
    this.playgroundState.showModelSettings = !this.playgroundState.showModelSettings;
  }

  public goBackToPrompts() {
    this.router.navigate(['/prompts']);
  }

  public onVersionSelect(event: Event) {
    const select = event.target as HTMLSelectElement;
    const versionId = select.value;
    const version = this.playgroundState.availableVersions.find(v => v.id === versionId);
    if (version) {
      this.onVersionChange(version);
    }
  }
} 