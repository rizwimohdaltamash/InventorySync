# SmartBoard - AI-Powered Collaboration Platform

A modern, full-stack task management and collaboration platform with AI-powered smart suggestions, built with the MERN stack. Features include real-time board management, Google Gemini AI integration, smart card recommendations, team collaboration, and intuitive drag-and-drop functionality.

![SmartBoard Banner](https://img.shields.io/badge/MERN-Stack-green) ![React](https://img.shields.io/badge/React-18.3.1-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-orange) ![AI](https://img.shields.io/badge/AI-Gemini-purple)

## ✨ Features

### Core Functionality
- **Board Management** - Create, edit, and delete project boards with a professional UI
- **List Organization** - Organize tasks into customizable lists (To Do, In Progress, Done, etc.)
- **Card System** - Create detailed task cards with titles, descriptions, and due dates
- **Drag & Drop** - Intuitive drag-and-drop interface powered by `@hello-pangea/dnd`
- **Real-time Updates** - Live synchronization across all operations

### Smart AI Features 🤖
- **Google Gemini AI Integration** - Powered by Gemini 2.0 Flash model
- **AI-Powered Suggestions**:
  - Automatic due date suggestions based on task content
  - Smart list movement recommendations
  - Priority assessment (High/Medium/Low)
  - Effort estimation
  - Actionable steps breakdown
  - Potential blocker identification
- **Rule-Based Intelligence** - Keyword detection for time-sensitive tasks
- **Related Card Detection** - Jaccard similarity algorithm for finding related tasks
- **Smart Tips** - Contextual guidance when no suggestions are available

### Collaboration Tools
- **User Authentication** - Secure JWT-based authentication system
- **Board Sharing** - Share boards via multiple platforms:
  - Email
  - WhatsApp
  - Telegram
  - Twitter/X
  - QR Code generation
- **Team Collaboration** - Multi-user board access and management

### User Experience
- **Professional UI** - Minimal, aesthetic design with subtle gradients
- **Responsive Design** - Optimized for desktop and mobile devices
- **Smooth Animations** - Polished drag-and-drop interactions
- **Loading States** - Clear feedback for all operations

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.0
- **Routing**: React Router DOM 6.20.0
- **Drag & Drop**: @hello-pangea/dnd 18.0.1 (React 18 compatible)
- **QR Code**: qrcode.react 4.2.0
- **State Management**: Context API

### Backend
- **Runtime**: Node.js with ES Modules
- **Framework**: Express 4.18.2
- **Database**: MongoDB with Mongoose 8.0.0
- **Authentication**: JSON Web Tokens (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 2.4.3
- **AI Integration**: @google/genai 1.30.0 (Google Gemini API)
- **Environment Management**: dotenv 16.3.1
- **CORS**: cors 2.8.5

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Code Style**: ES6+ with ES Modules
- **API Testing**: REST Client/Postman

## 🏗 Architecture

### System Design
```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   React UI  │  │  Auth Context │  │  API Utilities   │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                        Express Server                        │
│  ┌──────────┐  ┌────────────┐  ┌───────────┐  ┌──────────┐│
│  │  Routes  │→ │Controllers │→ │   Models  │→ │ MongoDB  ││
│  └──────────┘  └────────────┘  └───────────┘  └──────────┘│
│                        │                                     │
│                        ▼                                     │
│              ┌──────────────────┐                           │
│              │  AI Engine       │                           │
│              │  - Gemini API    │                           │
│              │  - Rule Engine   │                           │
│              └──────────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow
1. **User Action** → React Component
2. **API Call** → Express Route Handler
3. **Business Logic** → Controller
4. **Data Processing** → Model/Database
5. **AI Analysis** (if needed) → Gemini AI + Rule Engine
6. **Response** → Client Update

### Project Structure

```
Collaboration/
├── client/                      # Frontend React application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Card.jsx         # Task card component
│   │   │   ├── List.jsx         # List container component
│   │   │   ├── RecommendationsPanel.jsx  # AI suggestions modal
│   │   │   └── ShareModal.jsx   # Board sharing modal
│   │   ├── context/             # React Context providers
│   │   │   └── AuthContext.jsx  # Authentication state
│   │   ├── pages/               # Page components
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Register.jsx     # Registration page
│   │   │   ├── Boards.jsx       # Boards listing
│   │   │   └── Board.jsx        # Individual board view
│   │   ├── utils/               # Utility functions
│   │   │   ├── api.js           # API client setup
│   │   │   ├── boardsApi.js     # Board API calls
│   │   │   └── authApi.js       # Auth API calls
│   │   ├── App.jsx              # Root component
│   │   ├── main.jsx             # Application entry
│   │   └── index.css            # Global styles
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   └── tailwind.config.js       # Tailwind CSS config
│
├── server/                      # Backend Express application
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controllers/             # Request handlers
│   │   ├── authController.js    # Authentication logic
│   │   ├── boardController.js   # Board CRUD operations
│   │   ├── listController.js    # List operations
│   │   └── cardController.js    # Card + recommendations
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── models/                  # Mongoose schemas
│   │   ├── User.js              # User model
│   │   ├── Board.js             # Board model
│   │   ├── List.js              # List model
│   │   ├── Card.js              # Card model
│   │   └── Invite.js            # Invite model
│   ├── routes/                  # Express routes
│   │   ├── auth.js              # Auth routes
│   │   ├── boards.js            # Board routes
│   │   ├── lists.js             # List routes
│   │   └── cards.js             # Card routes
│   ├── utils/                   # Utility modules
│   │   ├── recommendations.js   # Rule-based engine
│   │   └── geminiAI.js          # AI integration
│   ├── .env                     # Environment variables
│   ├── .env.example             # Example env file
│   ├── index.js                 # Server entry point
│   ├── package.json             # Backend dependencies
│   └── testGemini.js            # AI testing script
│
├── .gitignore                   # Git ignore rules
├── README.md                    # This file
└── DEPLOYMENT.md                # Deployment guide
```

### Key Files Explained

#### Frontend
- **App.jsx**: Main routing and layout structure
- **Board.jsx**: Core board interface with drag-and-drop
- **RecommendationsPanel.jsx**: Displays AI suggestions in a modal
- **ShareModal.jsx**: Multi-platform board sharing interface
- **boardsApi.js**: Centralized API calls for board operations

#### Backend
- **index.js**: Express server setup, middleware, routes
- **cardController.js**: Handles card CRUD and recommendation requests
- **recommendations.js**: Rule-based suggestion algorithms (date parsing, list movement, similarity)
- **geminiAI.js**: Google Gemini AI integration wrapper

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: now)
}
```

### Board Model
```javascript
{
  title: String (required),
  background: String (default: '#0079bf'),
  owner: ObjectId (ref: 'User', required),
  members: [ObjectId] (ref: 'User'),
  createdAt: Date (default: now)
}
```

### List Model
```javascript
{
  title: String (required),
  board: ObjectId (ref: 'Board', required),
  position: Number (default: 0),
  createdAt: Date (default: now)
}
```

### Card Model
```javascript
{
  title: String (required),
  description: String,
  list: ObjectId (ref: 'List', required),
  board: ObjectId (ref: 'Board', required),
  position: Number (default: 0),
  dueDate: Date,
  labels: [String],
  assignedTo: [ObjectId] (ref: 'User'),
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date (default: now)
}
```

### Invite Model
```javascript
{
  board: ObjectId (ref: 'Board', required),
  email: String (required),
  token: String (required, unique),
  status: String (enum: ['pending', 'accepted'], default: 'pending'),
  expiresAt: Date (required),
  createdAt: Date (default: now)
}
```

## 🤖 AI Integration

### Recommendation Engine Architecture

The recommendation system uses a **hybrid approach** combining rule-based logic and Google Gemini AI:

#### 1. Rule-Based Engine
Located in `server/utils/recommendations.js`

**Date Recognition**:
```javascript
// Detects keywords like: tomorrow, next week, urgent, today
parseDateKeywords(text)
```

**List Movement**:
```javascript
// Detects status keywords: started, testing, completed, blocked
suggestListMovement(text, lists)
```

**Similarity Detection**:
```javascript
// Jaccard similarity for finding related cards
// Formula: |A ∩ B| / |A ∪ B|
findRelatedCards(card, allCards)
```

#### 2. AI-Powered Engine
Located in `server/utils/geminiAI.js`

**Gemini AI Integration**:
```javascript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

// Generate insights using Gemini 2.0 Flash
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash-exp',
  contents: prompt
});
```

**AI Features**:
- Natural language understanding of task context
- Context-aware priority and effort estimation
- Actionable step generation from task descriptions
- Proactive blocker identification
- Smart due date recommendations

### How It Works

1. **User clicks "Get Suggestions"** on a card
2. **Backend processes request**:
   - Rule-based engine analyzes keywords
   - Gemini AI analyzes task context
   - Related cards detected via similarity
3. **Response combines**:
   - Rule-based suggestions (fast, keyword-driven)
   - AI insights (intelligent, context-aware)
   - Smart tips (fallback guidance)
4. **Frontend displays** in RecommendationsPanel modal

### Customizing AI Behavior

Edit `server/utils/geminiAI.js` to modify the AI prompt:

```javascript
const prompt = `You are a smart project management assistant...

Task Title: "${card.title}"
Task Description: "${card.description}"

Provide suggestions in JSON format:
{
  "dueDateSuggestion": { ... },
  "listMovement": { ... },
  "insights": {
    "priority": "high/medium/low",
    "estimatedEffort": "Brief estimate",
    "actionableSteps": ["step1", "step2"],
    "potentialBlockers": ["blocker1"]
  }
}
`;
```

### Fallback Mechanism

If AI fails or returns no results:
1. Rule-based suggestions are shown
2. Smart tips guide users to add better keywords:
   - 💡 Add time keywords like "tomorrow", "urgent"
   - 🎯 Use status keywords like "started", "testing"
   - 🔗 Create related cards for connection suggestions

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Google Gemini API key ([Get it here](https://aistudio.google.com/app/apikey))
- npm package manager

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Collaboration
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure Environment Variables**

   Create `server/.env`:
   ```env
   # MongoDB Connection
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/collaborationplatform
   
   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   
   # Server Configuration
   PORT=5000
   
   # Google Gemini AI
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_PROJECT_NAME=projects/803031514358
   GEMINI_PROJECT_NUMBER=803031514358
   ```

   Create `client/.env` (if needed):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

5. **MongoDB Setup**
   - Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Create a database user with read/write permissions
   - Whitelist your IP address (or use 0.0.0.0/0 for development)
   - Get your connection string and update `MONGO_URI` in `.env`

6. **Gemini AI Setup**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Copy the key and update `GEMINI_API_KEY` in `.env`
   - Ensure your project has the Generative Language API enabled

7. **Start the Application**
   
   Terminal 1 - Backend:
   ```bash
   cd server
   npm run dev
   ```
   
   Terminal 2 - Frontend:
   ```bash
   cd client
   npm run dev
   ```

8. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 🚀 Usage

### Creating Your First Board
1. **Register/Login**: Create an account or log in
2. **Create Board**: Click "Create New Board" and enter board details
3. **Add Lists**: Create lists like "To Do", "In Progress", "Done"
4. **Add Cards**: Add task cards to your lists
5. **Get Suggestions**: Click "Get Suggestions" on any card for AI recommendations

### Using AI Suggestions
The AI analyzes your cards and provides:
- **Due Date Suggestions**: Based on keywords and urgency
- **List Movement**: Recommends moving cards between lists
- **Priority Assessment**: High/Medium/Low priority classification
- **Effort Estimation**: Time and complexity estimates
- **Actionable Steps**: Breakdown of tasks
- **Potential Blockers**: Identifies possible issues

### Sharing Boards
1. Click the share icon on any board
2. Choose your preferred method:
   - Copy link
   - Share via email
   - Share on WhatsApp/Telegram/Twitter
   - Generate QR code for mobile access

### Drag & Drop
- Drag cards between lists
- Reorder cards within lists
- Visual feedback during drag operations
- Automatic position saving

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Board Endpoints

#### Get All Boards
```http
GET /boards
Authorization: Bearer <token>
```

#### Create Board
```http
POST /boards
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Project",
  "description": "Project description"
}
```

#### Update Board
```http
PUT /boards/:boardId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title"
}
```

#### Delete Board
```http
DELETE /boards/:boardId
Authorization: Bearer <token>
```

### List Endpoints

#### Get Lists by Board
```http
GET /lists?board=<boardId>
Authorization: Bearer <token>
```

#### Create List
```http
POST /lists
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "To Do",
  "board": "boardId"
}
```

### Card Endpoints

#### Get Cards by List
```http
GET /cards?list=<listId>
Authorization: Bearer <token>
```

#### Create Card
```http
POST /cards
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Implement feature",
  "description": "Detailed description",
  "list": "listId",
  "dueDate": "2025-12-31"
}
```

#### Update Card
```http
PUT /cards/:cardId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description"
}
```

#### Move Card
```http
PUT /cards/:cardId/move
Authorization: Bearer <token>
Content-Type: application/json

{
  "list": "newListId",
  "position": 1
}
```

#### Get Card Recommendations (AI + Rule-based)
```http
GET /cards/:cardId/recommendations
Authorization: Bearer <token>
```

**Response Example**:
```json
{
  "suggestedDueDates": [
    {
      "date": "2025-11-25",
      "reason": "Detected 'tomorrow' keyword",
      "confidence": "high"
    }
  ],
  "suggestedListMovement": {
    "targetList": "In Progress",
    "reason": "Detected 'started working' keyword"
  },
  "relatedCards": [
    {
      "_id": "cardId",
      "title": "Similar Card",
      "similarity": 0.75
    }
  ],
  "aiInsights": {
    "priority": "high",
    "estimatedEffort": "2-3 hours",
    "actionableSteps": ["Step 1", "Step 2"],
    "potentialBlockers": ["Dependency on X"]
  },
  "smartTips": [
    {
      "icon": "💡",
      "tip": "Add time-related keywords for better date suggestions"
    }
  ]
}
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs with 10 salt rounds
- **JWT Authentication**: Stateless authentication with secure tokens
- **Protected Routes**: Middleware-based route protection
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Controlled cross-origin requests
- **Environment Variables**: Sensitive data stored in .env files
- **API Key Management**: Secure Gemini API key handling

## 🎨 Design Philosophy

### UI/UX Principles
- **Minimal & Professional**: Clean interface without excessive colors
- **Subtle Gradients**: Gentle gradients for visual hierarchy
- **Consistent Spacing**: Tailwind's spacing scale for uniformity
- **Responsive First**: Mobile-friendly from the ground up
- **Fast Interactions**: Optimistic UI updates for better UX

### Color Scheme
- **Primary**: Blue gradients for boards and cards
- **Accent**: Purple for AI-powered features
- **Success**: Green for completion states
- **Warning**: Yellow for time-sensitive tasks
- **Neutral**: Gray scale for backgrounds and text

## 🧪 Testing

### Testing the AI Integration

Run the test script:
```bash
cd server
node testGemini.js
```

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Create/edit/delete boards
- [ ] Create/edit/delete lists
- [ ] Create/edit/delete cards
- [ ] Drag and drop cards between lists
- [ ] Get AI suggestions on cards
- [ ] Share board via different methods
- [ ] Test responsive design on mobile

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:
- Hosting on Vercel/Netlify (Frontend)
- Hosting on Render/Railway (Backend)
- MongoDB Atlas configuration
- Environment variable setup
- Domain configuration

## 🗺 Roadmap

### Upcoming Features
- [ ] Real-time collaboration with WebSockets
- [ ] File attachments on cards
- [ ] Comments and activity feed
- [ ] Labels and tags system
- [ ] Advanced filtering and search
- [ ] Calendar view for due dates
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Gantt chart view
- [ ] Time tracking integration
- [ ] Card templates
- [ ] Board analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and structure
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👥 Authors

- **Mohd. Altamash Rizwi** - Initial work and development

---

## 🙏 Acknowledgments

- React and Vite teams for amazing development tools
- MongoDB for database solutions
- Google for Gemini AI API
- Tailwind CSS for styling framework
- @hello-pangea/dnd for drag-and-drop functionality
- Inspired by Trello's board management system

---

## 📞 Support

For support, open an issue in the repository or contact the maintainers.

---

**Built with ❤️ using MERN Stack + Google Gemini AI**

#

