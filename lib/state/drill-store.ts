import { createStore } from 'zustand/vanilla';
import { DotbookEntry, sampleDotbook } from '@/lib/dot/sample';

export type DrillState = {
    pages: DotbookEntry[];
};

export type DrillActions = {
    addPage: (data: DotbookEntry) => void;
    modifyPage: (page: number, data: DotbookEntry) => void;
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
    return createStore<DrillStore>()((set) => ({
        ...initState,
        addPage: (data: DotbookEntry) =>
            set((state) => ({ pages: [...state.pages, data] })),
        modifyPage: (page: number, data: DotbookEntry) =>
            set((state) => ({
                pages: state.pages.map((p, index) =>
                    index === page ? data : p,
                ),
            })),
    }));
};
