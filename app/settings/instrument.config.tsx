import { Button } from '@/components/ui/button';
import { instrumentToColor } from '@/lib/dot/color';
import { dotData2025 } from '@/lib/dot/data';
import { useDrillStore } from '@/lib/state/drill-store-provider';
import { useShallow } from 'zustand/shallow';

export const InstrumentSettings = () => {
    const addPage = useDrillStore((store) => store.addPage);
    const clearPages = useDrillStore((store) => store.clearPages);
    const { setLabel, setInstrument, instrument, label } = useDrillStore(
        useShallow((store) => ({
            instrument: store.instrument,
            label: store.label,
            setLabel: store.setLabel,
            setInstrument: store.setInstrument,
        })),
    );

    return (
        <div className="p-4 h-full">
            <div>
                <h2 className="text-lg font-bold">Select Instrument</h2>
                <p className="text-sm text-gray-600">
                    Selected instrument: {instrument || 'None'} {label}
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[60vh] mt-4">
                {Object.values(dotData2025)
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .map(({ performer, label }) => (
                        <Button
                            key={label}
                            onClick={() => {
                                clearPages();
                                dotData2025[label].dots.forEach((dot) =>
                                    addPage(dot),
                                );
                                setLabel(dotData2025[label].label);
                                setInstrument(dotData2025[label].performer);
                            }}
                            style={{
                                backgroundColor: instrumentToColor(performer),
                            }}
                        >
                            {performer} {label}
                        </Button>
                    ))}
            </div>
        </div>
    );
};
