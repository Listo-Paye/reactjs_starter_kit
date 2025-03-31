import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: false,
        setupFiles: resolve(__dirname, './vitest.setup.ts'),
        clearMocks: true,
        css: false,
        reporters: [
            [
                "default",
                {
                    "summary": false
                }
            ]
        ],
        include: [resolve(__dirname, './specs/**/*.steps.ts')],
        /*browser: {
            enabled: true,
            provider: 'playwright',
            instances: [
                { browser: 'chromium' },
            ],
        },*/
    }
})
