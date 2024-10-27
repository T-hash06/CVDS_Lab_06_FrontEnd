# ✨ CVDS Todo App ✨

A React todo app built with Vite and npm.

> **📚 Project for the CVDS Lab at Escuela Colombiana de Ingeniería Julio Garavito**  
> This application is part of the laboratory practices in the CVDS course, focusing on developing efficient and scalable applications with modern frameworks.

## 👥 Collaborators

- [Tomas Felipe Panqueva](https://github.com/T-hash06)
- [Juan Pablo Camargo](https://github.com/AutomemoryNN)
- [Sebastian Buitrago](https://github.com/elmultiusos)

## 📑 Table of Contents

- [🔧 Prerequisites](#-prerequisites)
- [🚀 Getting Started](#-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [⚙️ Development Server](#-development-server)
- [📦 Building for Production](#-building-for-production)
- [📜 Additional Scripts](#-additional-scripts)

## 🔧 Prerequisites

Ensure you have the following installed:

- [**Node.js**](https://nodejs.org/) (version 14 or higher)
- [**npm**](https://www.npmjs.com) (comes with Node.js)

## 🚀 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/T-hash06/CVDS_Lab_06_FrontEnd
   cd CVDS_Lab_06_FrontEnd
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

## 🔐 Environment Variables

This project requires environment variables for configuration. Follow these steps to set up your environment variables:

1. Locate the `.env.example` file in the root directory.
2. Copy the contents of `.env.example` to create a new `.env` file:

   ```bash
   cp .env.example .env
   ```

3. Open the `.env` file and update the values as needed.

> **Note**: The `.env.example` file includes comments and default values for reference on required environment variables.

## ⚙️ Development Server

To start the development server, run the following command:

```bash
npm run dev
```

This will start the server, and you can access the app in your browser at `http://localhost:5173`.

## 📦 Building for Production

To build the project for production, use:

```bash
npm run build
```

This will compile the project and generate optimized assets in the `dist` directory.

## 📜 Additional Scripts

- **Preview**: To preview the production build locally, use:

  ```bash
  npm run preview
  ```

- **Lint**: To run the linter, use:

  ```bash
  npm run lint
  ```

- **Format**: To format the codebase, use:

  ```bash
  npm run format
  ```
