'use client';
import { redirect } from 'next/navigation';
import { InstrumentSettings } from '../settings/instrument.config';
import { useDrillStore } from '@/lib/state/drill-store-provider';
import { useShallow } from 'zustand/shallow';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function OnboardingPage() {
    const { directorMode, setDirectorMode } = useDrillStore(
        useShallow((store) => ({
            directorMode: store.directorMode,
            setDirectorMode: store.setDirectorMode,
        })),
    );
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
            <p className="text-center mb-6">
                Please select your instrument to get started.
            </p>
            <div className="flex items-center gap-2">
                <Label htmlFor="director-mode" className="font-bold">
                    I'm a director
                </Label>
                <Checkbox
                    id="director-mode"
                    checked={directorMode}
                    onCheckedChange={(checked) => {
                        setDirectorMode(!!checked);
                        redirect('/');
                    }}
                />
            </div>
            <div className="w-full max-w-md">
                <InstrumentSettings onSelect={() => redirect('/')} />
            </div>
        </div>
    );
}
