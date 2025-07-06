import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState } from './ui.state';

export const selectUIState = createFeatureSelector<UIState>('ui');

export const selectIsDarkMode = createSelector(
  selectUIState,
  (state) => state.isDarkMode
);

export const selectIsModalOpen = createSelector(
  selectUIState,
  (state) => state.isModalOpen
);

export const selectModalType = createSelector(
  selectUIState,
  (state) => state.modalType
);

export const selectSidebarOpen = createSelector(
  selectUIState,
  (state) => state.sidebarOpen
);

// Combined UI selector
export const selectUIStateAll = createSelector(
  selectIsDarkMode,
  selectIsModalOpen,
  selectModalType,
  selectSidebarOpen,
  (isDarkMode, isModalOpen, modalType, sidebarOpen) => ({
    isDarkMode,
    isModalOpen,
    modalType,
    sidebarOpen
  })
); 