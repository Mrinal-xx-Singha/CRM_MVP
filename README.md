<div align="center">
  <h1 align="center">⚡ FlowCRM</h1>
  <p align="center">
    <strong>A premium, lightning-fast Customer Relationship Management platform built for small business simplicity.</strong>
  </p>

  <p align="center">
    <a href="https://github.com/mrinal/crm-mvp/actions"><img src="https://img.shields.io/badge/CI%2FCD-GitHub_Actions_Enabled-10b981?style=for-the-badge&logo=githubactions&logoColor=white" alt="CI/CD Status"></a>
    <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
    <img src="https://img.shields.io/badge/License-MIT-F7DF1E?style=for-the-badge" alt="License MIT">
  </p>
</div>

> [!NOTE]
> ⭐ **Enjoying FlowCRM? Please consider giving this repo a star on GitHub!** It helps increase visibility and supports open-source development! 🚀

---

## 🎨 Overview

**FlowCRM** strips away unnecessary corporate bloat to deliver a lightweight, high-performance sales and relationship tracker. Inspired by modern SaaS titans (like Linear and Cal.com), the design emphasizes a stark, geometric typography system, high-contrast monochrome UI themes, and frictionless interactivity.

### 🖼️ Preview & Screenshots

<p align="center">
  <img width="1839" height="902" alt="Dashboard View" src="https://github.com/user-attachments/assets/d3a6bf57-cf28-4c19-989c-3cfb761ac944" />
  <img width="1862" height="897" alt="Kanban Board View" src="https://github.com/user-attachments/assets/c96970db-ce5e-4e00-93da-9c1f02bdaf3d" />
  <img width="1846" height="896" alt="Customer Management Hub" src="https://github.com/user-attachments/assets/ea1b8dbf-326f-4e6c-92b1-1e8cbc670b44" />
  <img width="1866" height="892" alt="Reminders Tracker" src="https://github.com/user-attachments/assets/5c4573ec-c4ec-4738-8e89-3efefc6acb09" />
  <img width="1860" height="891" alt="Dark Mode & Profile settings" src="https://github.com/user-attachments/assets/9df2bb3d-4c9d-4d87-a26d-c09264e05880" />
</p>

---

## 🚀 What's New: Latest Superpowers

- **📊 Productivity Area Chart**: Beautiful Recharts visualization powered by PostgreSQL time-series queries (`DATE_TRUNC`) to showcase completed job trends over the last 6 months with custom emerald gradients.
- **✨ Sonner Toast Notifications**: Replaced interruptive native browser alerts with fluid, animated slide-in toasts across all database mutations (with extra 🎯 feedback when crossing off completed reminders!).
- **⚙️ Automated CI/CD Pipelines**: Integrated GitHub Actions workflows that boot up cloud runners on every push and pull request to verify zero TypeScript errors across both Client and Server.
- **🔄 Centralized UI Loading Experience**: Custom animated SVG spinners integrated seamlessly across all authentication views, data tables, dashboards, and Kanban boards.
- **🌙 System-Integrated Dark Mode & Export to CSV**: Smooth theme transitions via `next-themes` (with zero SSR hydration flicker) plus one-click `.csv` backup generation for your entire client roster!

---

## 🧩 Core Capabilities

1. **Interactive Kanban Pipeline**
   - Effortless drag-and-drop workflow powered by `@hello-pangea/dnd`.
   - Track active jobs through custom stages (Pending, In Progress, Completed) with live status updates.
2. **Customer Relationship Hub**
   - Centralized database with debounced, instantaneous search across names, phone numbers, and emails.
   - Comprehensive detail profiles displaying connected jobs and notes.
3. **Automated Reminders & Workers**
   - Background chron jobs continuously monitor due dates and flag overdue follow-ups in red.
   - Interactive checkbox checking with instant cache invalidation across widgets.
4. **Security & Performance**
   - Hardened API powered by Zod schema validation, CORS security policies, and rate limiting (configured with proxy trust for secure serverless hosting).
   - JWT sessions with salted `bcrypt` password encryption.

---

## 🛠 Tech Stack & Architecture

FlowCRM is structured as a scalable monorepo separating frontend presentation from backend persistence.

