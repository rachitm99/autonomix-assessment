# InsightBoard AI Dashboard

A production-ready full-stack dashboard that transforms meeting transcripts into actionable tasks using AI, with authentication, cloud database, and containerized deployment. Built for the InsightBoard AI take-home assignment.

![InsightBoard AI](https://img.shields.io/badge/Level-3-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Google Gemini](https://img.shields.io/badge/Gemini-2.0%20Flash-green)

## 🎯 Level Completed: **Level 3 (Complete)**

This implementation includes:
- ✅ All Level 1 mandatory features
- ✅ All Level 2 enhancements
- ✅ **Level 3 Complete:** Separate backend, MongoDB Atlas, JWT authentication, Google Cloud Run deployment

## 🚀 Live Demo

**Frontend:** [https://autonomix-assessment-fo2iuvq9b-rachitm99s-projects.vercel.app](https://autonomix-assessment-fo2iuvq9b-rachitm99s-projects.vercel.app)

**Backend API:** [https://insightboard-api-3yyxtgrzna-uc.a.run.app](https://insightboard-api-3yyxtgrzna-uc.a.run.app)

## 🛠️ Tech Stack & Infrastructure

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.5
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Charts:** Recharts 2.12
- **HTTP Client:** Axios 1.6
- **Hosting:** Vercel (Production)

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.18
- **Language:** JavaScript
- **Authentication:** JWT (jsonwebtoken) + bcryptjs
- **Hosting:** Google Cloud Run (Container-based)
- **Deployment:** Docker with automated CLI scripts

### Database
- **Database:** MongoDB Atlas (M0 Free Tier - 512MB)
- **ODM:** Mongoose 8.0
- **Hosting:** Cloud-hosted (AWS infrastructure)

### AI/LLM
- **Provider:** Google Gemini 2.0 Flash (FREE)
- **Library:** @google/generative-ai 0.2.0
- **Features:** Task generation, priority detection, auto-tagging
- **Cost:** $0 (60 requests/min free tier)

### DevOps & Infrastructure
- **Containerization:** Docker
- **Cloud Platform:** Google Cloud Platform (GCP)
- **Backend Hosting:** Cloud Run (2M requests/month free)
- **Frontend Hosting:** Vercel (Hobby tier)
- **Version Control:** Git + GitHub
- **CI/CD:** Automatic deployment on push

## ✨ Features

### Level 1 (Core Features)
1. **Transcript Submission** - Multi-line text area for meeting transcripts
2. **AI-Powered Task Generation** - Google Gemini integration for extracting action items
3. **Task Interaction** - Mark tasks as complete or delete them
4. **Progress Visualization** - Pie chart showing completion percentage
5. **Modern UI** - Responsive design with Tailwind CSS
6. **Deployment** - Fully hosted and accessible

### Level 2 (Enhancements)
1. **Filter & Sort** - Filter by status (pending/completed) and priority (high/medium/low)
2. **AI-Powered Prioritization** - Automatic priority assignment based on urgency
3. **Bar Chart Visualization** - Priority distribution chart
4. **Persistent Storage** - Tasks saved to cloud database

### Level 3 (Production Features) ⭐
1. **Separate Backend API** - Express.js REST API deployed to Google Cloud Run
2. **MongoDB Atlas Database** - Cloud-hosted NoSQL database with indexing
3. **JWT Authentication** - Secure email/password authentication with protected routes
4. **User Management** - Register, login, logout, and user-specific data isolation
5. **AI Auto-Tagging** - Automatic team tag extraction (@Engineering, @Marketing, etc.)
6. **Task Export** - Export tasks to CSV/JSON
7. **Cloud Deployment** - Containerized backend on Cloud Run, frontend on Vercel
8. **Security** - Password hashing (bcrypt), JWT tokens, CORS protection
9. **Scalability** - Container-based deployment with auto-scaling
10. **Cost Optimization** - 100% free tier infrastructure ($0/month)

## 📦 Installation & Setup

### Prerequisites
- **Node.js 18+** (https://nodejs.org)
- **npm or yarn**
- **MongoDB Atlas account** (FREE - https://www.mongodb.com/cloud/atlas)
- **Google Gemini API key** (FREE - https://makersuite.google.com/app/apikey)
- **Google Cloud account** (optional, for backend deployment)

### Quick Start (Local Development)

#### 1. Clone the Repository
```bash
git clone https://github.com/rachitm99/autonomix-assessment.git
cd autonomix-assessment
```

#### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

#### 3. Setup MongoDB Atlas (FREE)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster (512MB)
3. Create a database user with password
4. Whitelist your IP (or use `0.0.0.0/0` for development)
5. Get your connection string: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/insightboard?retryWrites=true&w=majority`

#### 4. Get FREE Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy your API key (no credit card required!)

#### 5. Configure Environment Variables

**Frontend** - Create `.env.local` in root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend** - Create `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/insightboard?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
GEMINI_API_KEY=your-gemini-api-key-here
NODE_ENV=development
PORT=5000
```

#### 6. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# App runs on http://localhost:3000
```

#### 7. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

### Test the App
1. Click "Get Started" to register
2. Create an account with email/password
3. Paste a meeting transcript (use `Input Transcript.txt`)
4. Click "Generate Action Items"
5. Watch AI extract tasks with priorities and tags!

## 🌐 Deployment

### Backend Deployment (Google Cloud Run)

**Prerequisites:**
- Google Cloud account (free tier)
- gcloud CLI installed ([Install Guide](https://cloud.google.com/sdk/docs/install))

**Deploy with one command:**
```bash
cd backend
gcloud run deploy insightboard-api --source . --region us-central1 --allow-unauthenticated
```

**Set environment variables:**
```bash
gcloud run services update insightboard-api --region us-central1 \
  --set-env-vars "MONGODB_URI=your-mongodb-uri,JWT_SECRET=your-jwt-secret,GEMINI_API_KEY=your-gemini-key,NODE_ENV=production"
```

**Your backend is now live!** Copy the URL (e.g., `https://insightboard-api-xxxxx-uc.a.run.app`)

📖 **Detailed Guide:** See `GCP-CLOUD-RUN-DEPLOYMENT.md` for complete instructions

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable:
     - Key: `NEXT_PUBLIC_API_URL`
     - Value: `https://your-cloud-run-url/api`
   - Click "Deploy"

3. **Your app is live!** Vercel provides a URL like: `https://your-app.vercel.app`

### Cost Breakdown
- **MongoDB Atlas:** $0 (M0 free tier - 512MB)
- **Google Gemini:** $0 (60 req/min free)
- **Cloud Run:** $0 (2M requests/month free)
- **Vercel:** $0 (Hobby tier)
- **Total:** **$0/month** 🎉

## 📖 Usage Guide

### 1. Submit a Transcript
- Paste your meeting transcript in the text area
- Click "Generate Action Items"
- Wait for AI to process (typically 3-5 seconds)

### 2. Manage Tasks
- **Complete Task:** Click the circle checkbox
- **Delete Task:** Click the trash icon
- **View Priority:** Each task shows color-coded priority (Red=High, Yellow=Medium, Green=Low)

### 3. Filter & Sort
- **By Status:** Filter to show only pending or completed tasks
- **By Priority:** Filter to show only high, medium, or low priority tasks

### 4. Analyze Progress
- **Pie Chart:** Shows completion percentage
- **Bar Chart:** Shows distribution of tasks by priority

### 5. Clear All
- Click "Clear All" button to remove all tasks and start fresh

## 🏗️ Project Structure

```
autonomix-assessment/
├── app/                          # Next.js App Router
│   ├── dashboard/
│   │   └── page.tsx              # Protected dashboard (tasks & charts)
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── register/
│   │   └── page.tsx              # Registration page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with AuthProvider
│   └── page.tsx                  # Landing page
│
├── backend/                      # Express.js Backend
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js           # User schema (email, password, name)
│   │   │   ├── Task.js           # Task schema (text, priority, tags)
│   │   │   └── Transcript.js     # Transcript schema
│   │   ├── routes/
│   │   │   ├── auth.js           # Auth endpoints (register, login, me)
│   │   │   └── tasks.js          # Task endpoints (CRUD, generate, export)
│   │   ├── middleware/
│   │   │   └── auth.js           # JWT verification middleware
│   │   ├── config/
│   │   │   └── database.js       # MongoDB connection
│   │   └── index.js              # Express server entry point
│   ├── Dockerfile                # Container definition for Cloud Run
│   ├── .dockerignore             # Docker build exclusions
│   ├── deploy.ps1                # PowerShell deployment script
│   ├── deploy.sh                 # Bash deployment script
│   └── package.json              # Backend dependencies
│
├── components/                   # React Components
│   ├── TranscriptForm.tsx        # Transcript input form
│   ├── TaskList.tsx              # Task list with filters
│   ├── ProgressChart.tsx         # Pie chart (Recharts)
│   └── PriorityChart.tsx         # Bar chart (Recharts)
│
├── context/
│   └── AuthContext.tsx           # React context for authentication
│
├── lib/
│   └── api.ts                    # Axios API client with interceptors
│
├── types/
│   └── index.ts                  # TypeScript interfaces
│
├── docs/                         # Documentation
│   ├── GCP-CLOUD-RUN-DEPLOYMENT.md
│   ├── LEVEL3-COMPLETE.md
│   ├── COMPLETE-SETUP-GUIDE.md
│   └── FREE-LLM-OPTIONS.md
│
├── .env.local                    # Frontend environment variables
├── package.json                  # Frontend dependencies
└── README.md                     # This file
```

## 🧪 Testing the App

### Sample Transcript
Use the provided `Input Transcript.txt` in the workspace, or try this sample:

```
Meeting: Q4 Planning
Date: November 4, 2025

John: We need to finalize the product roadmap by Friday. This is critical.
Sarah: I'll prepare the market analysis report by Wednesday.
Mike: Let's schedule a review meeting next month to discuss the results.
```

Expected AI Output:
- **High Priority:** Finalize product roadmap by Friday
- **Medium Priority:** Prepare market analysis report by Wednesday  
- **Low Priority:** Schedule review meeting next month

## 🔑 Key Technical Decisions

### Why Separate Backend?
- **Scalability:** Independent scaling of frontend/backend
- **Security:** JWT tokens, password hashing, API-only access to database
- **Flexibility:** Can add mobile apps, webhooks, third-party integrations
- **Production-Ready:** Containerized deployment on Cloud Run

### Why Google Cloud Run?
- **Serverless containers:** No server management
- **Auto-scaling:** Scales to zero when not in use
- **Cost-effective:** 2M requests/month free (vs Lambda's 1M)
- **Simple deployment:** Single CLI command
- **Docker-based:** Easy to migrate to any cloud provider

### Why MongoDB Atlas?
- **Free tier:** 512MB storage, enough for thousands of tasks
- **Managed service:** Automatic backups, monitoring, security
- **Flexible schema:** Easy to add new fields without migrations
- **Global deployment:** Low-latency access worldwide

### Why Google Gemini 2.0 Flash?
- **100% FREE** - No credit card required, ever
- **Latest model:** Gemini 2.0 Flash (experimental)
- **Fast:** < 3 second response times
- **Accurate:** Excellent at task extraction and prioritization
- **Generous limits:** 60 requests/min free tier
- **Simple API:** Easy integration with @google/generative-ai

### Why JWT Authentication?
- **Stateless:** No session storage needed
- **Scalable:** Works across multiple servers
- **Secure:** Signed tokens prevent tampering
- **Standard:** Industry-standard authentication method

### Why Next.js?
- **App Router:** Modern React patterns with server components
- **TypeScript:** Built-in support with excellent DX
- **Deployment:** Zero-config deployment on Vercel
- **Performance:** Automatic optimization and code splitting

## 🎨 UI/UX Highlights

- **Responsive Design:** Works on mobile, tablet, and desktop
- **Real-time Updates:** Charts update instantly when tasks change
- **Loading States:** Clear feedback during AI processing
- **Color-Coded Priorities:** Visual hierarchy at a glance
- **Smooth Animations:** Professional feel with Tailwind transitions
- **Empty States:** Helpful guidance when no tasks exist

## 🐛 Troubleshooting

### API Key Issues
**Error:** "Failed to generate tasks"
- Ensure `.env.local` exists with valid `GEMINI_API_KEY`
- Get free key at: https://makersuite.google.com/app/apikey
- Restart dev server after adding environment variables
- Gemini is completely free with generous limits

### Build Errors
**Error:** Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tasks Not Persisting
- Check browser's LocalStorage is enabled
- Try different browser
- Clear browser cache and reload

## 🎯 LLM API Details

**Provider:** Google Gemini  
**Model:** `gemini-2.0-flash-exp` (Experimental)  
**Cost:** $0 (Free tier)  
**Rate Limit:** 60 requests/minute  
**Response Time:** 2-5 seconds average  

**Features Used:**
- Task extraction from unstructured text
- Priority detection (high/medium/low)
- Team tag extraction (@Engineering, @Marketing, etc.)
- Context-aware task parsing

**API Configuration:**
```javascript
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
```

## 📝 Future Enhancements

Potential additions beyond Level 3:
- [ ] Real-time collaboration with WebSockets
- [ ] Email notifications for task assignments
- [ ] Due date tracking and reminders
- [ ] Task search with full-text indexing
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Multi-language support (i18n)
- [ ] Dark mode theme
- [ ] Voice-to-text transcript input
- [ ] Mobile app (React Native)
- [ ] Slack/Teams integration
- [ ] Advanced analytics dashboard
- [ ] Task dependencies and subtasks

## 📄 License

This project was created for the InsightBoard AI take-home assessment.

## 👤 Author

**Rachit Mukherjee**
- GitHub: [@rachitm99](https://github.com/rachitm99)
- Repository: [autonomix-assessment](https://github.com/rachitm99/autonomix-assessment)

## 🙏 Acknowledgments

- Google for the Gemini API and Cloud Run platform
- MongoDB for Atlas free tier
- Next.js team for the excellent framework
- Vercel for seamless deployment
- Recharts for beautiful visualizations

## 📚 Additional Documentation

- **[LEVEL3-COMPLETE.md](./LEVEL3-COMPLETE.md)** - Complete Level 3 feature overview
- **[GCP-CLOUD-RUN-DEPLOYMENT.md](./GCP-CLOUD-RUN-DEPLOYMENT.md)** - Detailed Cloud Run deployment guide
- **[COMPLETE-SETUP-GUIDE.md](./COMPLETE-SETUP-GUIDE.md)** - Step-by-step setup instructions
- **[FREE-LLM-OPTIONS.md](./FREE-LLM-OPTIONS.md)** - Alternative free LLM providers

---

**Built with ❤️ for InsightBoard AI - Level 3 Complete**
