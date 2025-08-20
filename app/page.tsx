'use client';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { dotToFieldCoordinate } from '@/lib/dot/parser';
import { sampleDotbook } from '@/lib/dot/sample';
import { MarchingField } from '@/lib/field/marching-field';
import { Pause, Play } from 'lucide-react';
import { useState } from 'react';

const MAX_DOTS_DISPLAYED = 3;

export default function Page() {
    const dotsLength = sampleDotbook.length;
    const [dotStep, setDotStep] = useState(0);
    const [displayDots, setDisplayDots] = useState([
        dotToFieldCoordinate(sampleDotbook[0]),
    ]);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div style={{ height: '100vh' }}>
            <MarchingField
                dots={displayDots.slice(
                    displayDots.length - MAX_DOTS_DISPLAYED,
                )}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-lg p-4 z-10">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Slider
                            defaultValue={[0]}
                            max={dotsLength - 1}
                            step={1}
                            value={[dotStep]}
                            onValueChange={(value) => {
                                setDotStep(value[0]);
                                const newDots = sampleDotbook
                                    .slice(0, value[0] + 1)
                                    .map(dotToFieldCoordinate);
                                setDisplayDots(newDots);
                            }}
                            className="w-[300px]"
                        />
                        <Button
                            onClick={() => {
                                if (isPlaying) {
                                    setIsPlaying(false);
                                    return;
                                }
                                setIsPlaying(true);
                                const interval = setInterval(() => {
                                    setDotStep((prev) => {
                                        if (prev >= dotsLength - 1) {
                                            clearInterval(interval);
                                            setIsPlaying(false);
                                            return prev;
                                        }
                                        const newStep = prev + 1;
                                        const newDots = sampleDotbook
                                            .slice(0, newStep + 1)
                                            .map(dotToFieldCoordinate);
                                        setDisplayDots(newDots);
                                        return newStep;
                                    });
                                }, 500);
                            }}
                            className="text-white px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPlaying ? (
                                <Pause className="h-4 w-4" />
                            ) : (
                                <Play className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                    <p className="text-center text-sm text-white">
                        Page: {dotStep + 1} / {dotsLength}
                    </p>
                </div>
            </div>
        </div>
    );
}
