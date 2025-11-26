# Maglo

A modern financial dashboard application built with React and TypeScript.

## Features

- 🔐 **Authentication** - Sign in/Sign up with form validation
- 📊 **Dashboard** - Financial summaries, working capital charts, and analytics
- 💳 **Wallet** - Credit card management and visualization
- 💸 **Transactions** - Recent transactions table with sorting and filtering
- 📅 **Scheduled Transfers** - View and manage upcoming transfers
- ⚙️ **Settings** - User preferences and configuration

## Tech Stack

### Core

- **React 19** - UI library with latest features
- **TypeScript** - Type-safe JavaScript
- **Vite 7** - Next-gen build tool with HMR

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **tailwind-merge** - Utility for merging Tailwind classes

### State Management & Data Fetching

- **Zustand 5** - Lightweight state management
- **TanStack Query 5** - Server state management and data fetching
- **Axios** - HTTP client for API requests

### Routing

- **React Router 7** - Client-side routing with lazy loading

### UI Components

- **TanStack Table 8** - Headless table library
- **Nivo** - Data visualization (line charts)
- **Motion** - Animation library
- **React Hot Toast** - Toast notifications
- **React Tooltip** - Tooltips

### Utilities

- **Day.js** - Date manipulation
- **Currency.js** - Currency formatting

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## Project Structure

```
src/
├── api/           # API client and endpoints
├── assets/        # Fonts, icons, and images
├── features/      # Feature-based modules
│   ├── auth/      # Authentication pages and components
│   ├── dashboard/ # Dashboard with widgets
│   ├── finance/   # Financial utilities
│   ├── settings/  # Settings page
│   └── toast/     # Toast notifications
├── hooks/         # Custom React hooks
├── routes/        # App routing configuration
├── shared/        # Reusable components
├── store/         # Zustand stores
├── types/         # TypeScript type definitions
└── utils/         # Helper functions and constants
```

## Scripts

| Command        | Description                    |
| -------------- | ------------------------------ |
| `yarn dev`     | Start development server       |
| `yarn build`   | Build for production           |
| `yarn preview` | Preview production build       |
| `yarn lint`    | Run ESLint                     |
