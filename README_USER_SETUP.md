# How to Add Users - Guide

## Method 1: Using Register API (RECOMMENDED) ✅

This is the **best and proper way** to add users. It handles password hashing automatically.

### Option A: Using Frontend
1. Start your frontend: `cd frontend && npm run dev`
2. Go to login page
3. Use the register functionality (if you have it) or use Postman/Thunder Client

### Option B: Using Postman/Thunder Client/curl

**POST Request:**
```
URL: http://localhost:3000/api/auth/register
Method: POST
Headers: Content-Type: application/json
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "test@example.com"
  }
}
```

### Option C: Using curl (Terminal)
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## Method 2: Using Script (For Testing) 🧪

I've created a script to add test users directly to MongoDB.

### Steps:
1. Edit `backend/scripts/createUser.js` and change the email/password
2. Run the script:
```bash
cd backend
node scripts/createUser.js
```

**Note:** Password will be automatically hashed by the script.

---

## Method 3: Direct MongoDB (NOT RECOMMENDED) ⚠️

**Why NOT recommended:**
- ❌ You need to manually hash the password
- ❌ Easy to make mistakes
- ❌ Doesn't follow the application flow

**If you still want to do it:**

1. Connect to MongoDB Atlas or local MongoDB
2. Go to your database → `users` collection
3. Insert document:
```json
{
  "email": "test@example.com",
  "password": "$2a$10$hashedpasswordhere...",  // Must be bcrypt hashed!
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**To hash password manually:**
```javascript
const bcrypt = require("bcryptjs");
const hashed = await bcrypt.hash("password123", 10);
console.log(hashed); // Use this in MongoDB
```

---

## Quick Test User Setup

### Recommended Test Credentials:
```
Email: admin@test.com
Password: admin123
```

### Create via API:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}'
```

---

## Comparison

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| **Register API** | ✅ Automatic hashing<br>✅ Validation<br>✅ Returns token | None | Production & Testing |
| **Script** | ✅ Quick for testing<br>✅ Automated | ⚠️ Need to edit file | Development |
| **Direct MongoDB** | ✅ Direct control | ❌ Manual hashing<br>❌ Error-prone | Not recommended |

---

## Recommendation

**Use Method 1 (Register API)** - It's the proper way and handles everything automatically!

