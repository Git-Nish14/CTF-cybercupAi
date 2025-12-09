# CTF-Cybercup.ai Challenge Platform

## 1\. Project Overview

**CTF-Cybercup.ai** is a full-stack Capture The Flag (CTF) competition platform designed to facilitate cybersecurity challenges. The application features a dual-interface architecture: a **User Side** for participants to view challenges, submit flags, and track progress on a leaderboard, and an **Admin Side** for managing challenges, users, and viewing system statistics.

The system is containerized using Docker and implements secure authentication and data management practices.

-----

## 2\. Technology Stack

### **Frontend (Client)**

  * **Framework:** Next.js 16.0.7 (App Router structure)
  * **Library:** React 19.2.0
  * **Styling:** Tailwind CSS v4.1.17
  * **State Management:** React Context API (`AuthContext`)
  * **Notifications:** React Toastify
  * **Icons:** Inline SVG icons

### **Backend (Server)**

  * **Runtime:** Node.js
  * **Framework:** Express.js 5.2.1
  * **Database ODM:** Mongoose 9.0.1
  * **Authentication:** `jsonwebtoken` (JWT) and `google-auth-library`
  * **Security:** `bcryptjs` (Password hashing), `cors`, `cookie-parser`
  * **Email Services:** `nodemailer` (for support forms)

### **Infrastructure & DevOps**

  * **Database:** MongoDB
  * **Containerization:** Docker & Docker Compose
  * **Environment Management:** `dotenv`

-----

## 3\. System Architecture

The application follows a client-server architecture orchestrated via Docker Compose.

### **Docker Configuration (`docker-compose.yml`)**

  * **Service 1: `server` (Backend)**
      * Runs on Port `5000`.
      * Build context: `./server`.
      * Environment: Production mode.
  * **Service 2: `client` (Frontend)**
      * Runs on Port `3000`.
      * Build context: `./client`.
      * Depends on the `server` service.
      * Environment variable `BACKEND_URL` is set to `http://server:5000` for internal container networking.

### **Client-Server Communication**

  * **Proxying:** The Next.js client is configured via `next.config.mjs` to rewrite requests starting with `/api/` to the backend server.
  * **API Wrapper:** A centralized `apiRequest` utility (`client/lib/api.js`) handles HTTP requests, automatically including credentials (cookies) and parsing JSON responses.

-----

## 4\. Data Modeling (Database Schema)

The database utilizes MongoDB with the following schemas defined in the backend:

### **1. User (`User.js`)**

Stores account information and role-based access control.

  * `name`: String (Required)
  * `email`: String (Required, Unique)
  * `passwordHash`: String (Hashed password for local auth)
  * `isAdmin`: Boolean (Default: `false`)
  * `authProvider`: Enum [`local`, `google`]
  * `googleId`: String (For OAuth)
  * `avatar`: String

### **2. Problem (`Problem.js`)**

RepCXresents the CTF challenges managed by admins.

  * `title`: String
  * `description`: String
  * `flagAnswer`: String (The secret flag users must find)
  * `difficulty`: Enum [`easy`, `medium`, `hard`]
  * `createdBy`: ObjectId (Reference to Admin User)
  * `timestamps`: Included

### **3. Attempt (`Attempt.js`)**

Tracks user submissions and solves.

  * `userId`: ObjectId (Reference to User)
  * `problemId`: ObjectId (Reference to Problem)
  * `answers`: Array of Strings (Submitted flags)
  * `result`: Enum [`correct`, `incorrect`]
  * **Indexes:**
      * Compound index on `{ userId: 1, problemId: 1, result: 1 }` with a unique partial filter to ensure a user cannot mark a problem as "correct" more than once.

-----

## 5\. Key Features & Implementation Details

### **A. Authentication & Security**

  * **Methods:** Supports both Local (Email/Password) and Google OAuth login.
  * **Token Management:**
      * Upon login, a JWT is signed containing `userId` and `isAdmin` status.
      * The token is stored in a secure **HttpOnly Cookie** (`setTokenCookie` in `authRoutes.js`) to prevent XSS attacks accessing the token.
  * **Route Protection (Frontend):**
      * `client/proxy.js` (Next.js Middleware) intercepts requests.
      * Redirects unauthenticated users to `/login` if accessing protected routes.
      * Redirects non-admin users to `/challenges` if attempting to access `/admin`.
  * **Route Protection (Backend):**
      * `auth` middleware verifies the JWT from cookies.
      * `adminOnly` middleware checks if `req.user.isAdmin` is true.

