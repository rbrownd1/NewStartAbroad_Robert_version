import { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
  persona: 'student' | 'professional' | null;
  originCity: string;
  city: string;
  visaType: string;
  arrivalMonth: string;
  arrivalYear: string;
  hasAccommodation: boolean;
  budget: 'low' | 'medium' | 'high';
  completedTasks: string[];
}

const defaultState: AppState = {
  persona: null,
  originCity: '',
  city: '',
  visaType: '',
  arrivalMonth: '',
  arrivalYear: '',
  hasAccommodation: false,
  budget: 'medium',
  completedTasks: [],
};

interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  toggleTask: (taskId: string) => void;
}

const AppContext = createContext<AppContextType>({
  state: defaultState,
  setState: () => {},
  toggleTask: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(defaultState);

  const toggleTask = (taskId: string) => {
    setState(prev => ({
      ...prev,
      completedTasks: prev.completedTasks.includes(taskId)
        ? prev.completedTasks.filter(id => id !== taskId)
        : [...prev.completedTasks, taskId],
    }));
  };

  return (
    <AppContext.Provider value={{ state, setState, toggleTask }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);