export interface UIState {
  isDarkMode: boolean;
  isModalOpen: boolean;
  modalType: 'create' | 'edit' | null;
  sidebarOpen: boolean;
}

export const initialUIState: UIState = {
  isDarkMode: false,
  isModalOpen: false,
  modalType: null,
  sidebarOpen: false
}; 