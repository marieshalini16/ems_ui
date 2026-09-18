import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      /*
       * ==========================================
       * COLORS
       * ==========================================
       */

      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },

        navy: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },

        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },

        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },

        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },

        info: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },

        background: {
          DEFAULT: "#f8fafc",
          white: "#ffffff",
          muted: "#f1f5f9",
        },

        surface: {
          DEFAULT: "#ffffff",
          muted: "#f8fafc",
          soft: "#f1f5f9",
        },

        text: {
          primary: "#0f172a",
          secondary: "#475569",
          muted: "#64748b",
          disabled: "#94a3b8",
          inverse: "#ffffff",
        },

        border: {
          DEFAULT: "#e2e8f0",
          light: "#f1f5f9",
          dark: "#cbd5e1",
        },
      },

      /*
       * ==========================================
       * TYPOGRAPHY
       * ==========================================
       */

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],

        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },

      fontSize: {
        xs: [
          "0.75rem",
          {
            lineHeight: "1rem",
          },
        ],

        sm: [
          "0.875rem",
          {
            lineHeight: "1.25rem",
          },
        ],

        base: [
          "1rem",
          {
            lineHeight: "1.5rem",
          },
        ],

        lg: [
          "1.125rem",
          {
            lineHeight: "1.75rem",
          },
        ],

        xl: [
          "1.25rem",
          {
            lineHeight: "1.75rem",
          },
        ],

        "2xl": [
          "1.5rem",
          {
            lineHeight: "2rem",
          },
        ],

        "3xl": [
          "1.875rem",
          {
            lineHeight: "2.25rem",
          },
        ],

        "4xl": [
          "2.25rem",
          {
            lineHeight: "2.5rem",
          },
        ],
      },

      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      /*
       * ==========================================
       * BORDER RADIUS
       * ==========================================
       */

      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },

      /*
       * ==========================================
       * SHADOWS
       * ==========================================
       */

      boxShadow: {
        card: "0 1px 3px rgba(15, 23, 42, 0.08)",
        cardHover: "0 4px 12px rgba(15, 23, 42, 0.10)",
        dropdown: "0 4px 12px rgba(15, 23, 42, 0.12)",
        modal: "0 20px 40px rgba(15, 23, 42, 0.15)",
        input: "0 1px 2px rgba(15, 23, 42, 0.05)",
      },

      /*
       * ==========================================
       * SPACING
       * ==========================================
       */

      spacing: {
        sidebar: "16rem",
        header: "4rem",
      },

      /*
       * ==========================================
       * TRANSITIONS
       * ==========================================
       */

      transitionDuration: {
        fast: "150ms",
        normal: "200ms",
        slow: "300ms",
      },

      /*
       * ==========================================
       * Z-INDEX
       * ==========================================
       */

      zIndex: {
        dropdown: "1000",
        sticky: "1100",
        modal: "1200",
        toast: "1300",
      },
    },
  },

  plugins: [],
};

export default config;