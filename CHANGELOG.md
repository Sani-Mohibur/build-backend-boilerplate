# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-08-06

### Added
- **Interactive CLI**: Added `ora` spinners and `chalk` colored output for a polished developer experience.
- **CLI Arguments**: Support for standard `--help` and `--version` flags.
- **Environment Validation**: Added strict startup validation for all environment variables using `Zod` to prevent silent runtime failures.
- **Structured Logging**: Pre-configured `pino` and `pino-pretty` for robust JSON logging in production and readable logs in development.
- **Secure Password Reset**: Implemented short-lived reset tokens and constant-time string comparison (`crypto.timingSafeEqual`) for OTP validation.
- **Node Requirement**: Enforced a strict Node.js engine requirement (`>=18.0.0`).
- **Complete Tooling**: Automatically includes all necessary dev dependencies (`eslint`, `prettier`, etc.) in generated projects.

### Changed
- **Secure Cookies**: Upgraded refresh token cookies to enforce `sameSite: 'strict'`, specific paths, and explicit expiration times.
- **Soft Deletions**: Migrated user deletion from a hard delete to a soft delete (`isDeleted: true`) mechanism.
- **Data Sanitization**: Enhanced the Mongoose `toJSON` transform to natively strip sensitive fields (`password`, `otp`, `__v`) from all API responses.
- **SMTP Optimization**: Moved `nodemailer` transporter creation to the module level for efficient connection pooling.
- **Clean Configuration**: Streamlined `.env.example` into a minimal, production-ready format.
- **Graceful Shutdowns**: Added `SIGTERM` handling to properly disconnect Mongoose before shutting down the Express server.

### Fixed
- **CRITICAL**: Fixed a critical security flaw where refresh tokens were incorrectly signed with the access token's secret and expiry.
- **CRITICAL**: Fixed an invalid CORS configuration (`origin: '*'` with `credentials: true`) that broke browser-based authentication.
- **CRITICAL**: Patched a NoSQL injection and ReDoS vulnerability in the `QueryBuilder` filtering logic.
- **CRITICAL**: Prevented `template/node_modules/` from being bundled in the npm package, massively reducing installation time and size.
- Fixed a crash in the `express-rate-limit` configuration caused by unparseable time windows.
- Fixed synchronous `throw` behavior in the `parseBody` middleware that evaded error handlers.
- Fixed Cloudinary upload validation to properly match file extensions and MIME types.

### Removed
- Removed the deprecated and unused `paginationHelper.ts` (functionality is fully handled by `QueryBuilder`).
- Removed unnecessary React JSX settings and overly aggressive strict property types from the boilerplate `tsconfig.json`.
