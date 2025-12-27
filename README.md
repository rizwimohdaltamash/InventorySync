<div align="center">

# 📦 InventorySync

### Professional Inventory Management System

*A comprehensive, full-stack inventory management solution built with the MERN stack*

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

---

## 🎯 Overview

**InventorySync** is a modern, full-featured inventory management system designed for businesses to efficiently track products, manage stock movements, and analyze inventory performance. With real-time updates, automated alerts, and comprehensive reporting, it streamlines your entire inventory workflow.

### 🌟 Key Highlights

- 📊 **Real-time Dashboard** with visual analytics
- 📦 **Complete Product Management** with SKU tracking
- 📥📤 **Stock Movement Tracking** (In/Out/Damage)
- 📈 **Advanced Reports & Analytics** with CSV export
- 🔐 **Secure Authentication** with JWT
- 🎨 **Professional UI** with Tailwind CSS
- ⚡ **Fast & Responsive** built with Vite

---

## 📋 Table of Contents

**Getting Started**
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)

**Documentation**
- [Architecture](#architecture)
- [Database Schema](#database-schema-er-diagram)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

**Usage & Deployment**
- [Usage Guide](#usage-guide)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

---

## ✨ Features

### 📊 Dashboard
- **Real-time Statistics**: Total products, low stock alerts, out of stock items, and in-stock products
- **Visual Analytics**: 
  - Pie chart showing stock distribution (Low Stock, Out of Stock, In Stock)
  - Bar chart displaying product categories distribution
- **Top 10 Best Selling Products**: Ranked list with sales data
- **Low Stock Alerts**: Instant notifications for products below reorder levels
- **Out of Stock Items**: Quick access to items requiring immediate restocking

### 📦 Inventory Management
- **Product CRUD Operations**: Create, Read, Update, Delete products
- **Product Details**:
  - SKU (Stock Keeping Unit)
  - Product Name & Description
  - Category & Supplier
  - Unit Price
  - Current Quantity
  - Reorder Level
  - Storage Location
- **Stock Status Indicators**:
  - Dead Stock (Out of stock) - Gray highlight
  - Low Stock (At/below reorder level) - Orange highlight
  - In Stock (Above reorder level) - Normal display
- **Visual Status Cards**: Quick overview of total products, low stock, dead stock, and in-stock items

### 📥 Stock In Management
- **Multi-step Form Process**:
  1. Select Product/SKU
  2. Enter Quantity to Add
  3. Additional Details (Reason, Reference, Notes)
- **Real-time Calculations**: Shows new quantity after addition
- **Supported Reasons**:
  - Purchase
  - Return from Customer
  - Production
  - Transfer
  - Adjustment
- **Movement Tracking**: Recent stock-in transactions with full audit trail

### 📤 Stock Out Management
- **Multi-step Form Process**:
  1. Select Product/SKU
  2. Enter Quantity to Remove
  3. Additional Details
- **Validation**: Prevents removing more stock than available
- **Real-time Updates**: Shows new quantity and reorder level warnings
- **Supported Reasons**:
  - Sale
  - Transfer
  - Return to Supplier
  - Sample
  - Internal Use
  - Adjustment
- **Movement History**: Complete log of all stock-out transactions

### ⚠️ Damage/Adjustment Reporting
- **4-step Damage Report Process**:
  1. Select Product
  2. Enter Damaged Quantity
  3. Detailed Reason & Description
  4. Submit Report
- **Comprehensive Damage Reasons**:
  - Physical Damage
  - Expired/Past Best-By Date
  - Manufacturing Defect
  - Water/Fire Damage
  - Contamination
  - Theft/Loss
  - Quality Control Failure
  - Packaging Damage
  - Incorrect Storage
  - Customer Return - Damaged
  - Inventory Adjustment
- **Detailed Documentation**: Required notes for insurance and quality control

### 📈 Reports & Analytics
- **Summary Statistics**:
  - Total Stock In
  - Total Stock Out
  - Total Damaged
  - Total Movements
- **SKU Performance Analysis**: Rankings by sales volume and transaction count
- **Stock Movement History**: Detailed transaction log with:
  - Date & Time stamps
  - Movement Type (In/Out/Damage)
  - Product Details
  - Quantity Changes
  - Previous & New Stock levels
  - Performed By user
- **Advanced Filtering**:
  - Filter by Movement Type
  - Filter by Product
  - Date Range filtering
- **Data Export**: Export reports to CSV format

### 🔐 Authentication & Authorization
- **User Authentication**: JWT-based secure authentication
- **Role-Based Access Control**:
  - Admin: Full access to all features
  - User: Limited access (configurable)
- **Secure Password Storage**: Bcrypt hashing
- **Session Management**: Token-based with expiration

---

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite** - Build tool and development server
- **React Router DOM 6.22.0** - Client-side routing
- **Axios 1.6.7** - HTTP client for API requests
- **Recharts 2.12.0** - Data visualization (charts)
- **React Icons** - Icon library
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **PostCSS** - CSS processing

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18.2** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.1.1** - MongoDB ODM
- **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
- **Bcryptjs 2.4.3** - Password hashing
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

---

## 🏗 Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT TIER                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              React Frontend (Port 5173)              │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │   │
│  │  │  Pages   │  │Components│  │ Services │         │   │
│  │  │          │  │          │  │          │         │   │
│  │  │ - Login  │  │ - Navbar │  │  - API   │         │   │
│  │  │ - Signup │  │ - Protected│ Handler  │         │   │
│  │  │ - Dashboard│  Route   │  │          │         │   │
│  │  │ - Inventory│           │  │          │         │   │
│  │  │ - StockIn │            │  │          │         │   │
│  │  │ - StockOut│            │  │          │         │   │
│  │  │ - Damage  │            │  │          │         │   │
│  │  │ - Reports │            │  │          │         │   │
│  │  └──────────┘  └──────────┘  └──────────┘         │   │
│  └─────────────────────────────────────────────────────┘   │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP/REST API (Axios)
                        │ JWT Token Authentication
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                       APPLICATION TIER                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Express.js Backend (Port 5000)             │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │   │
│  │  │  Routes  │  │Controllers│  │Middleware│         │   │
│  │  │          │  │          │  │          │         │   │
│  │  │ - Auth   │  │ - Auth   │  │ - JWT    │         │   │
│  │  │ - Product│  │ - Product│  │   Auth   │         │   │
│  │  │ - Stock  │  │ - Stock  │  │          │         │   │
│  │  │ - Dashboard│ - Dashboard│           │         │   │
│  │  └──────────┘  └──────────┘  └──────────┘         │   │
│  └─────────────────────────────────────────────────────┘   │
└───────────────────────┬─────────────────────────────────────┘
                        │ Mongoose ODM
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                         DATA TIER                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         MongoDB Database (Cloud/Local)               │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │   │
│  │  │  users   │  │ products │  │ stock    │         │   │
│  │  │Collection│  │Collection│  │movements │         │   │
│  │  │          │  │          │  │Collection│         │   │
│  │  └──────────┘  └──────────┘  └──────────┘         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Application Flow

```
User → Login → JWT Token → Protected Routes → API Calls → Database
                    ↓
            Stored in localStorage
                    ↓
        Included in all API requests
                    ↓
        Verified by auth middleware
                    ↓
            Authorized Operations
```

### Component Architecture

```
App.jsx
├── Navbar (Always visible after login)
│   ├── Logo & Brand
│   ├── Navigation Links
│   └── User Profile & Logout
│
├── Routes (React Router)
│   ├── Public Routes
│   │   ├── /login → Login Page
│   │   └── /signup → Signup Page
│   │
│   └── Protected Routes (Require Authentication)
│       ├── /dashboard → Dashboard Page
│       ├── /inventory → Inventory Page
│       ├── /stock-in → Stock In Page
│       ├── /stock-out → Stock Out Page
│       ├── /damage → Damage Report Page
│       └── /reports → Reports & Analytics Page
```

---

## 🗄 Database Schema (ER Diagram)

### Entity Relationship Diagram

```
┌─────────────────────────────────────────┐
│              USERS                       │
├─────────────────────────────────────────┤
│ _id          : ObjectId (PK)             │
│ name         : String                    │
│ email        : String (Unique)           │
│ password     : String (Hashed)           │
│ role         : String (admin/user)       │
│ createdAt    : Date                      │
│ updatedAt    : Date                      │
└──────────────┬──────────────────────────┘
               │ 1
               │
               │ Performed By
               │
               │ *
┌──────────────▼──────────────────────────┐
│         STOCK MOVEMENTS                  │
├─────────────────────────────────────────┤
│ _id          : ObjectId (PK)             │
│ inventoryId  : ObjectId (FK) ────────┐  │
│ type         : String (in/out/damage)│  │
│ quantity     : Number                │  │
│ reason       : String                │  │
│ reference    : String (optional)     │  │
│ notes        : String (optional)     │  │
│ previousStock: Number                │  │
│ newStock     : Number                │  │
│ performedBy  : ObjectId (FK)         │  │
│ date         : Date                  │  │
│ createdAt    : Date                  │  │
│ updatedAt    : Date                  │  │
└─────────────────────────────────────┬┘  │
                                      │   │
                               * │   │
                                 ▼   │ *
┌─────────────────────────────────────▼───┐
│             PRODUCTS                     │
├─────────────────────────────────────────┤
│ _id          : ObjectId (PK)             │
│ sku          : String (Unique, Indexed)  │
│ name         : String                    │
│ description  : String (optional)         │
│ category     : String                    │
│ quantity     : Number (Default: 0)       │
│ reorderLevel : Number (Default: 10)      │
│ unitPrice    : Number                    │
│ supplier     : String (optional)         │
│ location     : String (optional)         │
│ createdAt    : Date                      │
│ updatedAt    : Date                      │
└─────────────────────────────────────────┘
```

### Relationships

1. **Users → Stock Movements (1:N)**
   - One user can perform multiple stock movements
   - `performedBy` field in Stock Movements references `_id` in Users

2. **Products → Stock Movements (1:N)**
   - One product can have multiple stock movements
   - `inventoryId` field in Stock Movements references `_id` in Products

### Indexes

- **Users**: `email` (unique)
- **Products**: `sku` (unique, indexed for fast lookups)
- **Stock Movements**: `inventoryId`, `performedBy`, `date` (for efficient querying)

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (Local or MongoDB Atlas account)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/rizwimohdaltamash/MedSync77.git
cd InventoryManagement
```

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
# Copy and configure the following:
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/InventoryManagementDB?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=production

# Start the server
npm start
```

### Step 3: Frontend Setup

```bash
# Open new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Step 4: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

### Default Admin Credentials

Create an admin account through the signup page, then manually update the role in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

---

## 📁 Project Structure

```
InventoryManagement/
│
├── client/                      # Frontend React application
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── StockIn.jsx
│   │   │   ├── StockOut.jsx
│   │   │   ├── Damage.jsx
│   │   │   └── Reports.jsx
│   │   ├── services/            # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── server/                      # Backend Node.js/Express application
    ├── config/
    │   └── db.js               # Database configuration
    ├── controllers/            # Route controllers
    │   ├── authController.js
    │   ├── productController.js
    │   ├── stockController.js
    │   └── dashboardController.js
    ├── middleware/
    │   └── auth.js            # JWT authentication middleware
    ├── models/                # Mongoose models
    │   ├── User.js
    │   ├── Product.js
    │   └── StockMovement.js
    ├── routes/                # API routes
    │   ├── authRoutes.js
    │   ├── productRoutes.js
    │   ├── stockRoutes.js
    │   └── dashboardRoutes.js
    ├── .env                   # Environment variables
    ├── server.js              # Server entry point
    └── package.json
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"
}

Response: { token, user }
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: { token, user }
```

### Product Endpoints

#### Get All Products
```http
GET /api/products
Authorization: Bearer <token>

Response: [{ products }]
```

#### Create Product
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "sku": "SKU001",
  "name": "Product Name",
  "category": "Category",
  "quantity": 100,
  "reorderLevel": 20,
  "unitPrice": 25.50,
  "description": "Product description",
  "supplier": "Supplier Name",
  "location": "Warehouse A"
}

Response: { product }
```

#### Update Product
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "quantity": 150
}

Response: { product }
```

#### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer <token>

Response: { message: "Product deleted" }
```

### Stock Movement Endpoints

#### Get Stock Movements (with filters)
```http
GET /api/stock?type=in&startDate=2024-01-01&endDate=2024-12-31
Authorization: Bearer <token>

Response: [{ movements }]
```

#### Stock In
```http
POST /api/stock/in
Authorization: Bearer <token>
Content-Type: application/json

{
  "inventoryId": "productObjectId",
  "quantity": 50,
  "reason": "Purchase",
  "reference": "PO12345",
  "notes": "Received from supplier"
}

Response: { message, movement, updatedProduct }
```

#### Stock Out
```http
POST /api/stock/out
Authorization: Bearer <token>
Content-Type: application/json

{
  "inventoryId": "productObjectId",
  "quantity": 30,
  "reason": "Sale",
  "reference": "INV67890",
  "notes": "Sold to customer"
}

Response: { message, movement, updatedProduct }
```

#### Report Damage
```http
POST /api/stock/damage
Authorization: Bearer <token>
Content-Type: application/json

{
  "inventoryId": "productObjectId",
  "quantity": 5,
  "reason": "Physical Damage",
  "reference": "DMG001",
  "notes": "Damaged during transport"
}

Response: { message, movement, updatedProduct }
```

### Dashboard Endpoints

#### Get Dashboard Statistics
```http
GET /api/dashboard/stats
Authorization: Bearer <token>

Response: {
  totalProducts,
  lowStockCount,
  outOfStockCount,
  inStockCount
}
```

#### Get Low Stock Products
```http
GET /api/dashboard/low-stock
Authorization: Bearer <token>

Response: [{ products }]
```

#### Get Out of Stock Products
```http
GET /api/dashboard/out-of-stock
Authorization: Bearer <token>

Response: [{ products }]
```

#### Get Top SKUs
```http
GET /api/dashboard/top-skus
Authorization: Bearer <token>

Response: [{ 
  _id, sku, name, category, 
  totalQuantity, movements 
}]
```

#### Get Stock Distribution
```http
GET /api/dashboard/stock-distribution
Authorization: Bearer <token>

Response: [
  { name: "Low Stock", value: 5, fill: "#FFC107" },
  { name: "Out of Stock", value: 2, fill: "#f44336" },
  { name: "In Stock", value: 50, fill: "#4caf50" }
]
```

#### Get Category Distribution
```http
GET /api/dashboard/category-distribution
Authorization: Bearer <token>

Response: [
  { name: "Electronics", count: 25 },
  { name: "Medical", count: 30 }
]
```

---

## 📖 Usage Guide

### 1. Getting Started

1. **Sign Up**: Create a new account with your email and password
2. **Login**: Use your credentials to access the system
3. **Dashboard**: View your inventory overview and analytics

### 2. Managing Products

**Adding a New Product:**
1. Navigate to **Inventory** page
2. Click **+ Add Product** button
3. Fill in product details:
   - SKU (unique identifier)
   - Product name
   - Category
   - Unit price
   - Reorder level
   - Supplier and location (optional)
4. Click **Add Product**

**Editing a Product:**
1. Find the product in the inventory table
2. Click **Edit** button
3. Update the required fields
4. Click **Update Product**

**Deleting a Product:**
1. Find the product in the inventory table
2. Click **Delete** button
3. Confirm deletion

### 3. Stock Operations

**Adding Stock (Stock In):**
1. Go to **Stock In** page
2. Select the product from dropdown
3. Enter quantity to add
4. Select reason (Purchase, Return, etc.)
5. Add reference number and notes (optional)
6. Click **Add Stock to Inventory**

**Removing Stock (Stock Out):**
1. Go to **Stock Out** page
2. Select the product from dropdown
3. Enter quantity to remove
4. System validates available stock
5. Select reason (Sale, Transfer, etc.)
6. Add reference number and notes
7. Click **Remove Stock from Inventory**

**Reporting Damage:**
1. Go to **Damage** page
2. Select affected product
3. Enter damaged quantity
4. Choose damage reason from comprehensive list
5. Provide detailed description (required)
6. Add reference/claim number
7. Click **Report Damage & Update Inventory**

### 4. Viewing Reports

**Accessing Analytics:**
1. Navigate to **Reports** page
2. View summary statistics at the top
3. Check SKU performance rankings
4. Review stock movement history

**Filtering Data:**
1. Use filter dropdowns:
   - Movement Type (In/Out/Damage)
   - Product selection
   - Date range
2. Click **Apply Filters**
3. Click **Reset** to clear filters

**Exporting Data:**
1. Apply desired filters (optional)
2. Click **Export to CSV**
3. CSV file will download with current data

### 5. Dashboard Features

**Understanding Visual Indicators:**
- **Green**: Healthy stock levels
- **Orange**: Low stock (reorder needed)
- **Red**: Out of stock (urgent)
- **Gray**: Dead stock (zero quantity)

**Using Charts:**
- **Pie Chart**: Shows stock health distribution
- **Bar Chart**: Displays products by category
- Both charts are interactive and clickable

**Monitoring Alerts:**
- Check "Low Stock Alert" section regularly
- Review "Out of Stock Items" for immediate action
- Monitor "Top 10 Best Selling Products" for inventory planning

---

## 🌍 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/InventoryManagementDB?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d

# Optional: Email Configuration (for future features)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
```

### Frontend (if needed)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the application:**
```bash
cd client
npm run build
```

2. **Deploy to Vercel:**
```bash
npm install -g vercel
vercel --prod
```

3. **Update API URL:**
   - Change API_URL in `client/src/services/api.js` to your backend URL

### Backend Deployment (Render/Heroku)

1. **Deploy to Render:**
   - Connect your GitHub repository
   - Set environment variables in Render dashboard
   - Deploy from main branch

2. **Update CORS:**
   - Add your frontend URL to CORS whitelist in `server.js`

### MongoDB Setup

1. **Create MongoDB Atlas Cluster:**
   - Sign up at mongodb.com/cloud/atlas
   - Create a free cluster
   - Get connection string
   - Update MONGODB_URI in .env

2. **Configure Network Access:**
   - Add your IP or allow access from anywhere (0.0.0.0/0)
   - Create database user with read/write permissions

---

### Code Style Guidelines

- Use ES6+ features
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Ensure code passes ESLint

---

## 👨‍💻 Developer

**Mohd. Altamash Rizwi**
- GitHub: [@rizwimohdaltamash](https://github.com/rizwimohdaltamash)
---

## 🙏 Acknowledgments

- React Icons for beautiful icons
- Recharts for data visualization
- Tailwind CSS for styling utilities
- MongoDB for database solution
- All contributors and users of this project

---


**Built with ❤️ using MERN Stack**
<<<<<<< HEAD
#
