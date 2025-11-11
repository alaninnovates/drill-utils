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
    _hasHydrated: boolean;
    label: string;
    instrument: string;
    notes: {
        [setName: string]: string;
    };
    views: {
        [name: string]: ViewData;
    };
    currentView: string;
    directorMode: boolean;
};

export type DrillActions = {
    modifyNote: (setName: string, note: string) => void;
    setLabel: (label: string) => void;
    setInstrument: (instrument: string) => void;
    modifyView: (name: string, data: Partial<ViewData>) => void;
    modifyViewName: (oldName: string, newName: string) => void;
    setCurrentView: (name: string) => void;
    deleteView: (name: string) => void;
    addView: () => void;
    setDirectorMode: (state: boolean) => void;
    setHasHydrated: (state: boolean) => void;
};

export type DrillStore = DrillState & DrillActions;

export const initDrillStore = (): DrillState => {
    return {
        _hasHydrated: false,
        label: '',
        instrument: '',
        notes: {},
        views: {
            Default: {
                hiddenSections: [],
                plusQuantity: 1,
                minusQuantity: 1,
                individualOnly: false,
            },
        },
        currentView: 'Default',
        directorMode: false,
    };
};

export const defaultInitState: DrillState = {
    _hasHydrated: false,
    label: '',
    instrument: '',
    notes: {},
    views: {
        Default: {
            hiddenSections: [],
            plusQuantity: 1,
            minusQuantity: 1,
            individualOnly: false,
        },
    },
    currentView: 'Default',
    directorMode: false,
};

export const createDrillStore = (initState: DrillState = defaultInitState) => {
    return createStore<DrillStore>()(
        persist(
            (set) => ({
                ...initState,
                modifyNote: (setName: string, note: string) =>
                    set((state) => ({
                        notes: {
                            ...state.notes,
                            [setName]: note,
                        },
                    })),
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
                setDirectorMode: (stateDir: boolean) =>
                    set({ directorMode: stateDir }),
                _hasHydrated: false,
                setHasHydrated: (state) => {
                    set({
                        _hasHydrated: state,
                    });
                },
            }),
            {
                name: 'drill-storage',
                storage: createJSONStorage(() => localStorage),
                version: 2,
                migrate: (state, version) => {
                    console.log('migrating', version, state);
                    if (version === 1) {
                        return defaultInitState;
                    }
                    return state;
                },
                onRehydrateStorage: (state) => {
                    return () => state.setHasHydrated(true);
                },
            },
        ),
    );
};
