# Product Requirement Document (PRD)

## LIVE Q&A PLATFORM BACKEND (STREAM-CHAT)
**Version:** 1.0.0  
**Product Type:** Backend API for STREAM-CHAT

STREAM-CHAT is a RESTful API backend designed to power a real-time Q&A platform. It enables admins to create and manage chatrooms, collect and moderate questions, and handle priority paid messages (SuperChat) using Razorpay integration.

---

## 1. Product Overview

SuperChat provides the backend infrastructure for a live Q&A platform, supporting real-time messaging, chatroom management, admin controls, and payment processing for priority questions.

---

## 2. Target Users

- **Admin:**  
  - Create and manage chatrooms for Q&A sessions  
  - Moderate questions and control session status

- **Participants:**  
  - Join chatrooms and submit questions  
  - Use SuperChat for priority paid questions

---

## 3. Core Features

### 3.1 User Authentication (Admin Only)
- Google OAuth login/signup for admin access

### 3.2 Chatroom Management
- **Create Chatroom:** Admin can create new chatrooms with expiry
- **List Chatrooms:** Admin can view their chatrooms
- **Chatroom Details:** Fetch details of a specific chatroom
- **Update Chatroom:** Toggle live status
- **Delete Chatroom:** Remove chatroom

### 3.3 Question Management
- **Send Message:** Users can submit questions (normal or SuperChat)
- **List Messages:** Fetch all questions for a chatroom
- **Mark as Done:** Admin can mark questions as answered

### 3.4 SuperChat (Paid Priority Questions)
- **Payment Integration:** Razorpay for paid priority questions
- **Order Creation & Verification:** Secure payment flow and message creation

### 3.5 System Health
- Health check endpoint for system status monitoring

---

## 4. Technical Specification

### Authentication Routes (`/api/v1/users`)
- `GET /signout` – Admin logout
- `GET /getme` – Get current admin profile

### Chatroom Routes (`/api/v1/chatroom`)
- `POST /` – Create chatroom (admin only)
- `GET /` – List admin's chatrooms
- `GET /:slug` – Get chatroom by slug
- `PUT /:id` – Toggle live status (admin only)
- `DELETE /:id` – Delete chatroom (admin only)

### Message Routes (`/api/v1/messages`)
- `GET /` – List messages for a chatroom
- `POST /send` – Send a question (normal or SuperChat)

### Payment Routes (`/api/v1/payments`)
- `POST /create-order` – Create Razorpay order for SuperChat
- `POST /verify-payment` – Verify payment and create SuperChat message

### System Health
- (Add endpoint as needed for health/status monitoring)

---

## 5. Technology Stack

- **Node.js** with **Express.js**
- **MongoDB** (Mongoose ODM)
- **Passport.js** (Google OAuth)
- **Socket.io** (Real-time messaging)
- **Razorpay** (Payment integration)

---

## 6. Environment Variables

See [.env.sample] for required configuration.

---

## 7. Folder Structure

See [src/] for source code organization.

---

## 8. Getting Started

1. Install dependencies:  
   `npm install`
2. Configure `.env` file
3. Start development server:  
   `npm run dev`

---

## 9. API Documentation

Refer to route files in [src/routes/v1/] for endpoint details.

---

## 10. License

MIT (see [package.json](e:\3 Code\Major