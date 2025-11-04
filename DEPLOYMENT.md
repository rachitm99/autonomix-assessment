# Deployment Checklist

## Pre-Deployment

- [ ] All code committed to Git
- [ ] `.env.local` is in `.gitignore` (already included)
- [ ] README.md is complete and accurate
- [ ] Application tested locally
- [ ] Sample transcript tested successfully

## Vercel Deployment

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel account created/logged in
- [ ] Project imported from GitHub
- [ ] `OPENAI_API_KEY` added to Vercel environment variables
- [ ] Deployment successful
- [ ] Live URL tested and working

## Post-Deployment

- [ ] Update README.md with live URL
- [ ] Test all features on live site:
  - [ ] Transcript submission
  - [ ] Task generation
  - [ ] Task completion toggle
  - [ ] Task deletion
  - [ ] Filters (status & priority)
  - [ ] Charts (pie & bar)
  - [ ] Clear all function
  - [ ] LocalStorage persistence
- [ ] Test on mobile device
- [ ] Test on different browsers

## Submission

- [ ] GitHub repository link ready
- [ ] Live hosted app link ready
- [ ] README.md specifies Level 2 completed
- [ ] All environment variables documented
- [ ] Setup instructions verified

## Quick Deploy Commands

```powershell
# Initialize Git (if not done)
git init
git add .
git commit -m "Initial commit: InsightBoard AI Dashboard"

# Create GitHub repo and push
git branch -M main
git remote add origin https://github.com/yourusername/autonomix-assessment.git
git push -u origin main

# Deploy to Vercel
vercel
```

## Environment Variables for Vercel

Add these in Vercel Dashboard -> Settings -> Environment Variables:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Final Check

✅ Application is live and accessible
✅ All features work correctly
✅ Documentation is complete
✅ No API keys in repository
✅ Ready for submission!
