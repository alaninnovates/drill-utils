import { createStore } from 'zustand/vanilla';
import { DotbookEntry } from '@/lib/dot/types';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ViewData {
    hiddenSections: string[];
    plusQuantity: number;
    minusQuantity: number;
    individualOnly: boolean;
}

export type DrillState = {
    movement: number;
    pages: DotbookEntry[];
    label: string;
    instrument: string;
    views: {
        [name: string]: ViewData;
    };
    currentView: string;
};

export type DrillActions = {
    addPage: (data: DotbookEntry) => void;
    modifyPage: (page: number, data: Partial<DotbookEntry>) => void;
    modifyNote: (setName: string, note: string) => void;
    clearPages: () => void;
    setLabel: (label: string) => void;
    setInstrument: (instrument: string) => void;
    modifyView: (name: string, data: Partial<ViewData>) => void;
    modifyViewName: (oldName: string, newName: string) => void;
    setCurrentView: (name: string) => void;
    deleteView: (name: string) => void;
    addView: () => void;
    setMovement: (movement: number) => void;
};

export type DrillStore = DrillState & DrillActions;

export const initDrillStore = (): DrillState => {
    return {
        movement: 1,
        pages: [],
        label: '',
        instrument: '',
        views: {
            Default: {
                hiddenSections: [],
                plusQuantity: 1,
                minusQuantity: 1,
                individualOnly: false,
            },
        },
        currentView: 'Default',
    };
};

export const defaultInitState: DrillState = {
    movement: 1,
    pages: [],
    label: '',
    instrument: '',
    views: {
        Default: {
            hiddenSections: [],
            plusQuantity: 1,
            minusQuantity: 1,
            individualOnly: false,
        },
    },
    currentView: 'Default',
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
                modifyView: (name: string, data: Partial<ViewData>) =>
                    set((state) => ({
                        views: {
                            ...state.views,
                            [name]: {
                                ...state.views[name],
                                ...data,
                            },
                        },
                    })),
                modifyViewName: (oldName: string, newName: string) =>
                    set((state) => {
                        const newViews = { ...state.views };
                        if (newViews[oldName]) {
                            newViews[newName] = newViews[oldName];
                            delete newViews[oldName];
                        }
                        const newCurrentView =
                            state.currentView === oldName
                                ? newName
                                : state.currentView;
                        return {
                            views: newViews,
                            currentView: newCurrentView,
                        };
                    }),
                setCurrentView: (name: string) => set({ currentView: name }),
                deleteView: (name: string) =>
                    set((state) => {
                        const newViews = { ...state.views };
                        delete newViews[name];
                        return {
                            views: newViews,
                        };
                    }),
                addView: () =>
                    set((state) => {
                        let newViewName = 'New View';
                        let counter = 1;
                        while (state.views[newViewName]) {
                            newViewName = `New View ${counter}`;
                            counter++;
                        }
                        return {
                            views: {
                                ...state.views,
                                [newViewName]: {
                                    hiddenSections: [],
                                    plusQuantity: 0,
                                    minusQuantity: 2,
                                    individualOnly: false,
                                },
                            },
                        };
                    }),
                setMovement: (movement: number) => set({ movement }),
            }),
            {
                name: 'drill-storage',
                storage: createJSONStorage(() => localStorage),
            },
        ),
    );
};
