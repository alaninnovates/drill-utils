'use client';
import { redirect } from 'next/navigation';
import { InstrumentSettings } from '../settings/instrument.config';

export default function OnboardingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
            <p className="text-center mb-6">
                Please select your instrument to get started.
            </p>
            <div className="w-full max-w-md">
                <InstrumentSettings onSelect={() => redirect('/')} />
            </div>
        </div>
    );
}
