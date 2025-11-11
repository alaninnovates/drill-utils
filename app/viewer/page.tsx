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
import { useMemo, useState, useRef, useCallback } from 'react';
import { NotesDialog } from './notes.dialog';
import { AllSetsDialog } from './all-sets.dialog';
import { tempoMap } from '@/lib/dot/tempos';
import { dotData2025 } from '@/lib/dot/data';

export default function Page() {
    const label = useDrillStore((store) => store.label);
    const pages = dotData2025[label].dots;
    const dotsLength = pages.length;
    const [dotStep, setDotStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [animationProgress, setAnimationProgress] = useState(0);
    const animationFrameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const currentAnimationStepRef = useRef(dotStep);

    useMemo(() => {
        currentAnimationStepRef.current = dotStep;
    }, [dotStep]);

    const animate = useCallback(
        (timestamp: number) => {
            if (startTimeRef.current === null) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;

            const currentDot = pages[currentAnimationStepRef.current];
            const tempo = tempoMap[currentDot.movement][currentDot.set];
            const durationPerCount = 60000 / tempo;
            const totalDuration =
                currentAnimationStepRef.current < dotsLength - 1
                    ? pages[currentAnimationStepRef.current + 1].counts *
                      durationPerCount
                    : 0;

            if (totalDuration > 0) {
                const progress = Math.min(elapsed / totalDuration, 1);
                setAnimationProgress(progress);

                if (progress >= 1) {
                    const nextStep = currentAnimationStepRef.current + 1;
                    if (nextStep >= dotsLength) {
                        setIsPlaying(false);
                        setAnimationProgress(0);
                        animationFrameRef.current = null;
                        startTimeRef.current = null;
                        return;
                    }
                    setDotStep(nextStep);
                    setAnimationProgress(0);
                    startTimeRef.current = null;
                }
            } else {
                const nextStep = currentAnimationStepRef.current + 1;
                if (nextStep >= dotsLength) {
                    setIsPlaying(false);
                    setAnimationProgress(0);
                    animationFrameRef.current = null;
                    startTimeRef.current = null;
                    return;
                }
                setDotStep(nextStep);
                setAnimationProgress(0);
                startTimeRef.current = null;
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        },
        [isPlaying, dotsLength, pages],
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
            <MarchingField
                currentIndex={dotStep}
                animationProgress={animationProgress}
            />
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
                    Movement {pages[dotStep].movement}
                    <br />
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
                <AllSetsDialog
                    trigger={
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
                                {isHold ? 'Hold' : 'Move'}:{' '}
                                {pages[dotStep].counts}
                            </p>
                        </div>
                    }
                    currentIndex={dotStep}
                    onSetSelect={(index) => {
                        setDotStep(index);
                    }}
                />
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
                <Button
                    onClick={() => {
                        if (isPlaying) {
                            if (animationFrameRef.current) {
                                cancelAnimationFrame(animationFrameRef.current);
                                animationFrameRef.current = null;
                            }
                            setIsPlaying(false);
                            setAnimationProgress(0);
                            startTimeRef.current = null;
                            return;
                        }
                        setIsPlaying(true);
                        animationFrameRef.current =
                            requestAnimationFrame(animate);
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
