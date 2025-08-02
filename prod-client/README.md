# 🚀 React + Vite Frontend Setup

Welcome to the **production-ready React application setup** powered by **Vite**! This setup is designed with modern tools like **commitlint**, **husky**, **prettier**, and **eslint** to ensure consistent code quality and streamline development workflows.

---

## 🛠️ Features

-   ⚛️ **React + Vite**: Lightning-fast frontend development.
-   🧹 **Commitlint**: Enforces meaningful and consistent commit messages.
-   🐶 **Husky**: Automates Git hooks for better workflows.
-   🎨 **Prettier**: Ensures consistent code formatting.
-   🛡️ **ESLint**: Detects issues and enforces coding standards.
-   🔧 Fully customizable to fit your team's needs.

---

## 🚩 Prerequisites

Ensure the following are installed before getting started:

-   ✅ **Node.js** (v16 or later)
-   ✅ **npm** or **yarn**

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Myself-Pankaj/Initial_Frontend_Set_Up.git
cd <repository-folder>
```

### 2️⃣ Install Dependencies

Using **npm**:

```bash
npm install
```

Using **yarn**:

```bash
yarn install
```

### 3️⃣ Start the Development Server

Using **npm**:

```bash
npm run dev
```

Using **yarn**:

```bash
yarn dev
```

---

### 🔄 Upgrading React Version

To keep up with the latest features and improvements, we use the latest stable version of **React** and **ReactDOM**.

#### 🔼 Upgrade React

To upgrade to the latest version:

```bash
npm install react@latest react-dom@latest
```

To upgrade to a specific version (e.g., React 19):

```bash
npm install react@19 react-dom@19
```

Make sure to also keep `@vitejs/plugin-react-swc` and `vite` up to date:

```bash
npm install @vitejs/plugin-react-swc@latest vite@latest
```

## 🛡️ Linting and Formatting

### 📄 Run ESLint

```bash
npm run lint
```

### ✨ Format Code with Prettier

```bash
npm run format
```

### 🔧 Auto-Fix Issues

-   🧹 **Lint and fix code**: `npm run lint-fix`
-   🎨 **Format and fix code**: `npm run format-fix`

---

## 📋 Git Commit Standards

We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard to ensure consistent commit messages.

### 📝 Commit Message Format

```
<type>(scope?): <short description>
```

#### 🛠️ Allowed Commit Types:

-   ✨ **feat**: Introduces a new feature.
-   🐛 **fix**: Fixes a bug.
-   📚 **docs**: Updates or adds documentation.
-   🎨 **style**: Code style changes (e.g., formatting, spacing).
-   ♻️ **refactor**: Code changes without fixing a bug or adding a feature.
-   ⚡ **perf**: Performance optimizations.
-   🧪 **test**: Adds or updates tests.
-   📦 **build**: Changes related to the build system or dependencies.
-   🤖 **ci**: Updates to CI/CD configurations or scripts.
-   🧹 **chore**: Routine tasks (e.g., dependency updates).
-   ⏪ **revert**: Reverts a previous commit.

#### 🖋️ Example Commit Messages:

-   `✨ feat(auth): add user login functionality`
-   `🐛 fix(ui): resolve button alignment issue`

---

## 🐙 Husky Integration

Husky automates Git hooks for quality assurance:

-   ✅ **Pre-commit hook**: Runs `lint-staged` to lint and format staged files.
-   📝 **Commit-msg hook**: Validates commit messages using **commitlint**.

---

## 📦 Scripts

| Command              | 🔧 Description                          |
| -------------------- | --------------------------------------- |
| `npm run dev`        | 🚀 Start the development server         |
| `npm run build`      | 📦 Build the application for production |
| `npm run lint`       | 🛡️ Lint the codebase using ESLint       |
| `npm run lint-fix`   | 🧹 Fix linting issues automatically     |
| `npm run format`     | 🎨 Format the codebase using Prettier   |
| `npm run format-fix` | 🔧 Format and fix code using Prettier   |
| `npm test`           | 🧪 Run test cases                       |

---

## 📌 Folder Structure

Here’s an overview of the recommended project structure:

```
├── src
│   ├── 🖼️ assets        # Static assets images & icon
│   ├── 🧩 components    # Reusable React components
│   ├── 📚 constants     # Application constants
│   ├── ⚓ hooks         # Custom React hooks
│   ├── 📄 pages         # Application pages
│   ├── 🗂️ redux         # Redux store and slices
│   ├── 📜 scripts       # Utility scripts
│   ├── 🎨 stylesheets   # Global and modular CSS/SCSS
│   └── 🛠️ utils         # Helper functions and utilities
├── public            # Static assets served directly
├── .eslintrc.js      # ESLint configuration file
├── .prettierrc       # Prettier configuration file
├── .commitlintrc.js  # Commitlint configuration file
├── package.json      # Project metadata and scripts
└── README.md         # Project documentation
```

---

## 💻 Installing Dev Dependencies

The dev dependencies are already included in the `package.json`. To install them:

```bash
npm install
```

### 📦 Dev Dependencies Include:

-   🛡️ `eslint`
-   🎨 `prettier`
-   🐶 `husky`
-   🧹 `lint-staged`
-   📝 `@commitlint/cli`
-   📚 `@commitlint/config-conventional`

---

## 🌟 Contributing

We welcome contributions!

### Guidelines:

1. ✅ Ensure all linting and formatting checks pass.
2. 🖋️ Use the correct commit message format.
3. 🔄 Open a pull request with a clear description of your changes.

---

## 🎉 Happy Coding!

Let’s build something amazing with this modern, scalable setup! 🚀✨
