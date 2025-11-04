#!/bin/bash

# Deploy script for Google Cloud Run (bash version)

echo "🚀 Deploying InsightBoard AI Backend to Google Cloud Run"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI is not installed"
    echo "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Set variables
read -p "Enter your GCP Project ID: " PROJECT_ID
SERVICE_NAME="insightboard-api"
REGION="us-central1"

echo ""
echo "📋 Configuration:"
echo "  Project: $PROJECT_ID"
echo "  Service: $SERVICE_NAME"
echo "  Region: $REGION"
echo ""

# Set project
echo "🔧 Setting GCP project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
echo ""

gcloud run deploy $SERVICE_NAME \
    --source . \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 10 \
    --port 8080 \
    --set-env-vars NODE_ENV=production

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🌐 Your API is live at:"
    SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)')
    echo "   $SERVICE_URL"
    echo ""
    echo "⚙️  Next steps:"
    echo "   1. Set environment variables in Cloud Run console"
    echo "   2. Update frontend .env.local with: NEXT_PUBLIC_API_URL=$SERVICE_URL/api"
    echo "   3. Test: curl $SERVICE_URL/health"
    echo ""
else
    echo ""
    echo "❌ Deployment failed!"
    echo "Check the errors above and try again."
    exit 1
fi
