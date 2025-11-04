'use client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Eye, Music } from 'lucide-react';
import Link from 'next/link';
import { ViewsSettings } from './views.config';

export default function Page() {
    return (
        <div className="h-screen flex flex-col pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)]">
            <div className="border-b p-4">
                <Link href="/">
                    <Button variant="ghost">
                        <ArrowLeft />
                        Home
                    </Button>
                </Link>
            </div>
            <Tabs
                defaultValue="general"
                orientation="vertical"
                className="grid grid-cols-[30%_70%] h-full"
            >
                <TabsList className="flex flex-col w-full h-fit bg-muted/50 p-2 gap-2">
                    <TabsTrigger
                        value="general"
                        className="w-full justify-start gap-2 p-4"
                    >
                        <Music className="w-4 h-4" />
                        Instrument
                    </TabsTrigger>
                    <TabsTrigger
                        value="views"
                        className="w-full justify-start gap-2 p-4"
                    >
                        <Eye className="w-4 h-4" />
                        Views
                    </TabsTrigger>
                </TabsList>
                <div className="p-6 h-full overflow-y-auto">
                    <TabsContent value="general" className="mt-0">
                        <h2 className="text-2xl font-semibold mb-4">
                            Instrument
                        </h2>
                        <p>Instrument settings content here.</p>
                    </TabsContent>
                    <TabsContent value="views" className="mt-0">
                        <ViewsSettings />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
