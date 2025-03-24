export default {
    content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
    important: '#root',
    theme: {
        extend: {},
    },
    corePlugins: {
        // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
        preflight: false,
    },
    plugins: [],
}
