# Client Web Systems — Laboratory Work 2

## Library Management System

A client-side library management application developed with TypeScript.

The application allows users to manage books and library users, borrow and return books, search and sort the collection, and persist application state in LocalStorage.

## Live Demo

GitHub Pages:

https://sebsnake2.github.io/client-web-systems-lab2/

## Technologies

- TypeScript
- Vite
- Bootstrap
- LocalStorage
- ESLint
- Prettier
- Mocha
- Chai
- Husky
- GitHub Pages

## Features

- Add books
- Add users
- Client-side form validation
- Numeric user IDs
- Book publication year validation
- Borrow books
- Return books
- Maximum of 3 borrowed books per user
- Delete books
- Delete users
- Protection from deleting borrowed books
- Protection from deleting users with active loans
- Search books by title or author
- Sort books by title, author and year
- Pagination for books and users
- Persistent data storage using LocalStorage
- Modal dialogs and notifications without using `alert()`
- UI generated dynamically through the DOM API

## Project Structure

```text
src/
├── models/
│   ├── interfaces/
│   │   ├── IBook.ts
│   │   └── IUser.ts
│   ├── Book.ts
│   └── User.ts
│
├── services/
│   ├── BorrowService.ts
│   ├── Library.ts
│   ├── NotificationService.ts
│   └── Storage.ts
│
├── utils/
│   ├── idGenerator.ts
│   └── validators.ts
│
├── ui/
│   ├── components/
│   │   ├── BookControls.ts
│   │   ├── BookForm.ts
│   │   ├── BookList.ts
│   │   ├── Modal.ts
│   │   ├── Pagination.ts
│   │   ├── UserForm.ts
│   │   └── UserList.ts
│   └── render.ts
│
├── styles/
│   └── main.css
│
├── types/
│   └── index.ts
│
├── index.ts
└── vite-env.d.ts

tests/
├── borrow.test.ts
├── library.test.ts
├── setup.test.ts
└── validation.test.ts
```

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run start
```

The application will be available at:

```text
http://localhost:9000/
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Code Quality

Run ESLint:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

The project uses Husky to automatically run ESLint and tests before every commit.

## Testing

Unit tests are implemented using Mocha and Chai.

The tests cover key functionality including:

- generic `Library<T>` operations;
- borrowing and returning books;
- required-field validation;
- publication year validation;
- email validation;
- numeric user ID validation.

## Architecture

The application is divided into layers by responsibility.

`models` contains application entities and interfaces.

`services` contains business logic, generic collection management, LocalStorage access and notifications.

`utils` contains reusable validation and ID generation utilities.

`ui` is the only layer that directly works with the DOM.

The HTML file contains only the application root element. All forms, lists, controls, buttons and modal windows are generated programmatically using TypeScript.

## Generic Library

The application uses the generic class:

```ts
Library<T>;
```

It allows the same collection-management logic to be reused for both books and users while preserving TypeScript type safety.

## LocalStorage

Books and users are stored in LocalStorage.

Before saving, class instances are converted to plain data objects. When the page is loaded again, these objects are converted back into `Book` and `User` class instances.

This preserves both application data and class behaviour after page reloads.

# Webpack vs Vite

The project was initially configured using Webpack and later migrated to Vite in a separate `vite-migration` branch.

## Development Server and HMR

Webpack required `webpack-dev-server` and explicit configuration of the development server.

Vite provides a development server out of the box with substantially less configuration. In this project, Vite started noticeably faster and updates during development were more immediate.

For a small client-side TypeScript application, Vite provides a simpler development experience.

## Configuration Complexity

The Webpack version required configuration for:

- entry and output paths;
- TypeScript handling through `ts-loader`;
- CSS handling through `css-loader` and `style-loader`;
- HTML processing through `html-webpack-plugin`;
- development server settings.

Vite required only a small configuration file because TypeScript, CSS imports and development-server behaviour are supported directly.

This significantly reduced the amount of build configuration.

## Production Build

During local testing of this project, the Webpack production build took approximately 1.9 seconds.

After migration, the Vite production build took approximately 0.2 seconds on the same development machine.

Exact build times depend on hardware and project state, but Vite was noticeably faster for this application.

The Vite production output also automatically generates optimized and hashed assets inside the `dist` directory.

## TypeScript Support

Webpack required `ts-loader` to process TypeScript files.

Vite supports TypeScript syntax directly during development and build, so a separate TypeScript loader is not required.

TypeScript is still used separately for type checking and project configuration.

## UI Framework Integration

Bootstrap was installed through npm in both versions.

With Webpack, CSS imports required configured CSS and style loaders.

With Vite, Bootstrap CSS can be imported directly from TypeScript without additional loaders.

Therefore, UI framework integration required less configuration after the migration.

## Plugin Ecosystem

Webpack has a very large and mature loader/plugin ecosystem and provides detailed control over almost every part of the build process.

Vite also has a large plugin ecosystem while providing sensible defaults for modern frontend development.

Webpack can be preferable when a project needs highly specialized build behaviour, while Vite requires less configuration for common modern frontend use cases.

## Conclusion

Both Webpack and Vite successfully supported the application.

Webpack provided detailed control over the build pipeline but required significantly more configuration and additional loaders.

For this relatively small TypeScript SPA, Vite was easier to configure, started faster, produced faster local builds and required fewer dependencies.

For a similar small or medium client-side application, I would prefer Vite because it provides a simpler development workflow while still supporting production builds, TypeScript, CSS imports, npm packages and deployment to GitHub Pages.