### **B. Admin Dashboard**

Located at `/admin`, this interface allows administrators to:

1.  **Overview Stats:** View total users, problems, attempts, and solve rates (via `/api/stats/overview`).
2.  **Problem Management:**
      * **Create:** Form to input title, description, flag, and difficulty (`/admin/problems/new`).
      * **Edit/Delete:** Modify or remove existing challenges.
3.  **User Management:**
      * List all users with search and filter capabilities (`/admin/users`).
      * View specific user details, including their attempt history and success/fail rates.

### **C. User Experience**

1.  **Challenge Interface:**
      * **Browsing:** Users can view challenges filtered by difficulty (Easy, Medium, Hard) or via search.
      * **Visual Indicators:** Solved challenges are marked with a "COMPLETED" badge.
      * **Submission:** Users submit flags on the Challenge Detail page. Real-time feedback (Correct/Incorrect) is provided via API response.
2.  **Leaderboard:**
      * Aggregates data via MongoDB pipeline (`leaderboardRoutes.js`).
      * Ranks users based on `solvedCount` (descending) and `totalAttempts` (ascending for tie-breaking).
3.  **Documentation:** A `/docs` page provides guides on "Getting Started," "Scoring," and "Categories" using an intersection observer for scroll animations.

### **D. Support System**

  * Users can submit support tickets via `/support`.
  * The backend (`/api/support`) processes these requests and uses `nodemailer` to send email notifications to the admin and an auto-reply to the user.

-----

## 6\. API Specification

### **Auth Routes** (`/api/auth`)

  * `POST /register`: Create a new local account.
  * `POST /login`: Authenticate local account.
  * `POST /google`: Authenticate via Google ID token.
  * `POST /logout`: Clear auth cookie.
  * `GET /me`: Get current user context.

### **Problem Routes** (`/api/problems`)

  * `GET /`: Get all problems (public, excludes `flagAnswer`).
  * `GET /:id`: Get specific problem details.
  * `GET /admin/all`: Get all problems with full details (Admin only).
  * `POST /`: Create problem (Admin only).
  * `PUT /:id`: Update problem (Admin only).
  * `DELETE /:id`: Delete problem (Admin only).

### **Attempt Routes** (`/api/attempts`)

  * `POST /:problemId`: Submit a flag for validation.
  * `GET /mine/solved`: Get list of problem IDs solved by current user.
  * `GET /mine/:problemId`: Get history of attempts for a specific problem.

### **Leaderboard & Stats**

  * `GET /api/leaderboard`: Returns aggregated ranking data.
  * `GET /api/stats/overview`: Returns system-wide counts (Admin only).

-----

## 7\. Setup & Deployment

### **Prerequisites**

  * Docker and Docker Compose installed.
  * Environment variables configured (as seen in `server/.env.docker` reference).

### **Installation Instructions**

Based on the `docker-compose.yml` file, the application is designed to be brought up with a single command:

1.  **Build and Run:**
    ```bash
    docker-compose up --build
    ```
2.  **Access:**
      * **Frontend:** Accessible at `http://localhost:3000`
      * **Backend:** Accessible at `http://localhost:5000`

### **Configuration**

The application relies on specific environment variables (implied from code usage):

  * `MONGO_URI`: Database connection string.
  * `JWT_SECRET`: For signing auth tokens.
  * `GOOGLE_CLIENT_ID`: For OAuth integration.
  * `EMAIL_USER` / `EMAIL_PASSWORD`: For NodeMailer support functionality.

-----

## 8\. Code Quality & Architecture Highlights

  * **Separation of Concerns:** Clear division between Client (UI/UX) and Server (Business Logic/DB).
  * **Modern React:** Utilization of React Hooks (`useAuth`, `useEffect`, `useState`, `useRef`) and Functional Components.
  * **Responsive Design:** Use of Tailwind CSS for mobile-responsive layouts (e.g., Mobile Menu in `Navbar.jsx`).
  * **Robust Middleware:** Centralized auth verification prevents code duplication in route handlers.
  * **Aggregation Pipelines:** Efficient use of MongoDB aggregation for calculating leaderboard stats rather than processing in memory.
