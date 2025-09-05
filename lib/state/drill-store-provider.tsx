'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
    type DrillStore,
    createDrillStore,
    initDrillStore,
} from '@/lib/state/drill-store';

export type DrillStoreApi = ReturnType<typeof createDrillStore>;

export const DrillStoreContext = createContext<DrillStoreApi | undefined>(
    undefined,
);

export interface DrillStoreProviderProps {
    children: ReactNode;
}

export const DrillStoreProvider = ({ children }: DrillStoreProviderProps) => {
    const storeRef = useRef<DrillStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createDrillStore(initDrillStore());
    }

    return (
        <DrillStoreContext.Provider value={storeRef.current}>
            {children}
        </DrillStoreContext.Provider>
    );
};

export const useDrillStore = <T,>(selector: (store: DrillStore) => T): T => {
    const drillStoreContext = useContext(DrillStoreContext);

    if (!drillStoreContext) {
        throw new Error(`useDrillStore must be used within DrillStoreProvider`);
    }

    return useStore(drillStoreContext, selector);
};
