import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { promptReducer } from './store/prompt/prompt.reducer';
import { filterReducer } from './store/filter/filter.reducer';
import { uiReducer } from './store/ui/ui.reducer';
import { PromptEffects } from './store/prompt/prompt.effects';

// Import all components
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlaygroundComponent } from './playground/playground.component';
import { PromptsComponent } from './prompts/prompts.component';
import { HeaderComponent } from './ui/header/header.component';
import { CreatePromptFormComponent } from './ui/create-prompt-form/create-prompt-form.component';
import { CreatePromptModalComponent } from './ui/create-prompt-modal/create-prompt-modal.component';
import { FilterBarComponent } from './ui/filter-bar/filter-bar.component';
import { PromptCardComponent } from './ui/prompt-card/prompt-card.component';
import { PromptGridComponent } from './ui/prompt-grid/prompt-grid.component';
import { MetricsCardComponent } from './ui/metrics-card/metrics-card.component';
import { PrimaryBtnComponent } from './ui/primary-btn/primary-btn.component';
import { OutlineBtnComponent } from './ui/outline-btn/outline-btn.component';
import { InputFieldComponent } from './ui/input-field/input-field.component';
import { DropdownComponent } from './ui/dropdown/dropdown.component';
import { ModalComponent } from './ui/modal/modal.component';
import { TabSectionComponent } from './ui/tab-section/tab-section.component';
import { VariablePanelComponent } from './ui/variable-panel/variable-panel.component';
import { SliderInputComponent } from './ui/slider-input/slider-input.component';
import { SidenavItemComponent } from './ui/sidenav-item/sidenav-item.component';
import { ShellComponent } from './ui/shell/shell.component';
import { ComponentsDemoComponent } from './ui/components-demo/components-demo.component';
import { FileUploadComponent } from './ui/file-upload/file-upload.component';
import { FileUploadDemoComponent } from './ui/file-upload/file-upload-demo.component';

// Material modules
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const storeConfig = {
  prompt: promptReducer,
  filter: filterReducer,
  ui: uiReducer
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlaygroundComponent,
    PromptsComponent,
    HeaderComponent,
    CreatePromptFormComponent,
    CreatePromptModalComponent,
    FilterBarComponent,
    PromptCardComponent,
    PromptGridComponent,
    MetricsCardComponent,
    PrimaryBtnComponent,
    OutlineBtnComponent,
    InputFieldComponent,
    DropdownComponent,
    ModalComponent,
    TabSectionComponent,
    VariablePanelComponent,
    SliderInputComponent,
    SidenavItemComponent,
    ShellComponent,
    ComponentsDemoComponent,
    FileUploadComponent,
    FileUploadDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(storeConfig),
    EffectsModule.forRoot([PromptEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    }),
    // Material modules
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
    MatBadgeModule,
    MatSnackBarModule,
    NgApexchartsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 