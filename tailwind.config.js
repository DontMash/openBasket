/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        extend: {
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        maxWidth: theme('maxWidth.none'),
                    },
                },
            }),
        },
    },
};
