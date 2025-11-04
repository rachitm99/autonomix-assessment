# Deploy script for Google Cloud Run

Write-Host "Deploying InsightBoard AI Backend to Google Cloud Run" -ForegroundColor Cyan
Write-Host ""

# Check if gcloud is installed
if (-not (Get-Command gcloud -ErrorAction SilentlyContinue)) {
    Write-Host "Error: gcloud CLI is not installed" -ForegroundColor Red
    Write-Host "Install from: https://cloud.google.com/sdk/docs/install" -ForegroundColor Yellow
    exit 1
}

# Set variables
$PROJECT_ID = Read-Host "Enter your GCP Project ID"
$SERVICE_NAME = "insightboard-api"
$REGION = "us-central1"

Write-Host ""
Write-Host "Configuration:" -ForegroundColor Green
Write-Host "  Project: $PROJECT_ID"
Write-Host "  Service: $SERVICE_NAME"
Write-Host "  Region: $REGION"
Write-Host ""

# Set project
Write-Host "Setting GCP project..." -ForegroundColor Cyan
gcloud config set project $PROJECT_ID

# Enable required APIs
Write-Host "Enabling required APIs..." -ForegroundColor Cyan
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Deploy to Cloud Run
Write-Host "Deploying to Cloud Run..." -ForegroundColor Cyan
Write-Host ""

gcloud run deploy $SERVICE_NAME `
    --source . `
    --region $REGION `
    --platform managed `
    --allow-unauthenticated `
    --memory 512Mi `
    --cpu 1 `
    --max-instances 10 `
    --port 8080 `
    --set-env-vars NODE_ENV=production

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your API is live at:" -ForegroundColor Cyan
    $SERVICE_URL = gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)'
    Write-Host "   $SERVICE_URL" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Set environment variables in Cloud Run console"
    Write-Host "   2. Update frontend .env.local with: NEXT_PUBLIC_API_URL=$SERVICE_URL/api"
    Write-Host "   3. Test: curl $SERVICE_URL/health"
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Deployment failed!" -ForegroundColor Red
    Write-Host "Check the errors above and try again." -ForegroundColor Yellow
    exit 1
}
