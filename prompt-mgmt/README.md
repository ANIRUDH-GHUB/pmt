# Prompt Management Tool

A modern, efficient prompt management application built with Angular 16, NgRx, Angular Material, and Tailwind CSS. This application provides a comprehensive interface for creating, managing, and organizing AI prompts with advanced filtering and version control capabilities.

## Features

### Core Functionality
- **Prompt Management**: Create, edit, publish, and delete prompts
- **Version Control**: Manage multiple versions of prompts with automatic versioning
- **Advanced Filtering**: Search, filter by category, and show user-specific prompts
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Modern UI that works across all device sizes

### Technical Features
- **NgRx State Management**: Centralized state management with actions, reducers, and effects
- **Entity Management**: Efficient prompt data handling with NgRx Entity
- **Async Operations**: Handle API calls and side effects with NgRx Effects
- **Type Safety**: Full TypeScript support with strict typing
- **Performance Optimization**: Memoized selectors and efficient change detection

## Architecture

### Store Structure

The application uses NgRx for state management with three main feature slices:

#### 1. Prompt State (`prompts`)
```typescript
interface PromptState extends EntityState<PromptModel> {
  loading: boolean;
  error: string | null;
  selectedPromptId: string | null;
  editingPrompt: PromptModel | null;
  isEditMode: boolean;
}
```

**Actions:**
- `loadPrompts` - Load all prompts
- `createPrompt` - Create new prompt
- `updatePrompt` - Update existing prompt
- `publishPrompt` - Publish prompt
- `deletePrompt` - Delete prompt
- `selectPrompt` - Select prompt for editing
- `setEditMode` - Toggle edit mode

#### 2. Filter State (`filters`)
```typescript
interface FilterState {
  searchQuery: string;
  currentFilter: string;
  showMyPrompts: boolean;
  selectedUseCase: string | null;
  selectedSubUseCase: string | null;
}
```

**Actions:**
- `updateSearchQuery` - Update search term
- `updateCurrentFilter` - Change category filter
- `toggleMyPrompts` - Toggle user-specific filter
- `selectUseCase` - Select use case filter
- `clearFilters` - Reset all filters

#### 3. UI State (`ui`)
```typescript
interface UIState {
  isDarkMode: boolean;
  isModalOpen: boolean;
  modalType: 'create' | 'edit' | null;
  sidebarOpen: boolean;
}
```

**Actions:**
- `toggleDarkMode` - Toggle theme
- `openModal` - Open modal with type
- `closeModal` - Close modal
- `toggleSidebar` - Toggle sidebar

### Key Components

#### Store Structure
```
src/app/store/
├── index.ts                 # Main store configuration
├── prompt/
│   ├── prompt.actions.ts    # Prompt-related actions
│   ├── prompt.reducer.ts    # Prompt state reducer
│   ├── prompt.selectors.ts  # Prompt selectors
│   ├── prompt.state.ts      # Prompt state interface
│   └── prompt.effects.ts    # Prompt side effects
├── filter/
│   ├── filter.actions.ts    # Filter actions
│   ├── filter.reducer.ts    # Filter reducer
│   ├── filter.selectors.ts  # Filter selectors
│   └── filter.state.ts      # Filter state interface
└── ui/
    ├── ui.actions.ts        # UI actions
    ├── ui.reducer.ts        # UI reducer
    ├── ui.selectors.ts      # UI selectors
    └── ui.state.ts          # UI state interface
```

#### Services
- **PromptService**: Handles all prompt-related API operations
- **Effects**: Manage async operations and side effects

## Performance Optimizations

### 1. Memoized Selectors
All selectors use `createSelector` for memoization, preventing unnecessary recalculations:

```typescript
export const selectFilteredPromptsWithSearch = createSelector(
  selectFilteredPrompts,
  (state: any) => state.filters,
  (prompts, filters) => {
    // Complex filtering logic only runs when inputs change
  }
);
```

### 2. Entity Management
Using NgRx Entity for efficient prompt data management:
- Automatic CRUD operations
- Optimized updates and deletions
- Built-in sorting and filtering

### 3. Async Pipe Usage
Components use async pipe for automatic subscription management:
```html
<app-prompt-grid [prompts]="filteredPrompts$ | async"></app-prompt-grid>
```

### 4. OnPush Change Detection
Components use OnPush change detection strategy for better performance.

## State Management Benefits

### 1. Predictable State Updates
- All state changes go through actions and reducers
- Clear data flow from actions → reducers → selectors → components
- Easy to debug with Redux DevTools

### 2. Centralized Data Management
- Single source of truth for all application state
- Consistent data access patterns
- Reduced prop drilling

### 3. Efficient Updates
- Memoized selectors prevent unnecessary recalculations
- Entity management optimizes data operations
- Automatic change detection optimization

### 4. Scalable Architecture
- Feature-based store organization
- Easy to add new features and state slices
- Modular and maintainable code structure

## Usage Examples

### Dispatching Actions
```typescript
// Create a new prompt
this.store.dispatch(PromptActions.createPrompt({ formData }));

// Toggle dark mode
this.store.dispatch(UIActions.toggleDarkMode());

// Update search query
this.store.dispatch(FilterActions.updateSearchQuery({ query: 'search term' }));
```

### Using Selectors
```typescript
// In component
this.filteredPrompts$ = this.store.select(PromptSelectors.selectFilteredPromptsWithSearch);
this.isDarkMode$ = this.store.select(UISelectors.selectIsDarkMode);
```

### Template Usage
```html
<app-prompt-grid [prompts]="filteredPrompts$ | async"></app-prompt-grid>
<div *ngIf="isDarkMode$ | async">Dark mode content</div>
```

## Development

### Prerequisites
- Node.js 18+
- Angular CLI 16+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
ng serve
```

### Build
```bash
ng build
```

### Testing
```bash
ng test
```

## Dependencies

### Core Dependencies
- **Angular**: 16.x
- **NgRx**: Store, Effects, Entity, DevTools
- **Angular Material**: UI components
- **Tailwind CSS**: Utility-first CSS framework

### Key NgRx Packages
- `@ngrx/store`: Core state management
- `@ngrx/effects`: Side effect management
- `@ngrx/entity`: Entity state management
- `@ngrx/store-devtools`: Development tools

## Best Practices Implemented

1. **Action Naming**: Consistent action naming with feature prefixes
2. **Selector Memoization**: All selectors use `createSelector` for performance
3. **Effect Organization**: Side effects are organized by feature
4. **Type Safety**: Full TypeScript support with strict typing
5. **Error Handling**: Comprehensive error handling in effects and reducers
6. **Loading States**: Proper loading state management
7. **Entity Management**: Efficient data operations with NgRx Entity

## Future Enhancements

1. **Authentication**: Add user authentication and authorization
2. **Real-time Updates**: Implement WebSocket connections for live updates
3. **Offline Support**: Add service worker for offline functionality
4. **Advanced Filtering**: Add more sophisticated filtering options
5. **Analytics**: Add usage analytics and metrics
6. **Export/Import**: Add prompt export and import functionality

## Contributing

1. Follow the established NgRx patterns
2. Use TypeScript strict mode
3. Write unit tests for actions, reducers, and selectors
4. Follow Angular style guide
5. Use conventional commits

## License

MIT License - see LICENSE file for details.
