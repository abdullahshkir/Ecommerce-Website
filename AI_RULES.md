# AI Development Rules for Mobixo

This document outlines the technical stack and development conventions for the Mobixo e-commerce application. Follow these rules to ensure consistency and maintainability as we connect the application to Supabase.

## Tech Stack

The application is built with the following technologies:

*   **Framework:** React with Vite
*   **Language:** TypeScript
*   **Backend & Database:** Supabase (for Authentication, Database, and Serverless Functions)
*   **Styling:** Tailwind CSS
*   **Routing:** React Router (`react-router-dom`)
*   **State Management:** React Context API
*   **Icons:** Custom SVG components located in `src/components/icons.tsx`.

## Library Usage and Rules

### 1. Backend: Supabase
*   **Primary Backend:** All backend functionality, including user authentication, database storage (for users, products, orders), and server-side logic, **must** be implemented using Supabase.
*   **Client:** Use the official `@supabase/supabase-js` library for all interactions with the Supabase backend.
*   **Authentication:**
    *   Implement user login, registration, and session management using Supabase Auth.
    *   For UI, use the `@supabase/auth-ui-react` library where appropriate to maintain a consistent look and feel.
*   **Database:**
    *   All application data (users, products, orders, etc.) must be stored in the Supabase PostgreSQL database.
    *   Define clear schemas and enable Row Level Security (RLS) on all tables to ensure data privacy and security.

### 2. Styling: Tailwind CSS
*   **Exclusive Use:** All styling **must** be done using Tailwind CSS utility classes.
*   **No Other CSS:** Do not write custom CSS files, use CSS-in-JS libraries, or introduce other styling frameworks.
*   **Component-Based:** Style components directly within their respective `.tsx` files.

### 3. State Management: React Context API
*   **Global State:** Continue using the existing React Context providers (`UserContext`, `CartContext`, `WishlistContext`, `CurrencyContext`) for managing global application state. This is especially important for handling the user's authentication session from Supabase.
*   **Local State:** Use the `useState` and `useEffect` hooks for component-level state.
*   **No New Libraries:** Do not introduce other state management libraries like Redux, Zustand, or MobX.

### 4. Routing: React Router
*   **Client-Side Routing:** All page navigation and routing must be handled by `react-router-dom`.
*   **Route Definitions:** Keep all main route definitions within the `App.tsx` file for clarity.

### 5. Components & Icons
*   **Custom Components:** Build all UI components from scratch using React, TypeScript, and Tailwind CSS. Do not add a third-party component library like Material-UI or Ant Design.
*   **Icons:** To add a new icon, create a new React component for it in `src/components/icons.tsx` and export it from there.