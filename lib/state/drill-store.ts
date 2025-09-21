import { createStore } from 'zustand/vanilla';
import { DotbookEntry } from '@/lib/dot/types';
import { createJSONStorage, persist } from 'zustand/middleware';

export type DrillState = {
    pages: DotbookEntry[];
    label: string;
    instrument: string;
};

export type DrillActions = {
    addPage: (data: DotbookEntry) => void;
    modifyPage: (page: number, data: Partial<DotbookEntry>) => void;
    modifyNote: (setName: string, note: string) => void;
    clearPages: () => void;
    setLabel: (label: string) => void;
    setInstrument: (instrument: string) => void;
};

export type DrillStore = DrillState & DrillActions;

export const initDrillStore = (): DrillState => {
    return {
        pages: [],
        label: '',
        instrument: '',
    };
};

export const defaultInitState: DrillState = {
    pages: [],
    label: '',
    instrument: '',
};

export const createDrillStore = (initState: DrillState = defaultInitState) => {
    return createStore<DrillStore>()(
        persist(
            (set) => ({
                ...initState,
                addPage: (data: DotbookEntry) =>
                    set((state) => ({ pages: [...state.pages, data] })),
                modifyPage: (page: number, data: Partial<DotbookEntry>) =>
                    set((state) => {
                        const newPages = [...state.pages];
                        newPages[page] = { ...newPages[page], ...data };
                        return { pages: newPages };
                    }),
                modifyNote: (setName: string, note: string) =>
                    set((state) => ({
                        pages: state.pages.map((p) =>
                            p.set === setName ? { ...p, note: note } : p,
                        ),
                    })),
                clearPages: () => set({ pages: [] }),
                setLabel: (label: string) => set({ label }),
                setInstrument: (instrument: string) => set({ instrument }),
            }),
            {
                name: 'drill-storage',
                storage: createJSONStorage(() => localStorage),
            },
        ),
    );
};
