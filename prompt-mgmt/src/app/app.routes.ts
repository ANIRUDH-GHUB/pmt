import { Routes } from '@angular/router';
import { PromptsComponent } from './prompts/prompts.component';
import { PlaygroundComponent } from './playground/playground.component';

export const routes: Routes = [
  { path: '', redirectTo: '/prompts', pathMatch: 'full' },
  { path: 'prompts', component: PromptsComponent },
  { path: 'playground/:promptId', component: PlaygroundComponent }
];
