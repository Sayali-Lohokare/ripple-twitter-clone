# 🌊 Ripple

### A Twitter-style Social Media Platform — CS613 Advanced Object-Oriented Programming

**Ripple** is a distributed social media platform demonstrating advanced OOP principles, design patterns, and agile methodology. Built with a service-centric architecture, Ripple enables users to share posts, follow others, like/save content, and stay connected through real-time notifications.

Built by **Sayali Lohokare**.
📊 [View Project Presentation (PDF)](Ripple-ppt.pdf)
---

## 📘 Project Overview

Ripple implements a Twitter-style platform where:

* Users can post **text + media messages** (≤ 250 characters)
* Users can **follow and unfollow** other users
* Followers receive **real-time updates and notifications** when followed users post, like, or follow
* Users can **like, save, and comment** on posts
* The system ships as **two interconnected applications**, sharing one backend:
  1. **Backend** — Java Spring Boot REST API (Maven, MongoDB Atlas)
  2. **Frontend** — Ionic React, a single responsive codebase that adapts to mobile and desktop

---

## 🗂️ Repository Structure
ripple-twitter-clone/

├── backend/      → Java Spring Boot + Maven REST API

├── frontend/     → Ionic React (responsive: mobile + desktop)

└── README.md     → This file

---

## ✅ Core Features

* User registration and authentication (JWT)
* Post creation with 250-character limit + image/GIF upload
* Follow / unfollow functionality
* Like / unlike posts
* Saved posts
* Comments on posts
* Real-time feed updates
* Notifications (likes, follows, comments) via Firebase Cloud Messaging
* User profiles with statistics
* Cross-platform deployment (Web, Android APK via Capacitor)

---

## 🏗️ Architecture & Design

### Design Principles
* **Single Responsibility Principle** – Clear separation: Controllers → Services → Repositories
* **Open/Closed Principle** – Services designed for extension without modification
* **Dependency Inversion** – Interface-based abstractions throughout the service layer
* **Code Reuse** – Shared backend service consumed by both web and mobile layouts

### Design Patterns Implemented
| Category | Patterns |
|---|---|
| Architectural | Layered (N-Tier), MVC |
| Creational | Factory Method, Singleton |
| Behavioral | Observer, Strategy |
| Structural | Repository, DTO, Adapter/Gateway |
| Infrastructure | Service Layer, Controller Advice, Filter Chain, Configuration |

---

## 🗄️ Data Model

Ripple uses **MongoDB Atlas** for real-world scalability and cross-session persistence.

### Core Entities
* **User** – id, email, username, password, name, bio, profileImage, followers, following, savedPosts
* **Post** – id, userId, content, imageUrls, likesCount, commentsCount, createdAt
* **Comment** – id, content, postId, userId, createdAt
* **Notification** – id, senderId, receiverId, type, referenceId, read, createdAt

---

## 🛠️ Technology Stack

**Backend**
* Java 17, Spring Boot, Spring Security, Spring Data MongoDB
* MongoDB Atlas
* AWS S3 (media storage)
* Firebase Cloud Messaging (push notifications)
* Maven

**Frontend**
* Ionic React 8, React 19
* Tailwind CSS
* Vite 5
* Capacitor (Android build)

**Tools**
* Postman (API testing — collection included)
* Jira (sprint planning)
* Git & GitHub

---

## 🚀 Getting Started

### Prerequisites
* Java 17+
* Node.js 18+ and npm
* Maven 3.8+
* MongoDB (local or Atlas connection string)

### Backend Setup

```bash
git clone https://github.com/Sayali-Lohokare/ripple-twitter-clone.git
cd ripple-twitter-clone/backend

# Configure src/main/resources/application.properties
# - MongoDB connection string
# - JWT secret
# - AWS S3 credentials (optional)
# - Firebase service account (optional)

mvn clean install
mvn spring-boot:run
```

Backend runs at: `http://localhost:8080`

### Frontend Setup

```bash
cd ripple-twitter-clone/frontend

npm install
npm run dev
```

Frontend runs at: `http://localhost:5173` (default Vite port)

### Android Build (optional)

```bash
cd ripple-twitter-clone/frontend
npx cap add android
npx cap sync
npx cap open android
```

---

## 📡 API Endpoints

### Authentication
* `POST /api/users/register` – User registration
* `POST /api/users/login` – User login (returns JWT + user id)

### Users
* `GET /api/users/{userId}` – Get user profile
* `PUT /api/users/{userId}/follow/{targetId}` – Follow a user
* `PUT /api/users/{userId}/unfollow/{targetId}` – Unfollow a user
* `GET /api/users/search` – Search users
* `POST /api/users/save` – Save a post

### Posts
* `POST /api/posts` – Create a post (≤ 250 characters)
* `GET /api/posts/all` – Get all posts
* `GET /api/posts/{postId}` – Get a specific post
* `DELETE /api/posts/{postId}` – Delete a post
* `POST /api/posts/{postId}/like` – Like a post
* `POST /api/posts/{postId}/unlike` – Unlike a post

### Media
* `POST /api/media/upload` – Upload image/GIF (multipart form-data)

### Notifications
* `GET /api/notifications` – Get notifications
* `POST /api/notifications/{id}/read` – Mark notification as read
* `POST /api/notifications/read-all` – Mark all as read

---

## 📊 Testing

A Postman collection (`postman.json`) is included in the `backend/` folder covering:
* User registration and login (auto-saves token + id via test scripts)
* Post creation and retrieval
* Follow/unfollow flows
* Media upload

Import it into Postman and run requests in order — login requests automatically populate collection variables (`userA_token`, `userA_id`, etc.) used by later requests.

---

## 🔮 Future Enhancements

* WebSocket integration for true real-time updates
* Direct messaging between users
* Advanced search and discovery
* Redis caching layer for feed performance
* CDN integration for media delivery
* Migration to a microservices architecture

---

## 🎓 Academic Context

This project was developed for **CS613 Advanced Object-Oriented Programming**, demonstrating:
* SOLID principles applied across a layered backend
* Multiple design patterns in a production-style architecture
* A single responsive frontend codebase serving both mobile and desktop clients
* Agile/Scrum methodology with Jira-tracked sprints

---

## 📝 License

This project was developed as part of an academic module assignment.

---

**Ripple** – Where every post creates waves 🌊
