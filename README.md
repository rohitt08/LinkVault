# LinkVault 2.0 🔗

LinkVault is a premium, high-performance web application designed for shortening URLs and securely extracting public media downloads in one seamless experience.

![LinkVault Preview](./frontend/src/assets/hero.png)

## ✨ Core Features

* **Advanced URL Shortening**: Convert long, clunky URLs into sleek, shareable links.
* **Custom Aliases**: Create personalized, branded links instead of random strings.
* **Password Protection**: Secure your shortened links with a password so only authorized users can unlock them.
* **Expiration Control**: Set precise time limits on your links before they automatically expire.
* **Media Inspector**: Extract high-quality assets, thumbnails, and direct download links from public media.
* **User Accounts & History**: Securely sign up and log in (via JWT Authentication) to save and manage your entire link history across all your devices.

## 📂 Project Structure

This project is structured as a modern full-stack monorepo, cleanly separating the client interface from the API server.

### `frontend/`
The user interface and client-side logic.
* **Tech Stack**: React 18, Vite, TypeScript, TailwindCSS, Lucide Icons.
* **`src/components/`**: Reusable UI blocks (Navbar, HeroSection, URL Shortener forms, etc.) featuring a custom "Electric Indigo" glassmorphism design system.
* **`src/pages/`**: Full route views like `Home`, `Login`, and `SignUp`.
* **`src/services/` & `src/hooks/`**: API integration and custom React hooks for state management.

### `backend/`
The robust REST API and database management system.
* **Tech Stack**: Java, Spring Boot 3, Spring Security (JWT), Spring Data JPA, H2 Database (or MySQL).
* **`src/main/java/com/linkvault/backend/controller/`**: REST endpoints for Authentication and URL processing.
* **`src/main/java/com/linkvault/backend/security/`**: JWT-based authentication flow and user session management.
* **`src/main/java/com/linkvault/backend/service/`**: Core business logic for link hashing, expiration validation, and security checking.
* **`src/main/java/com/linkvault/backend/model/`**: JPA Entities mapping directly to database tables.

## 🚀 Getting Started

To run this project locally, you will need to start both the backend and frontend servers.

### 1. Start the Backend
Open a terminal and navigate to the backend directory:
```bash
cd backend
./mvnw clean spring-boot:run
```
The Spring Boot server will start on `http://localhost:8080`.

### 2. Start the Frontend
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
The Vite development server will start on `http://localhost:5173`. Open this URL in your browser to view the app!

## 🔒 Security Note
* Sensitive configuration data (like database credentials and JWT secrets) are safely ignored via `.gitignore` using `.env` or `application-secret.properties`. Never commit actual secrets to the repository.
