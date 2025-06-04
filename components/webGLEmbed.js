'use client';

import { useEffect } from 'react';

export default function UnicornStudioEmbed() {
    useEffect(() => {
        if (!window.UnicornStudio) {
            window.UnicornStudio = { isInitialized: false };

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.10/dist/unicornStudio.umd.js';
            script.onload = () => {
                if (!window.UnicornStudio.isInitialized) {
                    UnicornStudio.init();
                    window.UnicornStudio.isInitialized = true;

                    // Optional: Hide branding badge
                      setTimeout(() => {
                        const badge = document.querySelector('a[href*="unicorn.studio"]');
                        if (badge) badge.style.display = 'none';
                      }, 2000);
                }
            };

            (document.head || document.body).appendChild(script);
        }
    }, []);

    return (
        <div
            data-us-project="SqHAyVOfPad0QBBdzRVh?update=0.0.1"
            style={{
                width: '100dvw',
                height: '100dvh'
            }}
        />
    );
}
