import { createStore } from 'zustand/vanilla';
import { DotbookEntry } from '@/lib/dot/sample';
import { createJSONStorage, persist } from 'zustand/middleware';

export type DrillState = {
    pages: DotbookEntry[];
};

export type DrillActions = {
    addPage: (data: DotbookEntry) => void;
    modifyPage: (page: number, data: Partial<DotbookEntry>) => void;
    clearPages: () => void;
};

export type DrillStore = DrillState & DrillActions;

export const initDrillStore = (): DrillState => {
    return {
        pages: [],
    };
};

export const defaultInitState: DrillState = {
    pages: [],
};

export const createDrillStore = (initState: DrillState = defaultInitState) => {
    return createStore<DrillStore>()(
        persist(
            (set) => ({
                ...initState,
                addPage: (data: DotbookEntry) =>
                    set((state) => ({ pages: [...state.pages, data] })),
                modifyPage: (page: number, data: Partial<DotbookEntry>) =>
                    set((state) => ({
                        pages: state.pages.map((p, index) =>
                            index === page ? { ...p, ...data } : p,
                        ),
                    })),
                clearPages: () => set({ pages: [] }),
            }),
            {
                name: 'drill-storage',
                storage: createJSONStorage(() => localStorage),
            },
        ),
    );
};
