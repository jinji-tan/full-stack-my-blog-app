# 🚀 Full-Stack Blog Application

A modern, high-performance blog platform built with **.NET 10**, **React 19**, and **Dapper**. This application demonstrates a clean architecture, secure JWT authentication, and a rich, interactive user interface.

![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![.NET](https://img.shields.io/badge/.NET-10.0-512BD4?style=for-the-badge&logo=dotnet)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2022-CC2927?style=for-the-badge&logo=microsoft-sql-server)

---

## ✨ Key Features

- **🔐 Secure Authentication**: Robust JWT-based Login and Registration with real-time validation.
- **📝 Post Management**: Full CRUD capabilities for blog posts with Vite-powered frontend performance.
- **💬 Engagement Engine**: Nested commenting system allowing for replies and deep conversations.
- **🎨 Premium UI**: Styled with Vanilla CSS (Modern design patterns) for a sleek, responsive experience.
- **⚡ High Performance**: Utilizing Dapper for lightning-fast database interactions and raw SQL control.

---

## 🎬 Visual Demos

### 🛡️ Register & Login

#### Core Flow
| Registration Success | Login Success | Logout |
| :---: | :---: | :---: |
| ![Register Success](assets/demos/register-success-demo.gif) | ![Login Success](assets/demos/login-success-demo.gif) | ![Logout](assets/demos/log-out-demo.gif) |

#### Validation & Errors
| Field Errors | Confirm Password Error | User Already Exists |
| :---: | :---: | :---: |
| ![Field Error](assets/demos/register-field-error-demo.gif) | ![Confirm Password](assets/demos/register-confirm-password-error-demo.gif) | ![User Exists](assets/demos/register-user-exist-demo.gif) |

---

### ✍️ Post

| Creating a Post | Editing a Post | Deleting a Post |
| :---: | :---: | :---: |
| ![Post Creation](assets/demos/post-demo.gif) | ![Post Edit](assets/demos/edit-post-demo.gif) | ![Post Delete](assets/demos/delete-post-demo.gif) |

---

### 🗣️ Comment and Reply

| Commenting | Replying | Editing Reply | Deleting Comment |
| :---: | :---: | :---: | :---: |
| ![Commenting](assets/demos/user-comment-demo.gif) | ![Replying](assets/demos/reply-comment-demo.gif) | ![Edit Reply](assets/demos/edit-reply-demo.gif) | ![Delete Comment](assets/demos/delete-comment-demo.gif) |


---

## 🛠️ Tech Stack

### Backend
- **Framework**: .NET 10.0 API
- **ORM**: Dapper (High-performance mapping)
- **Database**: SQL Server
- **Security**: JWT Bearer Authentication / BCrypt Password Hashing

![API Documentation](assets/demos/api.png)

### Frontend
- **Framework**: React 19 (Vite)
- **State Management**: React Hooks
- **Icons**: Lucide React
- **Styling**: Modern Vanilla CSS

---

## 🚀 Getting Started

### Prerequisites
- .NET 10 SDK
- Node.js (v20+)
- SQL Server

### 1. Database Setup
Run the SQL script located at `api/Database/myblog.sql` in your SQL Server instance to initialize the schema and tables.

### 2. Backend Configuration
Update `api/appsettings.json` with your connection string:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=MyBlogAppDb;..."
}
```

### 3. Run the Application
```bash
# Start API (from /api)
dotnet run

# Start Frontend (from /frontend/my-blog-app)
npm install
npm run dev
```

---

## 👤 Author
**Louis Tan**

---