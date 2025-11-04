# 🚀 AWS Lambda Deployment Guide

This guide walks you through deploying the InsightBoard AI backend to AWS Lambda.

## Prerequisites

- AWS Account (free tier eligible)
- AWS CLI installed and configured
- Node.js 18+ installed
- MongoDB Atlas account (free tier)

## Step 1: Setup MongoDB Atlas (FREE)

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster**
   - Choose "Shared" (FREE - M0)
   - Select AWS as provider
   - Choose closest region
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `insightboard`
   - Password: Generate a secure password
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Setup Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" -> "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `insightboard`

## Step 2: Setup Backend Environment

```powershell
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example .env

# Edit .env
notepad .env
```

Add your values:
```env
MONGODB_URI=mongodb+srv://insightboard:<password>@cluster0.xxxxx.mongodb.net/insightboard?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=production
```

Generate JWT Secret:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 3: Test Backend Locally

```powershell
# Run locally
npm run dev

# Test in another terminal
curl http://localhost:5000/health
```

Should return: `{"status":"OK","timestamp":"..."}`

## Step 4: Prepare for AWS Lambda

### Install AWS CLI

Download from: https://aws.amazon.com/cli/

Configure:
```powershell
aws configure
# Enter: AWS Access Key ID
# Enter: AWS Secret Access Key
# Region: us-east-1 (or your preferred)
# Output format: json
```

### Create Lambda Function Package

```powershell
# In backend folder
# Create deployment package
npm run build  # This creates function.zip
```

## Step 5: Deploy to AWS Lambda

### Option A: AWS Console (Easier)

1. **Go to AWS Lambda Console**
   - https://console.aws.amazon.com/lambda

2. **Create Function**
   - Click "Create function"
   - Choose "Author from scratch"
   - Function name: `insightboard-api`
   - Runtime: Node.js 18.x
   - Architecture: x86_64
   - Click "Create function"

3. **Upload Code**
   - In "Code" tab, click "Upload from"
   - Choose ".zip file"
   - Upload `backend/function.zip`
   - Click "Save"

4. **Configure**
   - Handler: `src/index.handler`
   - Timeout: 30 seconds
   - Memory: 512 MB

5. **Add Environment Variables**
   - Go to "Configuration" -> "Environment variables"
   - Click "Edit" -> "Add environment variable"
   - Add:
     - `MONGODB_URI` = your_connection_string
     - `JWT_SECRET` = your_jwt_secret
     - `GEMINI_API_KEY` = your_gemini_key
     - `NODE_ENV` = production

6. **Create API Gateway**
   - Go to "Configuration" -> "Function URL"
   - Click "Create function URL"
   - Auth type: NONE
   - CORS: Enable
   - Click "Save"
   - **Copy the Function URL!**

### Option B: AWS CLI (Advanced)

```powershell
# Create Lambda function
aws lambda create-function `
  --function-name insightboard-api `
  --runtime nodejs18.x `
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-ex `
  --handler src/index.handler `
  --zip-file fileb://function.zip `
  --timeout 30 `
  --memory-size 512

# Add environment variables
aws lambda update-function-configuration `
  --function-name insightboard-api `
  --environment "Variables={MONGODB_URI=your_uri,JWT_SECRET=your_secret,GEMINI_API_KEY=your_key,NODE_ENV=production}"

# Create function URL
aws lambda create-function-url-config `
  --function-name insightboard-api `
  --auth-type NONE `
  --cors "AllowOrigins=*,AllowMethods=*,AllowHeaders=*"
```

## Step 6: Update Frontend

Update `.env.local` in the main project:

```env
NEXT_PUBLIC_API_URL=https://your-lambda-url.lambda-url.us-east-1.on.aws/api
```

## Step 7: Test Deployment

```powershell
# Test health endpoint
curl https://your-lambda-url.lambda-url.us-east-1.on.aws/health

# Should return: {"status":"OK","timestamp":"..."}
```

## Step 8: Deploy Frontend to Vercel

```powershell
# In main project folder (not backend)
vercel

# Add environment variable in Vercel dashboard:
# NEXT_PUBLIC_API_URL = your_lambda_url/api
```

## 🎯 Cost Breakdown (All FREE for this project!)

| Service | Free Tier | Project Usage | Cost |
|---------|-----------|---------------|------|
| MongoDB Atlas | 512MB | ~50MB | **$0** |
| AWS Lambda | 1M requests/month | ~1000/month | **$0** |
| Vercel | Unlimited | 1 project | **$0** |
| Gemini API | 60 req/min | ~100/day | **$0** |
| **Total** | | | **$0.00** ✅ |

## 🔒 Security Best Practices

1. **Never commit .env files**
2. **Use strong JWT secrets** (32+ characters)
3. **Rotate API keys** regularly
4. **Monitor usage** on AWS/MongoDB dashboards
5. **Enable AWS CloudWatch** for logs

## 🐛 Troubleshooting

### Lambda times out
- Increase timeout to 30 seconds
- Check MongoDB connection string
- Verify VPC settings (if used)

### MongoDB connection error
- Check IP whitelist (0.0.0.0/0)
- Verify connection string
- Confirm database user credentials

### CORS errors
- Enable CORS on Lambda Function URL
- Check frontend API_URL is correct

### Environment variables not working
- Redeploy after changing env vars
- Check spelling carefully
- Restart Lambda function

## 📊 Monitoring

### AWS CloudWatch
- View Lambda logs
- Monitor invocations
- Check errors

### MongoDB Atlas
- View connection stats
- Monitor database size
- Check query performance

## 🔄 Updates

To update your Lambda function:

```powershell
# In backend folder
npm run build
aws lambda update-function-code --function-name insightboard-api --zip-file fileb://function.zip
```

## 🎓 For Your Interview

Mention:
> "I deployed the backend as a serverless function on AWS Lambda with MongoDB Atlas for the database. This architecture provides:
> - **Auto-scaling** - handles traffic spikes automatically
> - **Cost-effective** - pay only for actual usage (essentially free for this scale)
> - **High availability** - AWS manages infrastructure
> - **Easy maintenance** - single zip file deployment
> 
> The separation of backend and frontend allows for independent scaling and deployment."

---

**Need help?** Check AWS Lambda docs: https://docs.aws.amazon.com/lambda/
