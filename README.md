# User Management Dashboard

## Project Overview

User Management Dashboard is a React-based application built with Vite that demonstrates a simple, modern user administration UI. It performs basic CRUD operations against the JSONPlaceholder REST API and includes search, sort, filter and pagination features while focusing on a clean, responsive UI.

## Features

- View Users
- Add User
- Edit User
- Delete User
- Search Users
- Sort Users
- Filter Users
- Pagination (10, 25, 50, 100)
- Responsive Design (Desktop / Tablet / Mobile)
- Form Validation
- API Error Handling
- Loading State
- Toast Notifications
- Modern UI

## Tech Stack

- React 19
- Vite
- JavaScript (ES6+)
- Axios
- React Hooks
- CSS / CSS Modules
- JSONPlaceholder REST API

## Folder Structure

```
user-management-dashboard/
├─ package.json
├─ vite.config.js
├─ index.html
├─ README.md
├─ public/
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ assets/
│  ├─ components/
│  │  ├─ Layout.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ UserTable.jsx
│  │  ├─ UserRow.jsx
│  │  ├─ UserForm.jsx
│  │  ├─ SearchBar.jsx
│  │  └─ ...
│  ├─ pages/
│  │  └─ DashboardPage.jsx
│  ├─ services/
│  │  ├─ api.js
│  │  └─ userService.js
│  ├─ hooks/
│  │  └─ useUsers.js
│  └─ styles/
│     └─ app.css
└─ public/
```

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd user-management-dashboard
npm install
npm run dev
```



## Build for Production

```bash
npm run build
```

## API Used

Base URL:

```
https://jsonplaceholder.typicode.com/users
```

Note: JSONPlaceholder simulates POST, PUT and DELETE requests — changes are not persisted. The app treats responses as if they succeeded so UI state is updated client-side.

## Validation

- Required fields are enforced on the user form.
- Email fields are validated for proper format.
- Inline validation messages appear near invalid fields.

## Error Handling

- API request failures show user-friendly error messages.
- Loading indicators are shown while requests are in progress.
- Toast notifications provide brief success/error feedback.

## Responsive Design

The UI is designed to work across:

- Desktop
- Tablet
- Mobile

Layout elements stack and scale gracefully on smaller screens.

## Assumptions

- Department values are generated locally because the API does not provide a `department` field.
- CRUD operations are simulated using JSONPlaceholder; POST/PUT/DELETE responses are mocked by the service.

## Challenges Faced

- Managing component state and derived lists (search, filter, sort, pagination) in a predictable way.
- Reusing the same form for both Add and Edit flows while keeping validation consistent.
- Synchronizing search, filter, sort and pagination behavior.
- Creating a responsive and modern UI while keeping the codebase simple.

## Future Improvements

- Add authentication and role-based access control.
- Integrate with a real backend and persistent database.
- Add dark mode with theme switching.
- Export user lists to CSV/PDF.
- Advanced filtering and bulk actions.
- Unit and integration tests.

## Deployment

Deployment Link:https://user-management-dashboardd.netlify.app/


Demo video - https://drive.google.com/file/d/1h9BogP_Kefj6XpWqquDykkNhNnuO-IkH/view?usp=sharing

## Author

Somase Harish

---

