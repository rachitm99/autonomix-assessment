# InsightBoard AI - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```powershell
npm install
```

### Step 2: Add Your FREE Gemini API Key
1. Copy `.env.local.example` to `.env.local`
2. Get your FREE API key from https://makersuite.google.com/app/apikey (no credit card!)
3. Add it to `.env.local`:
   ```
   GEMINI_API_KEY=your-key-here
   ```

💡 **Want other options?** Check `FREE-LLM-OPTIONS.md` for OpenAI, Groq, Claude

### Step 3: Run the App
```powershell
npm run dev
```

Visit http://localhost:3000

## 📋 What to Test

1. **Paste the sample transcript** from `Input Transcript.txt`
2. **Click "Generate Action Items"** - AI will create prioritized tasks
3. **Try the features:**
   - ✅ Mark tasks complete
   - 🗑️ Delete tasks
   - 🔍 Filter by status/priority
   - 📊 View charts

## 🌐 Deploy to Vercel

```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts)
vercel

# Add your FREE Gemini key in Vercel dashboard:
# Project Settings -> Environment Variables -> Add GEMINI_API_KEY
```

## 💡 Tips

- **Sample data**: Use `Input Transcript.txt` for testing
- **Storage**: Tasks persist in browser's LocalStorage
- **Charts**: Update automatically as you complete tasks
- **Filters**: Combine status + priority filters

## ❓ Issues?

- API errors? Get a free Gemini key at https://makersuite.google.com/app/apikey
- Build errors? Run `npm install` again
- Tasks not saving? Check browser's LocalStorage settings
- Want different AI? See `FREE-LLM-OPTIONS.md`

---
Happy coding! 🎉
