# 🚀 Flyverr‑frontend

<p align="center">
  <img src="images/logo.png" alt="Flyverr Logo" width="150" />
</p>

**Flyverr‑frontend** is a modern, scalable marketplace UI built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), and TypeScript. Designed with best practices from 30+ years of full-stack experience, it delivers speed, usability, and maintainability for real-world SaaS and marketplace applications.

---

## ✨ Features

- ⚡ **Next.js 14** with App Router for SSR, SSG, and API routes
- 🎨 **Tailwind CSS** & **shadcn/ui** for consistent, beautiful design
- 🔒 **TypeScript** for type-safe, robust code
- 📱 **Fully responsive** and mobile-first
- 🔗 **Centralized Axios API helper** with interceptors for secure integration
- 🧩 **Component-driven** architecture for easy scaling
- 🛠️ **Ready-to-integrate** authentication (login/signup) flows
- 🧪 **Easy to test and extend**

---

## 📂 Folder Structure

```
Flyverr-frontend/
├── public/               # Static assets (images, favicon, etc.)
├── src/
│   ├── app/              # Next.js app directory (routing, pages)
│   │   ├── login/        # Login page
│   │   ├── signup/       # Signup page
│   │   └── ...           # Other routes
│   ├── components/
│   │   ├── ui/           # Reusable UI components (Button, Input, etc.)
│   │   └── ...           # Other shared components
│   ├── lib/
│   │   └── api.ts        # Axios API helper with interceptors
│   └── ...               # Utilities, hooks, etc.
├── .next/                # Next.js build output (auto-generated)
├── node_modules/         # Dependencies
├── package.json          # Project metadata and scripts
├── tsconfig.json         # TypeScript config
├── postcss.config.mjs    # PostCSS config
├── tailwind.config.js    # Tailwind CSS config
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/Flyverr-frontend.git
cd Flyverr-frontend
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Run the Development Server**
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🌐 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com](https://vercel.com/), import your repo, and deploy.
3. Set environment variables in the Vercel dashboard as needed.

### **Manual Deployment**
```bash
npm run build
npm start
```

---

## ⚙️ Environment Variables
- `NEXT_PUBLIC_API_URL` — Base URL for your backend API (set in `.env.local`)

---

## 🤝 Contributing

1. Fork the repo and create your branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a Pull Request

---

## 📖 License

This project is licensed under the MIT License.

---

<p align="center"><b>Crafted with care and 30+ years of full-stack experience.</b></p>