### 🌐 Frontend (Client)
- **Framework**: Next.js 15 (React 19, App Router)
- **Styling**: Tailwind CSS v4 & Next-Themes (Dark Mode)
- **UI & Animation**: Shadcn UI, Lucide Icons, Sonner (Toasts)
- **Visualizations**: Recharts (Responsive bar & area data series)
- **State Management**: React Query (`@tanstack/react-query`) with optimistic UI cache updates
- **Forms & Schema Validation**: React Hook Form + Zod
- **Drag & Drop**: `@hello-pangea/dnd`

### ⚙️ Backend (Server)
- **Framework**: Node.js & Express.js (TypeScript)
- **Database**: PostgreSQL (Serverless via Neon)
- **ORM / Drivers**: `pg` (Node Postgres with production connection pooling)
- **Authentication**: JWT & Bcrypt password security
- **CI/CD Automation**: GitHub Actions (`ci.yml` pipeline)
- **Testing Suite**: Jest & Supertest (connected to isolated testing database environments)

---

## 🌍 Live Production Stack

| Component | Host Platform | Link |
| :--- | :--- | :--- |
| **Frontend Application** | Vercel | [Vercel Deployment](https://vercel.com) |
| **Backend REST API** | Render | [Render Container](https://render.com) |
| **Database Cluster** | Neon Serverless | [Neon PostgreSQL](https://neon.tech) |
| **CI/CD Runner** | GitHub Actions | [Automated Workflow](https://github.com/features/actions) |

---

## ⚡ Getting Started Locally

Follow these quick steps to spin up the entire full-stack app on your machine in under 5 minutes.

### Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL** installed and running on default port `5432`

### 1. Database Configuration
Open terminal and create the local databases for development and test execution:
```bash
psql -U postgres
CREATE DATABASE crm;
CREATE DATABASE crm_test;
```

### 2. Backend Server Setup
Navigate into the server folder, install dependencies, and setup environment variables:
```bash
cd server
npm install
```
Create a `.env` file inside `./server`:
```env
PORT=5000
DATABASE_URL=postgres://postgres:password@localhost:5432/crm
TEST_DATABASE_URL=postgres://postgres:password@localhost:5432/crm_test
JWT_SECRET=your_super_secret_jwt_key
```
Launch the TypeScript dev server:
```bash
npm run dev
```
*(Server will listen on `http://localhost:5000` and auto-initialize tables upon startup).*

### 3. Frontend Next.js Setup
Open a second terminal window, navigate into the client folder, install packages, and launch:
```bash
cd client
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the app! 🎉 Create an account on the sign-up page to populate your fresh CRM dashboard.

---

## 🧪 Testing & CI/CD Pipeline

FlowCRM is backed by robust testing and automation:

### Running Automated API Tests
Our backend uses Supertest and Jest to interact with the isolated `crm_test` schema—wiping tables cleanly before each transaction to guarantee idempotent results:
```bash
cd server
npm run test
```

### GitHub Actions CI/CD Architecture
Every commit pushed or pull-request created against the `main` branch automatically boots an Ubuntu runner via `.github/workflows/ci.yml`. The runner verifies package lock integrity (`npm ci`), builds Next.js pages, and executes TypeScript compiler checks across both client and server monorepo targets to protect production deployment integrity.

---

## 🧠 Engineering Insights & Learnings

### 1. Bypassing Express Read-Only `IncomingMessage` Getter During Zod Validation
When implementing centralized middleware to replace raw query strings with Zod sanitized inputs, Express threw a strict error: `TypeError: Cannot set property query of #<IncomingMessage> which has only a getter`. 
* **Solution**: Express defines `req.query` as a lazy read-only property under the hood. We solved this by utilizing `Object.defineProperty(req, "query", { value: parsedData.query, writable: true })`, cleanly injecting verified data down the Express middleware chain without breaking internal getters.

### 2. Eliminating Next.js SSR Theme Hydration Flicker
When utilizing Tailwind CSS with dynamic dark mode styling, React hydration crashed with class mismatch warnings due to `next-themes` injecting class attributes on the client before hydration completed.
* **Solution**: Configured the document root with `<html lang="en" suppressHydrationWarning>` inside `layout.tsx`, instructing Next.js to cleanly accommodate runtime theme attributes without re-rendering layout jumps.

---

## 🤝 Contributing

Contributions, feature requests, and issue suggestions are warmly welcomed! Feel free to fork this repository, open a pull request, or submit an issue.

## 📄 License
This project is open-source and released under the **MIT License**.

---
<p align="center">
  Built with ❤️ and Modern TypeScript. Don't forget to ⭐ star the repo if you found it useful!
</p>
