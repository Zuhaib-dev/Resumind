<div align="center">

  <br />
    <img src="public/readme/hero.webp" alt="Resumind – AI Resume Analyzer Banner">
  <br />

  <div>
    <img alt="React 19" src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
    <img alt="Puter.js" src="https://img.shields.io/badge/Puter.js-181758?style=for-the-badge&logoColor=white" />
    <img alt="Zustand" src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white" />
    <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  </div>

  <br />

  <h1>🧠 Resumind – AI Resume Analyzer</h1>

  <p>
    <strong>Get instant AI-powered feedback on your resume. Boost your ATS score. Land your dream job.</strong>
  </p>

  <p>
    <a href="https://resumind-ebon.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-blueviolet?style=for-the-badge" alt="Live Demo" /></a>
  </p>

</div>

---

<div align="center">

### 👤 Built by **Zuhaib Rashid**

<p><i>Created while learning at <b>Sheryians Coding School</b></i></p>

<a href="https://github.com/Zuhaib-dev" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
<a href="https://x.com/xuhaib_x9" target="_blank"><img src="https://img.shields.io/badge/X_(Twitter)-000000?style=for-the-badge&logo=x&logoColor=white" alt="X (Twitter)" /></a>
<a href="https://www.linkedin.com/in/zuhaib-rashid-661345318/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="http://zuhaibrashid.com/" target="_blank"><img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfolio" /></a>

</div>

---

## 📌 Introduction

**Resumind** is an AI-powered Resume Analyzer that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS). Upload your resume, provide a job description, and get instant AI-driven feedback — complete with an **ATS score**, **section-by-section breakdown**, and **actionable improvement tips**.

Built with modern frontend technologies and **zero backend** — everything runs serverlessly through **Puter.js** for authentication, file storage, AI inference, and database features directly in the browser.

---

## 🎬 Demo

<div align="center">

### ⬆️ Upload & Analyze

> Drop your resume, enter the job details, and let AI do the heavy lifting.

<img src="public/images/resume-scan.gif" alt="Upload and analyze resume" width="700" />

<br /><br />

### 📊 AI-Powered Review

> Get a detailed breakdown with ATS score, strengths, and improvement suggestions.

<img src="public/images/resume-scan-2.gif" alt="AI resume review and scoring" width="700" />

</div>

---

## ⚙️ Tech Stack

| Technology | Purpose |
|:---:|:---|
| **React 19** | Component-based UI with latest concurrent features |
| **React Router v7** | File-based routing and smooth navigation |
| **TypeScript** | Type-safe, scalable development |
| **Tailwind CSS v4** | Utility-first responsive styling |
| **Puter.js** | Serverless auth, file storage, AI, and KV database — all in-browser |
| **Zustand** | Minimal, performant state management |
| **Vite** | Lightning-fast HMR and optimized builds |
| **Docker** | Containerized deployment with multi-stage builds |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  React   │  │  Zustand  │  │  React Router v7 │  │
│  │   UI     │  │  Store    │  │  (File Routes)   │  │
│  └────┬─────┘  └────┬─────┘  └────────┬─────────┘  │
│       │              │                 │             │
│       └──────────────┼─────────────────┘             │
│                      │                               │
│              ┌───────▼───────┐                       │
│              │   Puter.js    │                       │
│              │   SDK         │                       │
│              └───────┬───────┘                       │
└──────────────────────┼───────────────────────────────┘
                       │
          ┌────────────┼────────────┐
          │            │            │
   ┌──────▼──┐  ┌─────▼────┐  ┌───▼─────┐
   │  Auth   │  │  Cloud   │  │   AI    │
   │ (OAuth) │  │  Storage │  │ (LLM)  │
   └─────────┘  └──────────┘  └─────────┘
                Puter Cloud Services
