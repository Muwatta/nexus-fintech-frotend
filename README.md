# Nexus Fintech Frontend

A modern, responsive frontend for the **Nexus Fintech** platform built with React, TypeScript, Tailwind CSS, and Vite. Handles JWT authentication and integrates with the backend APIs for login, registration, dashboard, and fintech operations.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)
* [Authentication Flow](#authentication-flow)
* [Available Scripts](#available-scripts)
* [Environment Variables](#environment-variables)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* User registration and login with JWT
* Protected dashboard routes
* Axios integration for API calls
* Responsive UI using Tailwind CSS
* Modular and maintainable React + TypeScript architecture

---

## Tech Stack

* **Frontend:** React 19, TypeScript
* **Styling:** Tailwind CSS 3
* **Routing:** React Router DOM v7
* **API Requests:** Axios
* **Bundler:** Vite
* **Linting:** ESLint with React hooks plugin
* **State:** Local component state & token in `localStorage`

---

## Getting Started

### Prerequisites

* Node.js >= 20
* npm >= 9
* Backend API running (Django + Django REST Framework with JWT auth)

### Installation

```bash
# Clone repository
git clone https://github.com/Muwatta/nexus-fintech-frotend/
cd nexus-fintech-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## Project Structure

```txt
src/
├── api/             # Axios instances and API helpers
├── assets/          # Images, logos, icons
├── components/      # Reusable UI components
├── pages/           # Page components (Login, Register, Dashboard)
├── routes/          # AppRoutes.tsx (routing setup)
├── types/           # TypeScript types and interfaces
├── utils/           # Helpers (auth, token management)
├── App.tsx          # Main app component
├── main.tsx         # App entry
└── index.css        # Tailwind CSS import
```

---

## Authentication Flow

1. **Register**

   * POST `/auth/register/`
   * Saves user in backend
   * Redirects to `/login`

2. **Login**

   * POST `/auth/login/`
   * Receives JWT token
   * Saves token in `localStorage`
   * Sets Axios `Authorization` header
   * Redirects to `/dashboard`

3. **Protected Routes**

   * `ProtectedRoute` component checks `isAuthenticated()`
   * Redirects to `/login` if token is missing/invalid

---

## Available Scripts

```bash
npm run dev      # Run Vite dev server
npm run build    # Build production bundle
npm run preview  # Preview production build
npm run lint     # Run ESLint on all files
```

---

## Environment Variables

* Optionally, create a `.env` file for API base URL:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

* Use in Axios instance:

```ts
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
```

---

## Tailwind CSS

* Tailwind is configured in `tailwind.config.cjs`
* Make sure your `content` includes:

```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
```

* Build errors often happen if PostCSS config is `.js` while `"type": "module"` is set in `package.json`. Rename it to `postcss.config.cjs`.

---

## Contributing

1. Fork repository
2. Create feature branch `git checkout -b feature/YourFeature`
3. Commit changes `git commit -m "Add feature"`
4. Push branch `git push origin feature/YourFeature`
5. Open pull request

---

## License

This project is licensed under the **MIT License**.
