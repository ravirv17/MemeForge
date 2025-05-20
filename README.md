# 🖼️ MemeForge – Meme Generator Web App

MemeForge is a modern and responsive web application that allows users to create, customize, and download memes effortlessly. It provides a dynamic canvas preview with drag-and-drop text layers, customizable styles, and a rich set of templates.

---

## 🚀 Features

- 🎨 **Template Selection:** Browse or search from a wide range of meme templates.
- 📝 **Dynamic Text Layers:**
  - Add multiple text layers
  - Edit text content, font, size, color, stroke, and alignment
  - Support for multi-line text and uppercase toggle
- 🖱️ **Drag and Drop:** Position text layers directly on the canvas using mouse interaction.
- 🖼️ **Live Preview:** Real-time canvas rendering using HTML5 Canvas API.
- 💾 **Export/Download:** Final memes can be exported as image files.
- 📱 **Responsive Design:** Fully responsive layout using Tailwind CSS.

---

## 🧠 Approach & Architecture

The project is built with a **component-driven architecture** using **React + TypeScript**. Here's an overview of the core approach:

### 1. **Canvas + HTML Overlay Hybrid**

- The meme is drawn on a `<canvas>` using the Canvas API.
- For better UX and drag functionality, text layers are also rendered as absolutely positioned `<div>` elements over the canvas.
- This allows real-time user interactions and still supports clean exports from the canvas.

### 2. **Component Breakdown**

- **`CanvasPreview.tsx`** – Handles drawing meme on canvas and overlays draggable text layers.
- **`TextLayerControl.tsx`** – UI controls for editing individual text layers (text, font, size, colors, alignment).
- **`TemplateSelector.tsx`** – Allows users to search and choose meme templates.
- **`Header.tsx` / `Footer.tsx`** – UI layout components for branding and navigation.

### 3. **State Management**

- Each `TextLayer` is managed via React state.
- Position is calculated in percentage terms (relative to canvas) for responsive consistency.
- Drag events compute new X/Y percentage values for positioning.

---

## 📁 Folder Structure

src/
├── components/
│ ├── CanvasPreview.tsx
│ ├── TextLayerControl.tsx
│ ├── TemplateSelector.tsx
│ ├── Header.tsx
│ └── Footer.tsx
├── context/
│ └── MemeContext.tsx
├── types/
│ └── index.ts
├── data/
│ └── memeTemplates.ts
└── App.tsx

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Canvas:** HTML5 Canvas API
- **Routing:** React Router

---

## 📦 Setup Instructions

1. **Clone the repository**

   git clone https://github.com/your-username/memeforge.git
   cd memeforge

2. npm install

3. npm run dev
