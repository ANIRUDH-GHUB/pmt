import { createAction, props } from '@ngrx/store';

export const toggleDarkMode = createAction('[UI] Toggle Dark Mode');

export const setDarkMode = createAction(
  '[UI] Set Dark Mode',
  props<{ isDarkMode: boolean }>()
);

export const openModal = createAction(
  '[UI] Open Modal',
  props<{ modalType: 'create' | 'edit' }>()
);

export const closeModal = createAction('[UI] Close Modal');

export const toggleSidebar = createAction('[UI] Toggle Sidebar');

export const setSidebarOpen = createAction(
  '[UI] Set Sidebar Open',
  props<{ open: boolean }>()
); 