import { Button } from '@/components/ui/button';
import { instrumentToColor } from '@/lib/dot/color';
import { dotData2025 } from '@/lib/dot/data';
import { useDrillStore } from '@/lib/state/drill-store-provider';
import { useShallow } from 'zustand/shallow';

export const InstrumentSettings = () => {
    const addPage = useDrillStore((store) => store.addPage);
    const clearPages = useDrillStore((store) => store.clearPages);
    const { setLabel, setInstrument } = useDrillStore(
        useShallow((store) => ({
            setLabel: store.setLabel,
            setInstrument: store.setInstrument,
        })),
    );

    return (
        <div>
            <div>
                <h2 className="text-lg font-bold">Select Instrument</h2>
                <p className="text-sm text-gray-600">
                    Select the instrument you want to use for this drill.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 max-h-64 overflow-y-auto">
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
