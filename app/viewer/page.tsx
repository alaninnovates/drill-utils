'use client';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { dotToFieldCoordinate } from '@/lib/dot/parser';
import { MarchingField } from '@/lib/field/marching-field';
import { useDrillStore } from '@/lib/state/drill-store-provider';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const MAX_DOTS_DISPLAYED = 3;

export default function Page() {
    const { pages } = useDrillStore((store) => store);
    const dotsLength = pages.length;
    const [dotStep, setDotStep] = useState(0);
    const [displayDots, setDisplayDots] = useState([
        pages.length > 0 ? dotToFieldCoordinate(pages[0]) : { x: 0, y: 0 },
    ]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [intervalCache, setIntervalCache] = useState<NodeJS.Timeout | null>(
        null,
    );

    if (dotsLength === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <h1 className="text-4xl font-bold text-center">
                    No dots imported
                </h1>
                <p className="text-center">
                    Please go to the import page to add dots.
                </p>
                <Link href="/dots">
                    <Button>Go to import page</Button>
                </Link>
            </div>
        );
    }

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
                                const newDots = pages
                                    .slice(0, value[0] + 1)
                                    .map(dotToFieldCoordinate);
                                setDisplayDots(newDots);
                            }}
                            className="w-[300px]"
                        />
                        <Button
                            onClick={() => {
                                if (isPlaying) {
                                    if (intervalCache) {
                                        clearInterval(intervalCache);
                                    }
                                    setIntervalCache(null);
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
                                        const newDots = pages
                                            .slice(0, newStep + 1)
                                            .map(dotToFieldCoordinate);
                                        setDisplayDots(newDots);
                                        return newStep;
                                    });
                                }, 500);
                                setIntervalCache(interval);
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
                </div>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                    onClick={() => {
                        setDotStep((prev) => {
                            const newStep = Math.max(0, prev - 1);
                            const newDots = pages
                                .slice(0, newStep + 1)
                                .map(dotToFieldCoordinate);
                            setDisplayDots(newDots);
                            return newStep;
                        });
                    }}
                    disabled={dotStep === 0}
                >
                    <ArrowLeft />
                </Button>
                <Button
                    onClick={() => {
                        setDotStep((prev) => {
                            const newStep = Math.min(dotsLength - 1, prev + 1);
                            const newDots = pages
                                .slice(0, newStep + 1)
                                .map(dotToFieldCoordinate);
                            setDisplayDots(newDots);
                            return newStep;
                        });
                    }}
                    disabled={dotStep === dotsLength - 1}
                >
                    <ArrowRight />
                </Button>
            </div>
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <p className="text-lg text-white">
                    Set {pages[dotStep].set} ({dotStep + 1} / {dotsLength})
                </p>
            </div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <p className="text-lg text-white">
                    Side {pages[dotStep].side}:{' '}
                    {pages[dotStep].sideToSide.stepOffset}{' '}
                    {pages[dotStep].sideToSide.stepOffsetDirection}{' '}
                    {pages[dotStep].sideToSide.yardline} yd ln
                </p>
                <p className="text-lg text-white">
                    {pages[dotStep].frontToBack.stepOffset}{' '}
                    {pages[dotStep].frontToBack.stepOffsetDirection}{' '}
                    {pages[dotStep].frontToBack.line}
                </p>
                <p className="text-lg text-white">
                    Counts: {pages[dotStep].counts}
                </p>
            </div>
        </div>
    );
}
