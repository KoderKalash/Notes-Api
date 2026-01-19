<div align="center">

# Notes API

### Secure REST API for Personal Note Management

A production-ready backend service built with Node.js, Express, and MongoDB, demonstrating authentication flows, file handling, and defensive API design.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

[Features](#features) • [Architecture](#architecture) • [API Documentation](#api-documentation) • [Getting Started](#getting-started) • [Security](#security)

</div>

---

## Overview

Notes API is a **backend service** for managing personal notes with secure authentication, file uploads, and owner-based authorization. Built to demonstrate real-world backend patterns including JWT authentication, resource ownership validation, and multi-part form handling.

### Key Highlights

- **Secure Authentication** — JWT-based auth with bcrypt password hashing
- **Owner-Based Authorization** — Users can only access and modify their own notes
- **File Upload Support** — Image handling using Multer with static file serving
- **Production Patterns** — Rate limiting, CORS, security headers, and error handling
- **Clean Architecture** — MVC structure with organized controllers, models, and routes

---

## Features

### 🔐 Authentication & Security

- User registration and login endpoints
- Secure password hashing with bcrypt
- JWT token generation and validation
- Protected routes requiring authentication
- Owner-based authorization preventing cross-user access

### 📝 Notes Management

- Full CRUD operations for notes
- Search functionality across note content
- Pagination support for large datasets
- User-scoped data (notes belong to specific users)
- Owner validation on all mutating operations

### 📁 File Handling

- Image upload support via Multer
- Multipart form-data processing
- Static file serving from uploads directory
- File validation and size limits

### ⚙️ Backend Infrastructure

- **CORS** enabled for cross-origin requests
- **Helmet** for security headers
- **Rate limiting** to prevent abuse
- **MVC architecture** for maintainability
- **Environment-based configuration**

---

## Architecture

### Tech Stack

| Layer          | Technology  |
| -------------- | ----------- |
| Runtime        | Node.js     |
| Framework      | Express.js  |
| Database       | MongoDB     |
| ODM            | Mongoose    |
| Authentication | JWT         |
| Encryption     | bcryptjs    |
| File Uploads   | Multer      |
| Containerization | Docker (optional) |

### Project Structure
```text
src/
├── controllers/      # Request handlers and business logic
├── models/           # Mongoose schemas (User, Note)
├── routes/           # API endpoint definitions
├── middleware/       # Auth, error handling, file upload
├── uploads/          # Static file storage
├── config/           # Environment configuration
└── server.js         # Application entry point
```

### Authorization Model

Notes API implements **ownership-based authorization**:

1. **Authentication** — JWT validates user identity
2. **Resource Ownership** — Notes are linked to user IDs
3. **Authorization Check** — Operations verify requesting user owns the resource
4. **Scope Isolation** — Users can only query their own notes

This prevents:
- Cross-user data access
- Unauthorized note modifications
- Information leakage through queries

---

## API Documentation

### Authentication

| Method | Endpoint          | Description                |
| ------ | ----------------- | -------------------------- |
| `POST` | `/api/auth/register` | Create new user account |
| `POST` | `/api/auth/login`    | Authenticate and receive JWT |
| `GET`  | `/api/auth/me`       | Get current user profile (protected) |

### Notes

| Method   | Endpoint           | Description                     | Authorization |
| -------- | ------------------ | ------------------------------- | ------------- |
| `GET`    | `/api/notes`       | List user's notes (with pagination/search) | Owner only |
| `POST`   | `/api/notes`       | Create new note                 | Authenticated |
| `GET`    | `/api/notes/:id`   | Get specific note               | Owner only    |
| `PUT`    | `/api/notes/:id`   | Update note                     | Owner only    |
| `DELETE` | `/api/notes/:id`   | Delete note                     | Owner only    |

### Query Parameters

**Pagination:**
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 10)

**Search:**
- `search` — Text search across note content

Example: `GET /api/notes?page=2&limit=20&search=meeting`

### File Upload

Upload images with notes using multipart form-data:
```bash
POST /api/notes
Content-Type: multipart/form-data

{
  "title": "Note title",
  "content": "Note content",
  "image": <file>
}
```

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Docker (optional, for MongoDB)

### Installation
```bash
# Clone the repository
git clone https://github.com/KoderKalash/Notes-Api.git

# Navigate to project directory
cd Notes-Api

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:
```env
PORT=4000
MONGO_URL=mongodb://localhost:27017/notesdb
JWT_SECRET=your_secure_jwt_secret
TOKEN_EXPIRES_IN=7d
NODE_ENV=development
```

### Running the Application

**Option 1: Local MongoDB**
```bash
# Start MongoDB using Docker
docker compose up -d

# Start the server
npm run dev
```

**Option 2: MongoDB Atlas**
```bash
# Update MONGO_URL in .env with your Atlas connection string
# Start the server
npm run dev
```

The API will be available at `http://localhost:4000`

---

## Security

### Authentication Flow

1. User registers with email and password
2. Password is hashed using bcrypt (10+ salt rounds)
3. JWT token generated on successful login
4. Token sent in `Authorization: Bearer <token>` header
5. Middleware validates token and extracts user context

### Data Protection

- **Password Storage**: Bcrypt hashing, never stored in plaintext
- **Token Security**: JWT with configurable expiration
- **Authorization**: Owner-based access control on all note operations
- **Rate Limiting**: Prevents brute force and abuse
- **Security Headers**: Helmet middleware for common vulnerabilities
- **CORS**: Configured for cross-origin access control

### Best Practices

- ✅ Passwords never returned in API responses
- ✅ JWT secret stored in environment variables
- ✅ Owner verification before all mutations
- ✅ File upload validation and size limits
- ✅ Error messages don't leak sensitive information
- ✅ MongoDB injection prevention via Mongoose

---

## What I Learned

### Backend Architecture
- Structuring Node.js applications with MVC pattern
- Separating concerns between routes, controllers, and models
- Building RESTful APIs with clear resource boundaries

### Authentication & Authorization
- Implementing JWT-based authentication flows
- Secure password hashing with bcrypt
- Owner-based authorization and resource scoping
- Protecting routes with middleware

### File Handling
- Processing multipart form-data with Multer
- Managing file uploads and static file serving
- Validating file types and implementing size limits

### Security & Production Patterns
- Rate limiting to prevent API abuse
- Security headers with Helmet
- CORS configuration for client applications
- Environment-based configuration management

### Database & Data Modeling
- Working with MongoDB and Mongoose ODM
- Designing schemas with relationships (users → notes)
- Implementing pagination and search functionality

---

## Contributing

Feedback and suggestions are welcome. Feel free to open issues or submit pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## License

This project is open source and available under the MIT License.

---

## Contact

For questions or feedback:

- **GitHub**: [@KoderKalash](https://github.com/KoderKalash)
- **LinkedIn**: [Kalash Sharma](https://linkedin.com/in/kalas-sharma)

---

<div align="center">

**Built with attention to security and clean architecture**

</div>
