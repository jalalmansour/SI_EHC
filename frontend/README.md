# EHC SIRH - Frontend Application

## Overview

EHC SIRH is a comprehensive Human Resources Management System built with React, Vite, and Ant Design. The application provides role-based access control with different dashboards for various user types.

## Authentication Flow

### 1. Loading Page
- **First screen** users see when the app starts
- Shows EHC branding with loading animation
- Simulates app initialization process
- Automatically transitions to landing page after completion

### 2. Landing Page
- **Main entry point** for unauthenticated users
- Features EHC branding and value proposition
- Contains **Login** and **Signup** buttons
- Responsive design with professional styling

### 3. Authentication UI
- **Login Page**: Email/password authentication with test accounts
- **Signup Page**: Multi-step registration form with user type selection
- Both pages can navigate back to landing page

### 4. Dashboard Access
- **Role-based routing** after successful authentication
- Different menu items based on user role
- Professional dashboard layout with sidebar navigation

## User Roles & Access

### Available Test Accounts

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| `admin@ehc.com` | `admin123` | Admin | Full system access |
| `formateur@ehc.com` | `formateur123` | Formateur | Training management |
| `rrh@ehc.com` | `rrh123` | RRH | HR management |
| `manager@ehc.com` | `manager123` | Manager | Team management |

### Role-Specific Features

- **Admin**: System configuration, user management, global reports
- **Formateur**: Training catalog, participant management, course creation
- **RRH**: Budget management, organization structure, training planning
- **Manager**: Team oversight, training coordination, performance tracking

## Technical Architecture

### Frontend Stack
- **React 18** with JSX
- **Vite** for build tooling
- **Ant Design** for UI components
- **Tailwind CSS** for custom styling
- **Context API** for state management

### Key Components
- `LoadingPage`: Initial app loading screen
- `LandingPage`: Main marketing/entry page
- `LoginPage`: User authentication
- `SignupPage`: User registration
- `DashboardLayout`: Main application shell
- `UserProfileForm`: User profile management

### State Management
- **AuthContext**: Manages user authentication state
- **Local Storage**: Persists user session data
- **App State**: Controls page routing and flow

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Project Structure

```
frontend/src/
├── components/
│   ├── layouts/
│   │   └── dashboard-layout.jsx      # Main dashboard shell
│   └── forms/
│       └── user-profile-form.jsx     # User profile form
├── contexts/
│   └── AuthContext.jsx               # Authentication context
├── pages/
│   ├── LoadingPage.jsx               # App loading screen
│   ├── LandingPage.jsx               # Main landing page
│   ├── LoginPage.jsx                 # User login
│   ├── SignupPage.jsx                # User registration
│   └── formateur/                    # Role-specific pages
│       ├── DashboardFormateurPage.jsx
│       └── ProfileFormateur.jsx
├── App.jsx                           # Main application component
└── main.jsx                          # Application entry point
```

## Features

### Authentication
- ✅ User login with test accounts
- ✅ User registration with role selection
- ✅ Session persistence
- ✅ Role-based access control
- ✅ Secure logout functionality

### UI/UX
- ✅ Professional EHC branding
- ✅ Responsive design
- ✅ Smooth transitions and animations
- ✅ Modern gradient styling
- ✅ Intuitive navigation

### Dashboard
- ✅ Role-specific menu items
- ✅ Collapsible sidebar
- ✅ User profile dropdown
- ✅ Notification system
- ✅ Breadcrumb navigation

## Development Notes

### Adding New Roles
1. Update `userTypes` in `SignupPage.jsx`
2. Add role-specific menu items in `DashboardLayout.jsx`
3. Create role-specific dashboard pages
4. Update routing logic in `App.jsx`

### Styling
- Uses Tailwind CSS for utility classes
- Custom gradients and colors defined in components
- Responsive breakpoints: `xs`, `sm`, `md`, `lg`, `xl`

### State Management
- Authentication state managed via Context API
- Local storage for session persistence
- Component-level state for UI interactions

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

© 2024 EHC SIRH. All rights reserved.
