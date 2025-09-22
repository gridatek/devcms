/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/app/generated/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            '[class~="lead"]': {
              color: '#6B7280',
            },
            a: {
              color: '#3B82F6',
              textDecoration: 'none',
              '&:hover': {
                color: '#1D4ED8',
              },
            },
            strong: {
              color: '#111827',
            },
            'ol > li::before': {
              color: '#6B7280',
            },
            'ul > li::before': {
              backgroundColor: '#D1D5DB',
            },
            hr: {
              borderColor: '#E5E7EB',
            },
            blockquote: {
              color: '#6B7280',
              borderLeftColor: '#3B82F6',
            },
            h1: {
              color: '#111827',
            },
            h2: {
              color: '#111827',
            },
            h3: {
              color: '#111827',
            },
            h4: {
              color: '#111827',
            },
            'figure figcaption': {
              color: '#6B7280',
            },
            code: {
              color: '#DC2626',
              backgroundColor: '#F3F4F6',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              color: '#F9FAFB',
              backgroundColor: '#1F2937',
              borderRadius: '0.5rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              padding: '0',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}