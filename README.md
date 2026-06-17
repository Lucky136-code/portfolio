# 🎬 Cinematic AI/ML Developer Portfolio

A premium, highly interactive 3D developer portfolio designed with a clean, cinematic, hollywood-inspired command center aesthetic. Powered by **Next.js**, **Three.js (WebGL)**, and **Framer Motion**.

---

## 🚀 Key Visual & Technical Features

### 1. Scroll-Linked 3D Skyscraper Grid
* **Monochrome Skyline**: Skyscraper grids procedurally generated using shades of white, light gray, and zinc gray for high contrast.
* **Scroll-Responsive Travel**: As you scroll down the page, a custom low-poly armored tactical vehicle (Tumbler-inspired) drives down the central highway, with all tires spinning dynamically in sync with scroll speed.
* **Cinematic Chase Camera**: The WebGL camera drops from a high-angle city view down to road level, tracking behind the vehicle in a smooth follow sequence.

### 2. Glassmorphic User Interface
* **Cursor-Following Spotlight**: Interactive cards track hover coordinates and cast a soft, responsive cyan spotlight glow (`.mouse-glow-card`) following your cursor.
* **Symmetrical Design**: Fully centered navigation header (`Navbar.tsx`) and section headings.
* **Theatrical Overlay**: Fixed widescreen letterbox frame (`.cinematic-frame`) and radial vignette overlays create a premium cinematic presentation.

---

## 🛠️ Tech Stack

* **Core Framework**: Next.js 15 (App Router)
* **3D Graphics**: Three.js (WebGL)
* **Animations**: Framer Motion
* **Styling**: Tailwind CSS & Vanilla CSS custom variables

---

## 📂 Directory Structure

```
├── public/                 # Static assets (fonts, resume, SVGs)
├── src/
│   ├── app/
│   │   ├── globals.css     # Global variables, vignettes & mouse glows
│   │   ├── layout.tsx      # Fonts & Metadata config
│   │   └── page.tsx        # App entry & widescreen layout
│   └── components/
│       ├── CinematicCanvas.tsx # WebGL skyline, road & armored vehicle
│       ├── HeroIntro.tsx       # Main title & social routes
│       ├── Origin.tsx          # About Me & NIMS University credentials
│       ├── CommandCenter.tsx   # AI/ML & Web skills lists
│       ├── Archives.tsx        # Project highlights & repository links
│       ├── Certifications.tsx  # Verifiable J.P. Morgan, Anthropic, NVIDIA credentials
│       ├── Contact.tsx         # WhatsApp uplink & query form
│       └── Navbar.tsx          # Centered floating header
```

---

## ⚙️ Getting Started

### 1. Installation
Install the required dependencies:
```bash
npm install
```

### 2. Run the Development Server
Start the local hot-reloaded dev server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the portfolio.

### 3. Build for Production
Generate a production optimized static build:
```bash
npm run build
```
