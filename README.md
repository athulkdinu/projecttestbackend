# Backend - Product App API

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Create .env File
Create a `.env` file in the `backend` folder:

```env
PORT=3000
DATABASE=mongodb+srv://username:password@cluster.mongodb.net/productapp?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. Get MongoDB Atlas Connection String
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your database password
5. Add to `.env` file as `DATABASE`

### 4. Run the Server
```bash
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Authentication (`/api/auth`)

#### Register
- **POST** `/api/auth/register`
- **Body**: `{ "email": "user@example.com", "password": "password123" }`

#### Login
- **POST** `/api/auth/login`
- **Body**: `{ "email": "user@example.com", "password": "password123" }`

### Products (`/api/products`) - Protected Routes

All product routes require JWT token in Authorization header: `Bearer <token>`

#### Get Saved Products
- **GET** `/api/products/saved`
- **Headers**: `Authorization: Bearer <token>`

#### Save Product
- **POST** `/api/products/save`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "productId": 1, "title": "Product", "price": 99.99, "thumbnail": "url" }`

#### Remove Saved Product
- **DELETE** `/api/products/saved/:productId`
- **Headers**: `Authorization: Bearer <token>`

## Project Structure

```
backend/
├── connection/
│   └── db.js              # MongoDB connection
├── controller/
│   ├── authController.js  # Auth logic
│   └── productController.js # Product logic
├── middleware/
│   └── jwtMiddleware.js    # JWT authentication
├── model/
│   ├── User.js            # User model
│   └── SavedProduct.js    # Saved product model
├── routes/
│   ├── authRoutes.js      # Auth routes
│   └── productRoutes.js   # Product routes
├── router.js              # Main router
├── index.js               # Server entry point
└── .env                   # Environment variables
```

## Features

✅ JWT Authentication
✅ Password hashing with bcrypt
✅ MongoDB integration
✅ Protected routes
✅ Duplicate prevention
✅ User-specific data access

