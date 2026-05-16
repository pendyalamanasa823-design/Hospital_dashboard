# 🏥 MediCare - Hospital Management Dashboard

A modern, professional Hospital Management Dashboard built with **React.js** and **plain CSS**. This project is a fully frontend application using static mock data — no backend required.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![CSS3](https://img.shields.io/badge/CSS3-Responsive-blue?logo=css3)
![Recharts](https://img.shields.io/badge/Recharts-Charts-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

### Authentication
- Login, Signup, and Forgot Password pages
- Form validation with error messages
- Mock authentication with localStorage
- Protected route guards

### Dashboard
- Overview stat cards (Patients, Doctors, Appointments, Revenue, Emergency)
- Interactive charts (Patient Stats, Appointments, Revenue)
- Recent appointments table
- Activity feed

### Patient Management
- View, Add, Edit, Delete patients
- Search & filter by status
- Modal forms with validation

### Doctor Management
- Doctor profile cards grid
- Add/Edit/Delete doctors
- Filter by specialization
- Availability status badges

### Appointment Management
- Book new appointments
- Cancel/Reschedule appointments
- Status tracking with badges
- Filter by status

### Analytics
- Patient admission trends (Area Chart)
- Department distribution (Pie Chart)
- Appointment trends (Bar Chart)
- Revenue vs Expenses (Line Chart)

### Extra Features
- 🌙 Dark Mode toggle (persisted)
- 📋 Activity Logs with timeline
- ⚙️ Settings page
- 👤 User Profile page
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| React Router DOM v6 | Routing |
| Recharts | Data Visualization |
| Framer Motion | Animations |
| CSS3 | Styling (Flexbox, Grid) |
| Vite | Build Tool |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/        (Sidebar, Topbar, Layout)
│   └── Modals/        (Reusable Modal)
├── context/           (AuthContext, ThemeContext)
├── css/               (variables, global, auth, responsive)
├── data/              (Mock data files)
├── pages/
│   ├── Auth/          (Login, Signup, ForgotPassword)
│   ├── Dashboard
│   ├── Patients
│   ├── Doctors
│   ├── Appointments
│   ├── Analytics
│   ├── Settings
│   ├── Profile
│   └── ActivityLogs
├── routes/            (AppRouter with guards)
├── App.jsx
└── main.jsx
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+ installed

### Steps

```bash
# 1. Navigate to project folder
cd reactjsproject

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔑 Demo Credentials

| Email | Password | Role |
|---|---|---|
| admin@hospital.com | admin123 | Admin |
| doctor@hospital.com | doctor123 | Doctor |
| nurse@hospital.com | nurse123 | Nurse |

---

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

---

## 📄 License

MIT License - Free to use and modify.
