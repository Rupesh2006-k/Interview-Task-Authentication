# 🔐 Authentication API (Node.js + Express + MongoDB)

A simple **Authentication System** built with **Node.js, Express, MongoDB, and JWT**.
It includes **User Registration, Login, Logout, and Profile APIs**.

---

# 🚀 Features

* User Registration
* User Login
* JWT Authentication
* Protected Profile Route
* Logout Functionality
* Environment Variable Configuration

---

# 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT (JSON Web Token)**
* **dotenv**

---

# 📦 Installation

Clone the repository

```
git clone https://github.com/Rupesh2006-k/Interview-Task-Authentication.git
```

Go to project folder

```
cd Interview-Task-Authentication
```

Install dependencies

```
npm install
```

Run the server

```
npm run dev
```

Server will run on:

```
http://localhost:3000
```

---

# ⚙️ Environment Variables

Create a **.env** file in the root directory and add the following variables:

```
PORT=3000
FRONTEND_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
JWT_SECRET_KEY=your_jwt_secret
BASE_URL=http://localhost:3000
EMAIL_VERIFY_SECRET=your_email_verify_secret
```

---

# 📡 API Endpoints

## 1️⃣ Register User

**POST**

```
http://localhost:3000/api/auth/register
```

Body

```
{
"name": "rupesh",
"email": "rupeshkushwaha03032@gmail.com",
"password": "123456"
}
```

---

## 2️⃣ Login User

**POST**

```
http://localhost:3000/api/auth/login
```

Body

```
{
"email": "rupeshkushwaha03032@gmail.com",
"password": "123456"
}
```

Response

```
{
"success": true,
"token": "JWT_TOKEN"
}
```

---

## 3️⃣ Logout User

**POST**

```
http://localhost:3000/api/auth/logout
```

---

## 4️⃣ Get User Profile (Protected Route)

**GET**

```
http://localhost:3000/api/auth/profile
```

Header

```
Authorization: Bearer <token>
```

---

# 🔐 Authentication Flow

1. User registers using **/register**
2. User logs in using **/login**
3. Server returns **JWT Token**
4. Token is stored on frontend
5. Token is sent in headers for protected routes

---

# 📁 Project Structure

```
project
│
├── config
│   └── db.js
│
├── controllers
│   └── authController.js
│
├── middleware
│   └── authMiddleware.js
│
├── models
│   └── userModel.js
│
├── routes
│   └── authRoutes.js
│
├── .env
├── server.js
└── package.json
```

---

# 👨‍💻 Author

**Rupesh Kushwaha**

GitHub
https://github.com/Rupesh2006-k
