# 🚀 Google Cloud Run Deployment Guide

Deploy your InsightBoard AI backend to Google Cloud Run with simple CLI commands.

## Why Cloud Run?

✅ **Easier than AWS Lambda** - Direct deployment from source code
✅ **Generous free tier** - 2 million requests/month FREE
✅ **Auto-scaling** - Scales to zero when not in use
✅ **Simple CLI deployment** - One command to deploy
✅ **Automatic HTTPS** - SSL certificates included
✅ **Container-based** - Full Node.js environment

---

## Prerequisites

- Google Cloud account (free tier)
- Google Cloud CLI installed
- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- Google Gemini API key (free)

---

## Part 1: Setup Google Cloud (5 minutes)

### Step 1: Create Google Cloud Account

1. Go to: https://console.cloud.google.com
2. Sign up with your Google account
3. Accept terms and conditions
4. **Skip** billing for now (free tier doesn't require it)

### Step 2: Create a New Project

1. Click project dropdown (top left)
2. Click "New Project"
3. Project name: `insightboard-ai`
4. Click "Create"
5. **Note your Project ID** (e.g., `insightboard-ai-123456`)

### Step 3: Enable Billing (Required but FREE)

1. Go to "Billing" in the menu
2. Click "Link a billing account"
3. Add a payment method (won't be charged in free tier)
4. Free tier includes:
   - 2M Cloud Run requests/month
   - 360,000 GB-seconds of memory
   - 180,000 vCPU-seconds

---

## Part 2: Install Google Cloud CLI (5 minutes)

### For Windows:

```powershell
# Download installer
# Go to: https://cloud.google.com/sdk/docs/install
# Download and run GoogleCloudSDKInstaller.exe

# Or use PowerShell:
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")
& $env:Temp\GoogleCloudSDKInstaller.exe
```

### For Mac/Linux:

```bash
# Download and install
curl https://sdk.cloud.google.com | bash

# Restart shell
exec -l $SHELL

# Initialize
gcloud init
```

### Verify Installation:

```powershell
gcloud --version
```

Should show: `Google Cloud SDK 450.0.0` (or similar)

---

## Part 3: Setup MongoDB Atlas (Same as before)

If you haven't already:

1. **Create MongoDB Atlas account**: https://www.mongodb.com/cloud/atlas/register
2. **Create FREE cluster** (M0)
3. **Setup database user** with password
4. **Whitelist all IPs**: `0.0.0.0/0`
5. **Get connection string**: 
   ```
   mongodb+srv://insightboard:<password>@cluster0.xxxxx.mongodb.net/insightboard?retryWrites=true&w=majority
   ```

---

## Part 4: Initialize gcloud CLI (2 minutes)

```powershell
# Login to Google Cloud
gcloud auth login

# This will open browser - sign in with your Google account

# Set your project
gcloud config set project YOUR_PROJECT_ID

# Example:
gcloud config set project insightboard-ai-123456

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

---

## Part 5: Deploy Backend to Cloud Run (5 minutes)

### Option A: Automated Deploy Script (Easiest) ⭐

```powershell
# Navigate to backend folder
cd backend

# Run deploy script (PowerShell)
.\deploy.ps1

# Or for bash:
# chmod +x deploy.sh
# ./deploy.sh

# Follow the prompts:
# - Enter your GCP Project ID
# - Wait for build and deployment (~2-3 minutes)
```

### Option B: Manual Deploy (Step by step)

```powershell
# Navigate to backend folder
cd backend

# Deploy to Cloud Run
gcloud run deploy insightboard-api `
    --source . `
    --region us-central1 `
    --platform managed `
    --allow-unauthenticated `
    --memory 512Mi `
    --cpu 1 `
    --max-instances 10 `
    --port 8080
```

You'll see:
```
Building using Dockerfile and deploying container to Cloud Run service...
✓ Creating Container Repository...
✓ Uploading sources...
✓ Building Container...
✓ Deploying to Cloud Run...
✓ Done.

Service URL: https://insightboard-api-xxxxx-uc.a.run.app
```

**🎉 Copy this Service URL!**

---

## Part 6: Set Environment Variables (3 minutes)

### Option A: Via Console (Easier for beginners)

1. Go to: https://console.cloud.google.com/run
2. Click on `insightboard-api`
3. Click "Edit & Deploy New Revision"
4. Scroll to "Environment variables"
5. Click "Add Variable" for each:

   ```
   MONGODB_URI = your_mongodb_connection_string
   JWT_SECRET = your_generated_jwt_secret
   GEMINI_API_KEY = your_gemini_api_key
   NODE_ENV = production
   ```

6. Click "Deploy"

### Option B: Via CLI (Faster)

```powershell
# Generate JWT secret first
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Set environment variables
gcloud run services update insightboard-api `
    --region us-central1 `
    --set-env-vars "MONGODB_URI=your_mongodb_uri,JWT_SECRET=your_jwt_secret,GEMINI_API_KEY=your_gemini_key,NODE_ENV=production"
```

---

## Part 7: Test Your Deployment (2 minutes)

### Test Health Endpoint:

```powershell
# Replace with your actual service URL
curl https://insightboard-api-xxxxx-uc.a.run.app/health
```

Should return:
```json
{
  "status": "OK",
  "timestamp": "2025-11-04T...",
  "uptime": 123.45
}
```

### Test API Root:

```powershell
curl https://insightboard-api-xxxxx-uc.a.run.app/
```

Should return:
```json
{
  "message": "InsightBoard AI Backend API",
  "version": "1.0.0",
  "status": "running"
}
```

✅ **Backend is live!**

---

## Part 8: Update Frontend (2 minutes)

### Update .env.local:

```powershell
# In main project folder (not backend)
cd ..
notepad .env.local
```

Update with your Cloud Run URL:
```env
NEXT_PUBLIC_API_URL=https://insightboard-api-xxxxx-uc.a.run.app/api
```

**Important:** Add `/api` at the end!

### Redeploy Frontend:

```powershell
# If using Vercel
vercel --prod

# Or update environment variable in Vercel dashboard
```

---

## 🎯 Complete CLI Deployment Commands

Here's the complete sequence for copy-paste:

```powershell
# 1. Login and setup
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud services enable run.googleapis.com cloudbuild.googleapis.com

# 2. Navigate to backend
cd backend

# 3. Deploy
gcloud run deploy insightboard-api `
    --source . `
    --region us-central1 `
    --platform managed `
    --allow-unauthenticated `
    --memory 512Mi `
    --cpu 1 `
    --port 8080

# 4. Set environment variables
gcloud run services update insightboard-api `
    --region us-central1 `
    --set-env-vars "MONGODB_URI=mongodb+srv://...,JWT_SECRET=...,GEMINI_API_KEY=...,NODE_ENV=production"

# 5. Get service URL
gcloud run services describe insightboard-api --region us-central1 --format 'value(status.url)'
```

---

## 📊 Cloud Run Configuration

| Setting | Value | Why |
|---------|-------|-----|
| **Memory** | 512Mi | Enough for Node.js + MongoDB |
| **CPU** | 1 | Sufficient for API requests |
| **Max Instances** | 10 | Prevent unexpected scaling costs |
| **Port** | 8080 | Cloud Run standard |
| **Region** | us-central1 | Good global latency |
| **Auth** | unauthenticated | Public API |

---

## 💰 Cost Breakdown (FREE!)

| Resource | Free Tier | Project Usage | Cost |
|----------|-----------|---------------|------|
| **Cloud Run Requests** | 2M/month | ~1000/month | $0.00 |
| **Cloud Run CPU** | 180K vCPU-sec | ~5K/month | $0.00 |
| **Cloud Run Memory** | 360K GB-sec | ~10K/month | $0.00 |
| **Cloud Build** | 120 build-min/day | ~5 min/deploy | $0.00 |
| **MongoDB Atlas** | 512MB | ~50MB | $0.00 |
| **Gemini API** | 60 req/min | ~100/day | $0.00 |
| **Total** | | | **$0.00** ✅ |

---

## 🔄 Updating Your Deployment

### After code changes:

```powershell
# Navigate to backend
cd backend

# Redeploy (will rebuild container)
gcloud run deploy insightboard-api `
    --source . `
    --region us-central1

# Or use the script
.\deploy.ps1
```

### Update single environment variable:

```powershell
gcloud run services update insightboard-api `
    --region us-central1 `
    --update-env-vars GEMINI_API_KEY=new_key_here
```

### View logs:

```powershell
gcloud run logs read insightboard-api --region us-central1
```

---

## 🐛 Troubleshooting

### "Permission denied" error:
```powershell
# Give Cloud Build permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID `
    --member serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com `
    --role roles/run.admin
```

### "Service not found":
```powershell
# Check your region
gcloud run services list

# Deploy to correct region
gcloud run deploy insightboard-api --region us-central1 --source .
```

### "MongoDB connection failed":
- Check `MONGODB_URI` is correct
- Verify IP whitelist includes `0.0.0.0/0`
- Test connection string locally first

### Container build fails:
```powershell
# Check Dockerfile syntax
docker build -t test .

# View build logs
gcloud builds list --limit=5
```

### Cold start delays:
- Cloud Run scales to zero when idle
- First request after idle may take 2-3 seconds
- Subsequent requests are fast (<100ms)
- Set minimum instances to avoid (costs money):
  ```powershell
  gcloud run services update insightboard-api `
      --region us-central1 `
      --min-instances 1
  ```

---

## 📈 Monitoring & Logs

### View logs:
```powershell
# Real-time logs
gcloud run logs tail insightboard-api --region us-central1

# Recent logs
gcloud run logs read insightboard-api --region us-central1 --limit 50
```

### View metrics:
1. Go to: https://console.cloud.google.com/run
2. Click on `insightboard-api`
3. Click "Metrics" tab
4. See requests, latency, errors

### Set up alerts:
1. Go to "Monitoring" in Cloud Console
2. Create alerting policy
3. Get notified of errors or high latency

---

## 🔒 Security Best Practices

1. **Use Secret Manager** (optional, for production):
   ```powershell
   # Store secret
   echo -n "your-jwt-secret" | gcloud secrets create jwt-secret --data-file=-
   
   # Use in Cloud Run
   gcloud run services update insightboard-api `
       --region us-central1 `
       --set-secrets JWT_SECRET=jwt-secret:latest
   ```

2. **Enable VPC** (optional, for private MongoDB):
   ```powershell
   gcloud run services update insightboard-api `
       --region us-central1 `
       --vpc-connector your-connector
   ```

3. **Add authentication** (if needed):
   ```powershell
   gcloud run services update insightboard-api `
       --region us-central1 `
       --no-allow-unauthenticated
   ```

---

## 🎓 For Your Interview

When asked about deployment:

> "I deployed the backend to Google Cloud Run because:
> 
> **Simplicity:** Single command deployment from source code - no complex container registry setup
> 
> **Cost-effective:** Pay only for actual request time, scales to zero when idle, 2M free requests/month
> 
> **Modern:** Container-based with automatic HTTPS, built-in load balancing, and auto-scaling
> 
> **Developer-friendly:** Easy CLI deployment, great logging, simple environment variable management
> 
> The deployment process is:
> 1. `gcloud run deploy` - builds container and deploys
> 2. Set environment variables via CLI or console
> 3. Get instant HTTPS URL
> 
> Total setup time: under 10 minutes. Total cost: $0 within free tier."

---

## 📞 Quick Reference

### Common Commands:

```powershell
# Deploy
gcloud run deploy insightboard-api --source . --region us-central1

# Update env vars
gcloud run services update insightboard-api --region us-central1 --set-env-vars KEY=VALUE

# View service URL
gcloud run services describe insightboard-api --region us-central1 --format 'value(status.url)'

# View logs
gcloud run logs read insightboard-api --region us-central1

# Delete service
gcloud run services delete insightboard-api --region us-central1
```

### Service URLs:
- **Your API**: `https://insightboard-api-xxxxx-uc.a.run.app`
- **Console**: https://console.cloud.google.com/run
- **Documentation**: https://cloud.google.com/run/docs

---

## ✅ Deployment Checklist

- [ ] Google Cloud account created
- [ ] Project created and billing enabled
- [ ] gcloud CLI installed and authenticated
- [ ] MongoDB Atlas cluster created
- [ ] Gemini API key obtained
- [ ] Backend deployed to Cloud Run
- [ ] Environment variables set
- [ ] Health endpoint tested
- [ ] Frontend updated with API URL
- [ ] Full integration tested

---

**🎉 Your backend is now live on Google Cloud Run!**

Simpler than AWS Lambda, cheaper than traditional servers, and perfect for interviews! 🚀
