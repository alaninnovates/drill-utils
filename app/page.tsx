'use client';
import LogoutButton from '@/components/logout-button';
import { Button } from '@/components/ui/button';
import { useDrillStore } from '@/lib/state/drill-store-provider';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export default function Page() {
    const hasHydrated = useDrillStore((state) => state._hasHydrated);
    const { instrument, label, directorMode } = useDrillStore(
        useShallow((store) => ({
            instrument: store.instrument,
            label: store.label,
            directorMode: store.directorMode,
        })),
    );

    useEffect(() => {
        if (hasHydrated && !instrument && !directorMode) {
            redirect('/onboarding');
        }
    }, [hasHydrated]);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between h-screen">
            <LogoutButton />
            <div className="flex-1 flex items-center justify-center flex-col gap-4">
                <h1 className="text-4xl font-bold text-center">
                    Welcome,
                    <br />
                    {directorMode ? 'Director' : `${instrument} ${label}`}
                </h1>
                <p>Los Altos High School</p>
            </div>
            <div className="flex-1 flex flex-col h-full w-full items-center justify-center gap-4 m-8">
                <div className="flex flex-col gap-4 h-[60%] w-[90%] bg-black/10 rounded-3xl p-6 mx-4">
                    <Link href="/viewer" className="flex-1">
                        <Button className="w-full h-full rounded-2xl bg-blue-500 hover:bg-blue-400 px-24 py-8 text-xl">
                            Go to viewer <ArrowRight />
                        </Button>
                    </Link>
                    <div className="w-full flex gap-4 flex-1">
                        {/* 
                            <Link href="/dots" className="flex-1">
                                <Button className="w-full h-full rounded-2xl py-4 text-lg">
                                    Edit dots
                                </Button>
                            </Link>
                        */}
                        <Link href="/settings" className="flex-1">
                            <Button className="w-full h-full rounded-2xl py-4 text-lg">
                                Settings
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
