import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Drill Utils',
        short_name: 'Drill Utils',
        description:
            'Easily learn drill for marching band using this visualizer.',
        start_url: '/',
        icons: [
            {
                src: '/web-app-manifest-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/web-app-manifest-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
    };
}
