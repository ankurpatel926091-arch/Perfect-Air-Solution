# Limra Sales and Services

A modern, full-stack web application built to manage sales, services, brands, projects, and orders. The project features a highly interactive and animated React frontend using Shadcn UI and an Express/Node.js backend that utilizes both REST and GraphQL APIs.

## 🚀 Tech Stack

### Frontend
* **Framework:** React 18 (with Vite & TypeScript)
* **Styling & UI:** Tailwind CSS, Shadcn UI (Radix UI primitives)
* **State Management:** Redux Toolkit, React Query (@tanstack/react-query)
* **Animations:** GSAP, Framer Motion
* **Routing:** React Router DOM
* **Form Handling:** React Hook Form + Zod/Yup validation
* **API Integration:** GraphQL Request, Axios/Fetch

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **GraphQL:** Apollo Server (`@apollo/server`)
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs
* **File Uploads:** Cloudinary + Multer
* **Email Services:** Nodemailer

---

## ✨ Features

* **Dual API Architecture:** Consumes data via standardized RESTful routes and a flexible Apollo GraphQL endpoint.
* **Content Management:** Fully functioning routes for Blogs, Services, Brands, and Projects.
* **Order & Customer Management:** Secure endpoints for Orders, Contact form submissions, and Newsletter subscriptions.
* **Robust Authentication:** JWT-based user authentication setup injected directly into the GraphQL context.
* **Media Management:** Integrated single and multiple image upload functionality using Cloudinary.
* **Stunning UI/UX:** Responsive interfaces built with Shadcn UI, enhanced with GSAP and Framer motion animations. 

---

## 📁 Project Structure

```text
Perfect Air Solution/
├── Frontend/       # Customer-facing website (React + Vite + Tailwind CSS)
├── adminpanel/     # Administrator dashboard & management (React + Vite + Tailwind CSS)
└── backend/        # Express & Node.js backend (REST & GraphQL)
```

## 💻 Running the Projects

### Running from Root Directory
```bash
# Run Customer Frontend (port 5173)
npm run dev:frontend

# Run Admin Panel (port 5174)
npm run dev:admin

# Run Backend
npm run dev:backend

# Build both applications
npm run build:frontend
npm run build:admin
```

### Running from Subfolders
```bash
# Frontend
cd Frontend
npm run dev

# Admin Panel
cd adminpanel
npm run dev

# Backend
cd backend
npm run dev
```
