'use client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Eye, Music } from 'lucide-react';
import Link from 'next/link';
import { ViewsSettings } from './views.config';
import { InstrumentSettings } from './instrument.config';

export default function Page() {
    return (
        <div className="h-screen flex flex-col p-safe">
            <div className="border-b p-2">
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
                className="grid grid-cols-[30%_70%] flex-grow"
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
                <div className="overflow-y-auto">
                    <TabsContent value="general" className="mt-0">
                        <InstrumentSettings />
                    </TabsContent>
                    <TabsContent value="views" className="mt-0">
                        <ViewsSettings />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
