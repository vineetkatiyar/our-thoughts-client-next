import { CreateStoryRequest } from '@/types/stroyType';
import { create } from 'zustand';

interface StoryState {
  draftStories: Partial<CreateStoryRequest>[];
  currentDraft: Partial<CreateStoryRequest> | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentDraft: (draft: Partial<CreateStoryRequest>) => void;
  updateCurrentDraft: (updates: Partial<CreateStoryRequest>) => void;
  saveDraft: (draft: Partial<CreateStoryRequest>) => void;
  clearCurrentDraft: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStoryStore = create<StoryState>((set, get) => ({
  draftStories: [],
  currentDraft: null,
  isLoading: false,
  error: null,

  setCurrentDraft: (draft) => set({ currentDraft: draft }),
  
  updateCurrentDraft: (updates) => set((state) => ({
    currentDraft: { ...state.currentDraft, ...updates }
  })),
  
  saveDraft: (draft) => set((state) => ({
    draftStories: [...state.draftStories.filter(d => 
      d.title !== draft.title
    ), draft]
  })),
  
  clearCurrentDraft: () => set({ currentDraft: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));