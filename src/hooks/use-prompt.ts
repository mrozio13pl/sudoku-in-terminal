import { create } from 'zustand';

interface PromptState {
    question: string;
    setQuestion(question: string): void;
    callback?: (value: boolean) => void;
    setCallback(callback: this['callback']): void;
}

export const usePrompt = create<PromptState>(set => ({
    question: '',
    setQuestion(question) {
        set({ question });
    },
    setCallback(callback) {
        set({ callback });
    },
}));