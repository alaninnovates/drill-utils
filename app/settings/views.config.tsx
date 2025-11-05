import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sections } from '@/lib/dot/sections';
import { useDrillStore } from '@/lib/state/drill-store-provider';
import { cn } from '@/lib/utils';
import { ArrowLeft, Eye, EyeClosed, Pencil, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

const ViewList = ({
    setCurrentModifyingView,
}: {
    setCurrentModifyingView: (viewName: string) => void;
}) => {
    const { views, currentView, setCurrentView, deleteView } = useDrillStore(
        useShallow((store) => ({
            views: store.views,
            currentView: store.currentView,
            setCurrentView: store.setCurrentView,
            deleteView: store.deleteView,
        })),
    );

    return (
        <div className="flex flex-col gap-4 mt-4">
            {Object.keys(views).map((name) => (
                <div
                    key={name}
                    className={cn(
                        'flex justify-between items-center p-4 border rounded hover:bg-gray-50 cursor-pointer',
                        name === currentView
                            ? 'bg-primary/10 border-primary'
                            : 'border-gray-200',
                    )}
                    onClick={() => setCurrentView(name)}
                >
                    <h3 className="font-medium">{name}</h3>
                    <div className="flex gap-2">
                        <Button onClick={() => setCurrentModifyingView(name)}>
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() => deleteView(name)}
                            variant="destructive"
                        >
                            <Trash className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const ModifyView = ({
    currentModifyingView,
    setCurrentModifyingView,
}: {
    currentModifyingView: string;
    setCurrentModifyingView: (viewName: string | null) => void;
}) => {
    const { view, modifyView, modifyViewName } = useDrillStore(
        useShallow((store) => ({
            view: store.views[currentModifyingView],
            modifyView: store.modifyView,
            modifyViewName: store.modifyViewName,
        })),
    );

    const toggleInstrument = (instrument: string) => {
        const isHidden = view.hiddenSections.includes(instrument);
        const newHiddenInstruments = isHidden
            ? view.hiddenSections.filter((i) => i !== instrument)
            : [...view.hiddenSections, instrument];
        modifyView(currentModifyingView, {
            ...view,
            hiddenSections: newHiddenInstruments,
        });
    };

    return (
        <div className="flex flex-col gap-4 mt-4">
            <h3 className="font-medium text-lg">
                Modify View:{' '}
                <Input
                    value={currentModifyingView}
                    onChange={(e) => {
                        const newName = e.target.value;
                        if (newName.trim() === '') return;
                        setCurrentModifyingView(newName);
                        modifyViewName(currentModifyingView, newName);
                    }}
                    className="inline w-auto"
                />
            </h3>
            <Tabs defaultValue="sections">
                <TabsList>
                    <TabsTrigger value="sections">
                        Show/hide sections
                    </TabsTrigger>
                    <TabsTrigger value="set_display">Set Display</TabsTrigger>
                </TabsList>
                <TabsContent value="sections">
                    <div className="flex items-center mt-2 mb-4 space-x-2">
                        <Checkbox
                            id="individualOnly"
                            checked={view.individualOnly}
                            onCheckedChange={(checkState) => {
                                console.log('checkState', checkState);
                                modifyView(currentModifyingView, {
                                    ...view,
                                    individualOnly: !!checkState.valueOf(),
                                });
                            }}
                        />
                        <Label htmlFor="individualOnly">
                            Show only your dot
                        </Label>
                    </div>
                    {!view.individualOnly && (
                        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto sm:max-h-44 md:max-h-56">
                            {sections.map((instrument) => {
                                const isHidden =
                                    view.hiddenSections.includes(instrument);
                                return (
                                    <div
                                        key={instrument}
                                        className="flex items-center justify-between p-2 border rounded hover:bg-gray-50 cursor-pointer"
                                        onClick={() =>
                                            toggleInstrument(instrument)
                                        }
                                    >
                                        <span>{instrument}</span>
                                        <span>
                                            {isHidden ? (
                                                <EyeClosed className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="set_display">
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">
                                Minus Quantity
                            </label>
                            <p className="text-sm text-gray-600">
                                How many sets to show before your current set.
                            </p>
                            <Input
                                type="number"
                                value={view.minusQuantity}
                                onChange={(e) =>
                                    modifyView(currentModifyingView, {
                                        ...view,
                                        minusQuantity: Number(e.target.value),
                                    })
                                }
                                className="w-32"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Plus Quantity</label>
                            <p className="text-sm text-gray-600">
                                How many sets to show after your current set.
                            </p>
                            <Input
                                type="number"
                                value={view.plusQuantity}
                                onChange={(e) =>
                                    modifyView(currentModifyingView, {
                                        ...view,
                                        plusQuantity: Number(e.target.value),
                                    })
                                }
                                className="w-32"
                            />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export const ViewsSettings = () => {
    const [currentModifyingView, setCurrentModifyingView] = useState<
        string | null
    >();
    const addView = useDrillStore((store) => store.addView);

    return (
        <div className="p-4 h-full">
            <div className="flex items-center gap-4 flex-row">
                {currentModifyingView && (
                    <Button
                        variant="secondary"
                        onClick={() => setCurrentModifyingView(null)}
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                )}
                <h2 className="text-lg font-semibold">
                    Views
                    {currentModifyingView && ` - ${currentModifyingView}`}
                </h2>
                <div className="flex-1" />
                <Button
                    onClick={() => {
                        addView();
                    }}
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </div>
            {currentModifyingView ? (
                <ModifyView
                    currentModifyingView={currentModifyingView}
                    setCurrentModifyingView={setCurrentModifyingView}
                />
            ) : (
                <ViewList
                    setCurrentModifyingView={(viewName) =>
                        setCurrentModifyingView(viewName)
                    }
                />
            )}
        </div>
    );
};
