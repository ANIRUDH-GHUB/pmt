import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import * as UISelectors from './store/ui/ui.selectors';
import * as UIActions from './store/ui/ui.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private store = inject(Store);
  private overlayContainer = inject(OverlayContainer);

  title = 'prompt-mgmt';
  isDarkMode$: Observable<boolean>;

  constructor() {
    this.isDarkMode$ = this.store.select(UISelectors.selectIsDarkMode);
    
    // Subscribe to theme changes
    this.isDarkMode$.subscribe(isDarkMode => {
      this.updateTheme(isDarkMode);
    });
  }

  ngOnInit() {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const isDarkMode = savedTheme === 'dark';
      this.store.dispatch(UIActions.setDarkMode({ isDarkMode }));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.store.dispatch(UIActions.setDarkMode({ isDarkMode: prefersDark }));
    }
  }

  private updateTheme(isDarkMode: boolean) {
    // Update document class for Tailwind dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Update Material overlay container theme
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(isDarkMode ? 'dark-theme' : 'light-theme');

    // Save to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }
}
