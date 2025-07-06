import { createReducer, on } from '@ngrx/store';
import { initialUIState } from './ui.state';
import * as UIActions from './ui.actions';

export const uiReducer = createReducer(
  initialUIState,
  
  on(UIActions.toggleDarkMode, (state) => ({
    ...state,
    isDarkMode: !state.isDarkMode
  })),
  
  on(UIActions.setDarkMode, (state, { isDarkMode }) => ({
    ...state,
    isDarkMode
  })),
  
  on(UIActions.openModal, (state, { modalType }) => ({
    ...state,
    isModalOpen: true,
    modalType
  })),
  
  on(UIActions.closeModal, (state) => ({
    ...state,
    isModalOpen: false,
    modalType: null
  })),
  
  on(UIActions.toggleSidebar, (state) => ({
    ...state,
    sidebarOpen: !state.sidebarOpen
  })),
  
  on(UIActions.setSidebarOpen, (state, { open }) => ({
    ...state,
    sidebarOpen: open
  }))
); 