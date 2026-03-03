# 🚀 build-backend-boilerplate

A production-ready CLI tool to instantly generate a robust Node.js, Express, TypeScript, and MongoDB backend boilerplate. 

Say goodbye to hours of setup. This boilerplate comes pre-configured with a scalable modular architecture, advanced error handling, JWT authentication, Zod validation, and more.

## 📦 Quick Start

Run the following command in your terminal to generate a new backend project:

```bash
npx build-backend-boilerplate my-app

```

**Next steps to start your server:**

1. Navigate into your new project folder:
```bash
cd my-app

```


2. Open the automatically generated `.env` file and paste in your MongoDB connection string.
3. Start the development server:
```bash
npm run dev

```

## ✨ Features

* **Modular Architecture:** Clean separation of concerns (Controllers, Services, Routes, Models) to scale easily.
* **Advanced Error Handling:** Global error handling built-in for Zod validation, Mongoose CastErrors, and Duplicate key errors.
* **Authentication Ready:** JWT helpers, bcrypt password hashing, and role-based auth middlewares included.
* **File Uploads:** Pre-configured `multer` and `cloudinary` integration for handling media files.
* **Email Support:** Built-in utility for `nodemailer` with OTP templates.
* **API Utilities:** Includes reusable `catchAsync`, `sendResponse`, and a powerful `QueryBuilder` for easy pagination, sorting, and filtering.
* **Developer Experience:** Fully set up with TypeScript, ESLint, Prettier, and `ts-node-dev` for hot reloading.

## 📂 Folder Structure

```text
src/
├── app/
│   ├── builder/        # QueryBuilder for advanced filtering/pagination
│   ├── config/         # Environment variables configuration
│   ├── errors/         # Custom AppError and Zod/Mongoose error handlers
│   ├── helpers/        # JWT and Pagination helpers
│   ├── interfaces/     # Global TypeScript interfaces
│   ├── middlewares/    # Auth, Validation, GlobalErrorHandler, NotFound
│   ├── modules/        # Modular domain-driven features
│   │   ├── auth/       # Auth controller, service, routes
│   │   └── user/       # User controller, service, model, validation
│   ├── routes/         # Global API router
│   └── utils/          # catchAsync, fileUploader, sendEmail, sendResponse
├── app.ts              # Express app setup and middleware registration
└── server.ts           # Database connection and server initialization

```

## 📜 Available Scripts

Once your project is generated, you can run the following commands:

* `npm run dev` - Starts the development server with `ts-node-dev` and hot reloading.
* `npm run build` - Compiles the TypeScript code into the `dist` folder.
* `npm run start` - Starts the production server using the compiled `dist/server.js`.
* `npm run lint` - Runs ESLint to check for code issues.
* `npm run lint:fix` - Automatically fixes ESLint errors.
* `npm run prettier` - Formats your code using Prettier.

## ⚙️ Environment Variables

The CLI automatically copies the `.env.example` file into a new `.env` file for you. Make sure to update it with your actual credentials before starting the server:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_mongodb_connection_string_here

# Add your JWT secrets, Cloudinary keys, and Nodemailer credentials below

```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Sani-Mohibur/build-backend-boilerplate/issues).
