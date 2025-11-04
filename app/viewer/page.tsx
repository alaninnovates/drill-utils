'use client';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
    calculateMidset,
    calculateStepSize,
    dotCoordinatesEqual,
    dotToFieldCoordinate,
    fieldCoordinateToDot,
} from '@/lib/dot/parser';
import { MarchingField } from '@/lib/field/marching-field';
import { useDrillStore } from '@/lib/state/drill-store-provider';
import { ArrowLeft, ArrowRight, NotebookPen, Pause, Play } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { NotesDialog } from './notes.dialog';

export default function Page() {
    const pages = useDrillStore((store) => store.pages);
    const dotsLength = pages.length;
    const [dotStep, setDotStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [intervalCache, setIntervalCache] = useState<NodeJS.Timeout | null>(
        null,
    );

    const isHold = useMemo(() => {
        if (dotsLength === 0) return false;
        if (dotStep === 0) return false;
        const currentDot = pages[dotStep];
        const previousDot = pages[dotStep - 1];
        return (
            currentDot.sideToSide.stepOffset ===
                previousDot.sideToSide.stepOffset &&
            currentDot.sideToSide.stepOffsetDirection ===
                previousDot.sideToSide.stepOffsetDirection &&
            currentDot.sideToSide.yardline ===
                previousDot.sideToSide.yardline &&
            currentDot.frontToBack.stepOffset ===
                previousDot.frontToBack.stepOffset &&
            currentDot.frontToBack.stepOffsetDirection ===
                previousDot.frontToBack.stepOffsetDirection &&
            currentDot.frontToBack.line === previousDot.frontToBack.line
        );
    }, [dotStep, pages, dotsLength]);

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

    const midset =
        dotStep > 0 && !dotCoordinatesEqual(pages[dotStep - 1], pages[dotStep])
            ? fieldCoordinateToDot(
                  calculateMidset(
                      dotToFieldCoordinate(pages[dotStep - 1]),
                      dotToFieldCoordinate(pages[dotStep]),
                  ),
              )
            : null;

    const stepSize =
        dotStep > 0 && !dotCoordinatesEqual(pages[dotStep - 1], pages[dotStep])
            ? calculateStepSize(
                  pages[dotStep - 1],
                  pages[dotStep],
                  pages[dotStep].counts,
              )
            : null;

    return (
        <div style={{ height: '100vh' }}>
            <MarchingField currentIndex={dotStep} />
            <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                    onClick={() => {
                        setDotStep((prev) => {
                            return Math.max(0, prev - 1);
                        });
                    }}
                    disabled={dotStep === 0}
                    className="bg-blue-600 disabled:opacity-50"
                >
                    <ArrowLeft />
                </Button>
                <Button
                    onClick={() => {
                        setDotStep((prev) => {
                            return Math.min(dotsLength - 1, prev + 1);
                        });
                    }}
                    disabled={dotStep === dotsLength - 1}
                    className="bg-blue-600 disabled:opacity-50"
                >
                    <ArrowRight />
                </Button>
            </div>
            <div className="absolute top-0 left-0 px-safe dark:bg-white/20 bg-black/60 backdrop-blur-sm p-2 px-4 flex gap-2 w-full justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <Button>
                            <ArrowLeft />
                            Home
                        </Button>
                    </Link>
                </div>
                <p className="text-md md:text-lg text-white mr-2">
                    Set {pages[dotStep].set}
                </p>
                <div>
                    <p className="text-sm md:text-base text-white">Step Size</p>
                    {stepSize !== null ? (
                        <p className="text-sm md:text-base text-white">
                            {stepSize} to 5
                        </p>
                    ) : (
                        <p className="text-sm md:text-base text-white">-</p>
                    )}
                </div>
                <div>
                    <p className="text-sm md:text-base text-white">Midset</p>
                    {midset !== null ? (
                        <>
                            <p className="text-sm md:text-base text-white">
                                Side {midset.side}:{' '}
                                {midset.sideToSide.stepOffset}{' '}
                                {midset.sideToSide.stepOffsetDirection}{' '}
                                {midset.sideToSide.yardline} yd ln
                            </p>
                            <p className="text-sm md:text-base text-white">
                                {midset.frontToBack.stepOffset}{' '}
                                {midset.frontToBack.stepOffsetDirection}{' '}
                                {midset.frontToBack.line}
                            </p>
                        </>
                    ) : (
                        <p className="text-sm md:text-base text-white">-</p>
                    )}
                </div>
                <div>
                    <p className="text-sm md:text-base text-white">
                        Side {pages[dotStep].side}:{' '}
                        {pages[dotStep].sideToSide.stepOffset}{' '}
                        {pages[dotStep].sideToSide.stepOffsetDirection}{' '}
                        {pages[dotStep].sideToSide.yardline} yd ln
                    </p>
                    <p className="text-sm md:text-base text-white">
                        {pages[dotStep].frontToBack.stepOffset}{' '}
                        {pages[dotStep].frontToBack.stepOffsetDirection}{' '}
                        {pages[dotStep].frontToBack.line}
                    </p>
                    <p className="text-sm md:text-base text-white">
                        {isHold ? 'Hold' : 'Move'}: {pages[dotStep].counts}
                    </p>
                </div>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-2 bg-white/20 backdrop-blur-sm p-2 rounded-md">
                <NotesDialog
                    trigger={
                        <Button>
                            <NotebookPen className="h-4 w-4" />
                        </Button>
                    }
                    setName={pages[dotStep].set}
                />
                {/* <AllSetsDialog
                    trigger={
                        <Button>
                            <RectangleEllipsis className="h-4 w-4" />
                        </Button>
                    }
                    currentIndex={dotStep}
                    onSetSelect={(index) => {
                        setDotStep(index);
                    }}
                />
                <ViewsDialog
                    trigger={
                        <Button>
                            <Eye className="h-4 w-4" />
                        </Button>
                    }
                /> */}
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
                                return newStep;
                            });
                        }, 500);
                        setIntervalCache(interval);
                    }}
                    className="text-white rounded"
                >
                    {isPlaying ? <Pause /> : <Play />}
                </Button>
            </div>
            <div className="absolute top-1/2 left-4 mx-safe transform -translate-y-1/2 flex flex-col items-center gap-2 bg-white/20 backdrop-blur-sm p-2 rounded-md">
                <Slider
                    orientation="vertical"
                    defaultValue={[0]}
                    max={dotsLength - 1}
                    step={1}
                    value={[dotStep]}
                    onValueChange={(value) => {
                        setDotStep(value[0]);
                    }}
                    className="h-28"
                />
            </div>
        </div>
    );
}
