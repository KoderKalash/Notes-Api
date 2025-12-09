# 📝 Notes API — Backend Project (Node.js + Express + MongoDB)

A fully functional backend API built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**.  
This project demonstrates real-world backend concepts such as authentication, CRUD operations, file uploads, authorization, pagination, and secure data handling.

---

## 🔥 Features

### 🔐 Authentication & Authorization
- User registration and login
- Secure password hashing using **bcrypt**
- **JWT-based authentication**
- Protected routes
- Owner-based authorization (users can modify only their own notes)

### 📝 Notes Management
- Create, read, update, delete notes
- Search notes by text  
- Pagination support
- Each note belongs to a specific user

### 📁 File Uploads
- Upload images using **Multer**
- Static file serving (e.g., `uploads/` folder)

### ⚙️ Additional Features
- CORS enabled
- Security with Helmet
- Rate limiting
- Organized MVC structure

---

## 🚀 Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT** for authentication
- **bcryptjs** for hashing passwords
- **Multer** for file uploads
- **Docker** (optional) for MongoDB
- **dotenv** for environment variables

---

## 📦 Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/KoderKalash/Notes-Api
cd notes-api
```

### Install Dependencies
```bash
npm install
```

### Create a .env File
```bash
PORT=4000
MONGO_URL=mongodb://localhost:27017/notesdb
JWT_SECRET=your_secret_key
TOKEN_EXPIRES_IN=7d
```

### Start MongoDB (Docker)
```bash
docker compose up -d
```
Or connect using MongoDB Atlas.

### Start the server
```bash
npm run dev
```

## 📌 API Endpoints
### 🔐 Authentication
| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| POST   | `/api/auth/register` | Register new user                 |
| POST   | `/api/auth/login`    | Login & receive JWT               |
| GET    | `/api/auth/me`       | Get current user (requires token) |


### 📝 Notes
| Method | Endpoint         | Description                            |
| ------ | ---------------- | -------------------------------------- |
| GET    | `/api/notes`     | Get user’s notes (pagination + search) |
| POST   | `/api/notes`     | Create a new note                      |
| GET    | `/api/notes/:id` | Get a specific note                    |
| PUT    | `/api/notes/:id` | Update a note                          |
| DELETE | `/api/notes/:id` | Delete a note                          |


### 📁 File Upload
Upload images with:

```bash
POST /api/notes
Content-Type: multipart/form-data
```

### 🔧 Environment Variables

| Variable           | Description               |
| ------------------ | ------------------------- |
| `PORT`             | Server port               |
| `MONGO_URL`        | MongoDB connection string |
| `JWT_SECRET`       | Secret for JWT signing    |
| `TOKEN_EXPIRES_IN` | Token expiry time         |


## 🧠 What I Learned

<li> Structuring backend applications with MVC

<li>Building and protecting REST APIs

<li>Managing images and form-data

<li>Handling authentication and secure password storage

<li>Working with MongoDB using Mongoose

<li>Understanding authorization logic

<li>Rate limiting and backend security basics

## 🤝 Contributing
Pull requests are welcome!
Feel free to open issues for improvements or bugs.

## 📬 Contact

If you have feedback or suggestions, reach out via LinkedIn or GitHub.

