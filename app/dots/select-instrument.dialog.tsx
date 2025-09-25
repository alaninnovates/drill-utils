import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { instrumentToColor } from '@/lib/dot/color';
import { dotData2025, dotData2025MV2 } from '@/lib/dot/data';

const SelectListYear = ({
    data,
    onSelect,
    movement,
}: {
    data: typeof dotData2025 | typeof dotData2025MV2;
    onSelect: (
        data: typeof dotData2025 | typeof dotData2025MV2,
        instrument: string,
        movement: number,
    ) => void;
    movement: number;
}) => {
    return (
        <div className="grid grid-cols-2 gap-4 mt-4 max-h-64 overflow-y-auto">
            {Object.values(data)
                .sort((a, b) => a.label.localeCompare(b.label))
                .map(({ id, performer, label }) => (
                    <DialogClose asChild key={id}>
                        <Button
                            onClick={() => onSelect(data, label, movement)}
                            style={{
                                backgroundColor: instrumentToColor(performer),
                            }}
                        >
                            {performer} {label}
                        </Button>
                    </DialogClose>
                ))}
        </div>
    );
};

export const SelectInstrumentDialog = ({
    trigger,
    onSelect,
}: {
    trigger: React.ReactNode;
    onSelect: (
        data: typeof dotData2025 | typeof dotData2025MV2,
        instrument: string,
        movement: number,
    ) => void;
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Instrument</DialogTitle>
                    <DialogDescription>
                        Select the instrument you want to use for this drill.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="mv1">
                    <TabsList>
                        <TabsTrigger value="mv1">Movement 1</TabsTrigger>
                        <TabsTrigger value="mv2">Movement 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="mv1">
                        <SelectListYear
                            data={dotData2025}
                            onSelect={onSelect}
                            movement={1}
                        />
                    </TabsContent>
                    <TabsContent value="mv2">
                        <SelectListYear
                            data={dotData2025MV2}
                            onSelect={onSelect}
                            movement={2}
                        />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
