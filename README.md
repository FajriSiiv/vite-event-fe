# TODO Frontend Vite

This is a frontend project built with **Vite** and **React** to implement a TODO application with features like login, events management, and user-specific actions. The project uses several libraries to enhance functionality and user experience.

## Features

### Halaman Login

- [x] Form Login
- [x] Validation Form API ke Backend
- [x] Tombol **Login** yang mengirimkan data ke backend
- [x] Menangani respond JWT
- [x] Redirect ke Mainpage jika login sukses
- [x] Tampilkan error jika gagal login
- [x] Small Validation Form
- [x] Toast Notif (Error, Success) Login

### Halaman Mainpage

- [x] Design Mainpage
- [x] Menampilkan data Event setelah login
- [x] Tampilkan nama pengguna dan beberapa data terkait
- [x] Tampilkan event yang ada
- [x] Link navigasi ke halaman **Events**
- [x] Implementasikan logout (hapus token JWT dan redirect ke halaman login)
- [x] Menangani error dan loading state
- [x] Toast Notif (User welcome)

### Halaman Events (Admin)

- [x] Ambil daftar event dari backend (`GET /events`)
- [x] Tampilkan daftar event dengan nama, tanggal, pengguna yang terdaftar
- [x] Pagination jika ada banyak event
- [x] Buat Event ke API
- [x] Update Event ke API
- [x] Delete Event ke API
- [x] Loading State CRUD (Create, Read, Update, Delete)
- [x] Mengamankan Route admin CUD (Create, Update, Delete)
- [x] Toast Notif (Error, Success, Update) Event

### User Practice

- [x] Pagination jika ada banyak event
- [x] Login/Logout with JWT
- [x] Join the event for the user
- [x] GET Mainpage event data

## NPM Packages

| Package                                               | Version | Description                           |
| ----------------------------------------------------- | ------- | ------------------------------------- |
| [react-router](https://reactrouter.com/)              | 7.0.2   | Routing for React applications        |
| [TailwindCSS](https://tailwindcss.com/)               | 3.4.17  | Utility-first CSS framework           |
| [Zustand](https://zustand.docs.pmnd.rs/)              | 5.0.2   | State management library              |
| [Daypicker](https://daypicker.dev/)                   | 9.4.4   | Date picker component                 |
| [date-fns](https://date-fns.org/docs/Getting-Started) | 4.1.0   | Utility library for date manipulation |
| [react-hot-toast](https://react-hot-toast.com/)       | 2.4.1   | Notification system                   |

## Reusable Components

Reusable components are created to ensure consistency and reduce redundancy across the project.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later) or yarn

## Project Structure

- **`src/components`**: Contains reusable components.
- **`src/pages`**: Contains pages for Login, Mainpage, and Events.
- **`src/store`**: Zustand store for state management.
- **`src/styles`**: Tailwind CSS configuration and custom styles.
- **`src/utils`**: Utility functions like API calls and helpers.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