```

> **No backend required** — Puter.js handles authentication, file storage (resume PDFs + converted images), KV database (resume metadata & AI feedback), and AI inference (resume analysis) entirely from the client.

---

## 🔋 Features

| Feature | Description |
|:---|:---|
| 📄 **Resume Upload** | Drag & drop or click to upload PDF resumes securely |
| 🤖 **AI Analysis** | Get detailed, context-aware feedback powered by LLMs |
| 📊 **ATS Scoring** | Receive a numeric ATS compatibility score (0–100) |
| 💡 **Actionable Tips** | Section-by-section improvement suggestions |
| 🎯 **Job Matching** | Tailored feedback based on your target job description |
| 🔐 **Secure Auth** | OAuth-based authentication via Puter.js |
| ☁️ **Cloud Storage** | Resumes stored securely in the cloud — no backend needed |
| 📱 **Fully Responsive** | Beautiful on desktop, tablet, and mobile |
| 🐳 **Docker Ready** | Production-ready containerized deployment |

---

## 🗂️ Project Structure

```
resumind/
├── 📁 app/
│   ├── 📁 components/       # Reusable UI components
│   │   ├── ATS.tsx          # ATS score display with gauge
│   │   ├── Accordion.tsx    # Collapsible sections
│   │   ├── Details.tsx      # Detailed feedback view
│   │   ├── FileUploader.tsx # Drag & drop file upload
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── ResumeCard.tsx   # Resume list cards
│   │   ├── ScoreBadge.tsx   # Score indicator badge
│   │   ├── ScoreCircle.tsx  # Circular progress indicator
│   │   ├── ScoreGauge.tsx   # ATS score gauge
│   │   └── Summary.tsx      # Resume summary component
│   ├── 📁 lib/              # Utilities & integrations
│   │   ├── pdf2img.ts       # PDF to image conversion
│   │   ├── puter.ts         # Puter.js SDK integration
│   │   └── utils.ts         # Helper functions
│   ├── 📁 routes/            # Page routes (React Router v7)
│   │   ├── auth.tsx         # Login / authentication
│   │   ├── home.tsx         # Dashboard — resume list
│   │   ├── resume.tsx       # Individual resume review
│   │   ├── upload.tsx       # Upload & analyze flow
│   │   └── wipe.tsx         # Data management
│   ├── app.css              # Global styles
│   ├── root.tsx             # App root layout
│   └── routes.ts            # Route definitions
├── 📁 constants/             # App constants & AI prompts
├── 📁 public/                # Static assets
├── 📁 types/                 # TypeScript type definitions
├── Dockerfile               # Multi-stage Docker build
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🔄 How It Works

```
1️⃣  Sign In          →  Authenticate via Puter.js OAuth
2️⃣  Upload Resume    →  Drag & drop your PDF resume
3️⃣  Add Job Details  →  Enter company, title & job description
4️⃣  AI Analysis      →  LLM reads your resume + job requirements
5️⃣  Get Results      →  ATS score, strengths, and improvement tips
6️⃣  Iterate          →  Update your resume and re-analyze
```

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20+)
- [npm](https://www.npmjs.com/) (v9+)
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/Zuhaib-dev/Resumind.git

# Navigate to the project
cd Resumind

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173` 🎉

---

## 🐳 Docker

Build and run with Docker for a production-ready setup:

```bash
# Build the Docker image
docker build -t resumind .

# Run the container
docker run -p 3000:3000 resumind
```

The production app will be available at `http://localhost:3000`

---

## 📜 Available Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Run TypeScript type checking |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## ⭐ Show Your Support

If you found this project useful, please consider giving it a **star** ⭐ on GitHub — it helps a lot!

---

<div align="center">

  <p>Made with ❤️ by <a href="https://zuhaibrashid.com/" target="_blank"><strong>Zuhaib Rashid</strong></a></p>
  
  <a href="https://github.com/Zuhaib-dev" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://x.com/xuhaib_x9" target="_blank"><img src="https://img.shields.io/badge/X-000000?style=flat-square&logo=x&logoColor=white" alt="X" /></a>
  <a href="https://www.linkedin.com/in/zuhaib-rashid-661345318/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="http://zuhaibrashid.com/" target="_blank"><img src="https://img.shields.io/badge/Portfolio-FF5722?style=flat-square&logo=google-chrome&logoColor=white" alt="Portfolio" /></a>

</div>
