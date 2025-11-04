# 🎯 Complete Setup Guide - Level 3

## Overview

This guide will help you set up the complete Level 3 InsightBoard AI application with:
- Google Cloud Run Backend (easier than AWS!)
- MongoDB Atlas Database  
- Email/Password Authentication
- Google Gemini AI (FREE)
- Next.js Frontend

**Estimated Setup Time: 20-30 minutes**
**Total Cost: $0.00** ✅

---

## 📋 Prerequisites

Download/Install these first:
- [ ] Node.js 18+ (https://nodejs.org)
- [ ] Git (https://git-scm.com)
- [ ] VS Code (optional but recommended)
- [ ] Google Cloud CLI (https://cloud.google.com/sdk/docs/install)

Create accounts (all FREE):
- [ ] Google account (for Gemini API & Cloud Run)
- [ ] MongoDB Atlas account
- [ ] Vercel account (for hosting frontend)

---

## Part 1: MongoDB Atlas Setup (5 minutes)

### Step 1: Create Cluster
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up and log in
3. Click "Build a Database"
4. Choose **"Shared" (FREE)**
5. Provider: **AWS**
6. Region: **Choose closest to you**
7. Cluster Name: `Cluster0` (default)
8. Click **"Create"**

### Step 2: Database Access
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Username: `insightboard`
4. Password: Click "Autogenerate Secure Password" (SAVE THIS!)
5. Database User Privileges: **"Read and write to any database"**
6. Click **"Add User"**

### Step 3: Network Access
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. IP Address will show: `0.0.0.0/0`
5. Click **"Confirm"**

### Step 4: Get Connection String
1. Go to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. **Copy the connection string!**
7. It looks like: `mongodb+srv://insightboard:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 5: Prepare Connection String
Replace `<password>` with the password you saved:
```
mongodb+srv://insightboard:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/insightboard?retryWrites=true&w=majority
```
**SAVE THIS - you'll need it soon!**

---

## Part 2: Google Gemini API Setup (2 minutes)

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. **Copy the API key** (starts with `AI...`)
5. **SAVE THIS - you'll need it soon!**

---

## Part 3: Backend Setup (10 minutes)

### Step 1: Install Dependencies
```powershell
# Navigate to backend folder
cd backend

# Install all packages
npm install
```

### Step 2: Configure Environment
```powershell
# Copy example env file
Copy-Item .env.example .env

# Open for editing
notepad .env
```

### Step 3: Fill in Environment Variables

Paste this and fill in your values:
```env
# MongoDB Connection (from Part 1, Step 5)
MONGODB_URI=mongodb+srv://insightboard:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/insightboard?retryWrites=true&w=majority

# JWT Secret (generate below)
JWT_SECRET=paste_generated_secret_here

# Gemini API Key (from Part 2)
GEMINI_API_KEY=paste_your_gemini_key_here

# Environment
NODE_ENV=development
```

### Step 4: Generate JWT Secret
In a **new PowerShell window**, run:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste as `JWT_SECRET` in .env

### Step 5: Test Backend Locally
```powershell
# Still in backend folder
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

### Step 6: Test API
Open a **new PowerShell window**:
```powershell
curl http://localhost:5000/health
```

Should return: `{"status":"OK","timestamp":"..."}`

✅ **Backend working!** Leave it running and continue...

---

## Part 4: Frontend Setup (5 minutes)

### Step 1: Install Dependencies
Open a **new PowerShell window** (backend still running):
```powershell
# Navigate to main project folder
cd c:\Users\rachi\Desktop\autonomix-assessment

# Install packages
npm install
```

### Step 2: Configure Environment
```powershell
# Copy example
Copy-Item .env.local.example .env.local

# Edit
notepad .env.local
```

Paste this:
```env
# Backend API URL (local development)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 3: Run Frontend
```powershell
npm run dev
```

You should see:
```
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000
```

---

## Part 5: Test the Application (5 minutes)

### Step 1: Open Browser
Go to: http://localhost:3000

### Step 2: Register Account
1. Click **"Get Started"** or **"Sign Up"**
2. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
3. Click **"Sign Up"**
4. You should be redirected to dashboard

### Step 3: Generate Tasks
1. Copy content from `Input Transcript.txt`
2. Paste in the text area
3. Click **"Generate Action Items"**
4. Wait 3-5 seconds
5. See AI-generated tasks with:
   - Priorities (High/Medium/Low)
   - Tags (@Engineering, @Marketing, etc.)
   - Creation dates

### Step 4: Manage Tasks
- ✅ Click checkbox to complete tasks
- 🗑️ Click trash to delete tasks
- 🔽 Use filters to show pending/completed
- 🔽 Filter by priority
- 📊 Watch charts update in real-time

### Step 5: Export Tasks
- Click **"Export"** button (if you added it)
- Download JSON file with all tasks

✅ **Application working locally!**

---

## Part 6: Google Cloud Run Deployment (Optional but Recommended)

See **`GCP-CLOUD-RUN-DEPLOYMENT.md`** for detailed guide.

**Quick Summary:**
```powershell
# 1. Login to Google Cloud
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# 2. Enable APIs
gcloud services enable run.googleapis.com cloudbuild.googleapis.com

# 3. Deploy (from backend folder)
cd backend
gcloud run deploy insightboard-api --source . --region us-central1 --allow-unauthenticated

# 4. Set environment variables
gcloud run services update insightboard-api --region us-central1 --set-env-vars "MONGODB_URI=...,JWT_SECRET=...,GEMINI_API_KEY=..."

# 5. Get URL
gcloud run services describe insightboard-api --region us-central1 --format 'value(status.url)'
```

---

## Part 7: Vercel Deployment

### Step 1: Push to GitHub
```powershell
# Initialize git (if not done)
git init
git add .
git commit -m "Level 3 complete: InsightBoard AI"

# Create repo on GitHub and push
git branch -M main
git remote add origin https://github.com/yourusername/autonomix-assessment.git
git push -u origin main
```

### Step 2: Deploy to Vercel
```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Follow prompts:
- Link to existing project? **N**
- Project name: `insightboard-ai`
- Directory: `./` (current)
- Override settings? **N**

### Step 3: Add Environment Variable
1. Go to Vercel dashboard
2. Select your project
3. Go to **Settings** -> **Environment Variables**
4. Add:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://insightboard-api-xxxxx-uc.a.run.app/api`
   - (or keep `http://localhost:5000/api` for testing)
5. Redeploy

✅ **Application deployed!**

---

## 🎉 You're Done!

### What You Have
- ✅ Backend running on Google Cloud Run (or locally)
- ✅ MongoDB Atlas database (FREE)
- ✅ Authentication working
- ✅ AI-powered task generation
- ✅ Frontend deployed to Vercel
- ✅ Level 3 complete!

### Access Your App
- **Local**: http://localhost:3000
- **Production**: https://your-app.vercel.app

### Test Credentials
- Email: `test@example.com`
- Password: `password123`

---

## 🐛 Troubleshooting

### Backend won't start
```powershell
# Check MongoDB connection string
# Verify .env file exists
# Ensure all dependencies installed
cd backend
Remove-Item -Recurse node_modules
npm install
```

### Frontend won't start
```powershell
# Clear Next.js cache
Remove-Item -Recurse .next
npm install
npm run dev
```

### Can't connect to MongoDB
- Check IP whitelist (0.0.0.0/0)
- Verify password in connection string
- Test connection in MongoDB Compass

### JWT/Auth errors
- Regenerate JWT_SECRET
- Clear browser localStorage
- Re-register user

### AI not generating tasks
- Check GEMINI_API_KEY in backend .env
- Verify API key is valid
- Check backend console for errors

---

## 📚 Next Steps

1. **Read Documentation**
   - `LEVEL3-COMPLETE.md` - Feature overview
   - `GCP-CLOUD-RUN-DEPLOYMENT.md` - Deploy to Cloud Run
   - `README.md` - Complete docs

2. **Customize**
   - Add your own branding
   - Modify AI prompts
   - Add more features

3. **Deploy**
   - Backend to AWS Lambda
   - Frontend to Vercel
   - Share your live URL!

4. **Submit**
   - GitHub repository link
   - Live application URL
   - Mention Level 3 completion

---

## ✅ Pre-Submission Checklist

- [ ] Backend running (local or Cloud Run)
- [ ] MongoDB Atlas configured
- [ ] Frontend working locally
- [ ] Can register and login
- [ ] Tasks generate from transcript
- [ ] Charts display correctly
- [ ] Filters work
- [ ] Export works (if implemented)
- [ ] Code pushed to GitHub
- [ ] README updated with your URLs
- [ ] Deployed to Vercel

---

## 🎯 For Your Interview

**When asked about your implementation:**

> "I implemented a complete Level 3 solution with:
> 
> **Architecture:**
> - Backend deployed to Google Cloud Run
> - MongoDB Atlas for persistent storage
> - JWT-based authentication
> - Next.js frontend with TypeScript
> 
> **Key Features:**
> - AI-powered task generation with auto-tagging
> - Priority detection (High/Medium/Low)
> - Team tag extraction (@Engineering, @Marketing)
> - Real-time analytics with charts
> - Task export functionality
> 
> **Tech Decisions:**
> - Google Gemini for cost-free AI
> - MongoDB for flexible document schema
> - Cloud Run for simple container-based deployment
> - One-command CLI deployment workflow
> - All within free tiers
> 
> The entire stack costs $0 while being production-ready and scalable."

---

**Good luck with your interview!** 🚀

Questions? Check the other documentation files or AWS/MongoDB docs.
