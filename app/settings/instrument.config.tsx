import { Button } from '@/components/ui/button';
import { instrumentToColor } from '@/lib/dot/color';
import { dotData2025 } from '@/lib/dot/data';
import { useDrillStore } from '@/lib/state/drill-store-provider';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Label } from '@radix-ui/react-label';
import { useShallow } from 'zustand/shallow';

export const InstrumentSettings = ({ onSelect = () => {} }) => {
    const {
        setLabel,
        setInstrument,
        instrument,
        label,
        directorMode,
        setDirectorMode,
    } = useDrillStore(
        useShallow((store) => ({
            instrument: store.instrument,
            label: store.label,
            setLabel: store.setLabel,
            setInstrument: store.setInstrument,
            directorMode: store.directorMode,
            setDirectorMode: store.setDirectorMode,
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
            <div className="flex items-center gap-2 w-full">
                <Checkbox
                    id="director-mode"
                    checked={directorMode}
                    onCheckedChange={(checked) => {
                        setDirectorMode(!!checked);
                        setLabel('');
                        setInstrument('');
                        onSelect();
                    }}
                />
                <Label htmlFor="director-mode" className="font-bold">
                    I'm a director
                </Label>
            </div>
            <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[60vh] mt-4">
                {Object.values(dotData2025)
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .map(({ performer, label }) => (
                        <Button
                            key={label}
                            onClick={() => {
                                setLabel(dotData2025[label].label);
                                setInstrument(dotData2025[label].performer);
                                setDirectorMode(false);
                                onSelect();
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
