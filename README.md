# InventorySync

Hey there! 👋 This is a full-stack inventory management system I built to solve real-world stock tracking problems. It's powered by MongoDB, Express, React, and Node.js - the good old MERN stack.

Whether you're tracking products for a small business or managing a larger warehouse, this system helps you keep tabs on everything from stock levels to damage reports.

- [Features](#features)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
- [Database Design](#database-design)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [How to Use](#how-to-use)
- [Environment Setup](#environment-setup)
- [Deployment Guide](#deployment-guide)

---

## Features

### Dashboard
- Real-time stats showing total products, what's running low, and what's completely out
- Visual charts (pie and bar) to quickly understand your stock situation
- Top 10 best sellers at a glance
- Alerts for low stock and out-of-stock items - so you never miss a reorder

### Inventory Management
- Full CRUD operations (Create, Read, Update, Delete) for products
- Track everything: SKU, name, category, price, supplier, storage location
- Smart status indicators:
  - Gray = Dead stock (0 quantity)
  - Orange = Low stock (time to reorder)
  - Normal = You're good!
- Quick overview cards showing your inventory health

### Stock In
- Simple 3-step process to add stock
- Select product → Enter quantity → Add details
- Shows what your new quantity will be before you confirm
- Multiple reasons supported: Purchase, Returns, Production, Transfers, etc.
- Complete audit trail of all stock additions

### Stock Out
- Same easy process but for removing stock
- Built-in validation so you can't remove more than you have
- Reasons include: Sales, Transfers, Returns to Supplier, Samples, etc.
- Real-time warnings if you're hitting reorder levels
- Full movement history

### Damage Reports
- 4-step wizard to report damaged or lost items
- Comprehensive damage reasons (Physical damage, Expired, Defects, Theft, etc.)
- Detailed notes for insurance claims
- Automatically adjusts your inventory

### Reports & Analytics
- Summary statistics across all movements
- SKU performance rankings
- Detailed transaction log with timestamps
- Filter by type, product, or date range
- Export everything to CSV

### Security
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access (Admin vs User)
- Token expiration and session management

---

## Tech Stack

**Frontend:**
- React 18.3.1 with Vite for blazing fast builds
- React Router for navigation
- Axios for API calls
- Recharts for those nice-looking charts
- Tailwind CSS because utility classes > writing CSS

**Backend:**
- Node.js + Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password security
- Express Validator for input checking

---

## How It Works

Here's a simplified view of how everything connects:

![System Architecture](../docs/architecture.svg)

*The frontend talks to the backend via REST APIs, backend handles business logic and talks to MongoDB, JWT tokens keep everything secure.*

The flow is pretty straightforward:
1. User logs in → Gets a JWT token
2. Token gets stored in browser (localStorage)
3. Every API request includes this token
4. Backend verifies the token
5. If valid, operation proceeds

---

## Database Design

Instead of boring ASCII diagrams, here's what the database looks like:

![Database Schema](../docs/database-schema.svg)

**Three main collections:**

1. **Users** - Who's using the system
   - Stores name, email, hashed password, role
   - One user can perform many stock movements

2. **Products** - What you're tracking
   - SKU, name, category, quantity, reorder level, etc.
   - Each product can have multiple stock movements

3. **Stock Movements** - The transaction log
   - Every addition, removal, or damage report
   - Links to both the product and the user who made the change
   - Tracks previous and new stock levels

The relationships are simple:
- One User → Many Stock Movements
- One Product → Many Stock Movements

**Indexes for speed:**
- Users: Unique email
- Products: Unique SKU (indexed)
- Stock Movements: Indexed on product ID, user ID, and date

## Getting Started

You'll need Node.js (v16+), npm, MongoDB, and Git installed first.

**1. Clone this repo:**

```bash
git clone https://github.com/rizwimohdaltamash/MedSync77.git
cd InventoryManagement
```

**2. Set up the backend:**

```bash
cd server
npm install

# Create a .env file with these variables:
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/InventoryManagementDB?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=production

npm start
```

**3. Set up the frontend:**

```bash
# Open a new terminal
cd client
npm install
npm run dev
```

**4. Access the app:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

**Quick tip:** After signing up, manually set your user role to "admin" in MongoDB if you want full access:

```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

---

## Project Structure

Pretty straightforward structure here:

```
InventoryManagement/
│
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/          # Navbar, Protected Routes
│   │   ├── pages/               # All the main pages
│   │   ├── services/            # API handling
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── server/                      # Express backend
    ├── config/
    │   └── db.js               # MongoDB connection
    ├── controllers/            # Business logic
    ├── middleware/
    │   └── auth.js            # JWT verification
    ├── models/                # Mongoose schemas
    ├── routes/                # API endpoints
    ├── .env                   # Environment variables
    └── server.js              # Entry point
```

---

## API Reference

Base URL: `http://localhost:5000/api`

### Auth
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Log in

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Stock
- `GET /api/stock` - Get movements (supports filters)
- `POST /api/stock/in` - Add stock
- `POST /api/stock/out` - Remove stock
- `POST /api/stock/damage` - Report damage

### Dashboard
- `GET /api/dashboard/stats` - Overall statistics
- `GET /api/dashboard/low-stock` - Products below reorder level
- `GET /api/dashboard/out-of-stock` - Empty inventory items
- `GET /api/dashboard/top-skus` - Best performers
- `GET /api/dashboard/stock-distribution` - For pie chart
- `GET /api/dashboard/category-distribution` - For bar chart

All protected routes need the JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

---

## How to Use

**Adding Products:**
1. Head to Inventory page
2. Click "Add Product"
3. Fill in the details (SKU must be unique)
4. Save it

**Recording Stock In:**
1. Go to Stock In page
2. Pick your product
3. Enter how much you're adding
4. Choose a reason and add any notes
5. Submit

**Recording Stock Out:**
1. Go to Stock Out page
2. Select product
3. Enter quantity (system won't let you take out more than you have)
4. Pick a reason
5. Done

**Damage Reports:**
1. Navigate to Damage page
2. Select the affected product
3. Enter damaged quantity
4. Choose the damage type
5. Add detailed notes (important for claims)
6. Submit

**Viewing Reports:**
1. Reports page shows everything
2. Use filters to narrow down what you're looking for
3. Export to CSV if you need it in Excel

---

## Environment Setup

**Backend (.env):**

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/InventoryManagementDB
JWT_SECRET=make_this_really_long_and_random_at_least_32_characters
JWT_EXPIRE=7d
```

**Frontend:**
If needed, create a `.env` in the client folder:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Deployment Guide

**Frontend (Vercel is easiest):**

```bash
cd client
npm run build
npm install -g vercel
vercel --prod
```

Don't forget to update the API URL in [api.js](client/src/services/api.js) to point to your deployed backend.

**Backend (Render works great):**
1. Push your code to GitHub
2. Connect the repo in Render
3. Add your environment variables
4. Deploy

**MongoDB:**
1. Create a free cluster on MongoDB Atlas
2. Get your connection string
3. Whitelist your IP (or 0.0.0.0/0 for anywhere)
4. Update MONGODB_URI in your .env

---

## A Few Notes

## Built By

**Mohd. Altamash Rizwi**  
[GitHub](https://github.com/rizwimohdaltamash)

---

## Thanks To

- The React team for making frontend dev enjoyable
- Tailwind for saving me from writing CSS
- Recharts for beautiful charts out of the box
- MongoDB for handling my data
- Everyone who uses this and provides feedback

---

Made with coffee and late nights ☕



