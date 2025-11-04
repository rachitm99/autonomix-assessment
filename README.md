# InsightBoard AI Dashboard

A smart dashboard application that transforms meeting transcripts into actionable tasks using AI. Built for the InsightBoard AI take-home assignment.

![InsightBoard AI](https://img.shields.io/badge/Level-2-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-green)

## 🎯 Level Completed: **Level 2**

This implementation includes:
- ✅ All Level 1 mandatory features
- ✅ Level 2 enhancements (filtering, sorting, AI prioritization, bar chart, persistent storage)

## 🚀 Live Demo

**Hosted App:** [Deploy this to Vercel and add the link here]

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts

### Backend
- **Runtime:** Next.js API Routes
- **LLM API:** Google Gemini Pro (FREE - no credit card required!)
- **Alternative:** OpenAI, Groq, Claude (see FREE-LLM-OPTIONS.md)
- **Data Persistence:** LocalStorage (client-side)

### Hosting
- **Platform:** Vercel (recommended)
- **Alternative:** Netlify, Render

## ✨ Features

### Level 1 (Core Features)
1. **Transcript Submission** - Multi-line text area for meeting transcripts
2. **AI-Powered Task Generation** - OpenAI integration for extracting action items
3. **Task Interaction** - Mark tasks as complete or delete them
4. **Progress Visualization** - Pie chart showing completion percentage
5. **Modern UI** - Responsive design with Tailwind CSS
6. **Deployment** - Fully hosted and accessible

### Level 2 (Enhancements)
1. **Filter & Sort** - Filter by status (pending/completed) and priority (high/medium/low)
2. **AI-Powered Prioritization** - Automatic priority assignment based on urgency
3. **Bar Chart Visualization** - Priority distribution chart
4. **Persistent Storage** - Tasks saved to browser's LocalStorage

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key (FREE - no credit card needed!)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/autonomix-assessment.git
   cd autonomix-assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   To get a FREE Gemini API key (no credit card required):
   - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Sign in with Google
   - Click "Create API Key"
   - Copy your key
   
   **Want to use other providers?** See `FREE-LLM-OPTIONS.md` for OpenAI, Groq, Claude options

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/autonomix-assessment.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variable: `GEMINI_API_KEY` (your free API key)
   - Click "Deploy"

3. **Your app will be live!**
   
   Vercel will provide a URL like: `https://your-app.vercel.app`

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect your GitHub repository
   - Add environment variable: `GEMINI_API_KEY` (your free API key)
   - Deploy

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
├── app/
│   ├── api/
│   │   └── generate-tasks/
│   │       └── route.ts          # OpenAI API integration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main dashboard page
├── components/
│   ├── TranscriptForm.tsx        # Transcript input form
│   ├── TaskList.tsx              # Task list with filters
│   ├── ProgressChart.tsx         # Pie chart for completion
│   └── PriorityChart.tsx         # Bar chart for priorities
├── types/
│   └── index.ts                  # TypeScript interfaces
├── public/                       # Static assets
├── .env.local.example            # Environment variables template
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
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

### Why Next.js?
- Full-stack in one framework (frontend + API routes)
- Built-in TypeScript support
- Excellent deployment experience on Vercel
- App Router for modern React patterns

### Why Google Gemini?
- **100% FREE** - No credit card required, ever
- Fast response times (< 5 seconds)
- Quality comparable to GPT-3.5
- Excellent at understanding context and prioritization
- Simple API integration
- Generous free tier (60 requests/min)

**Alternative options**: See `FREE-LLM-OPTIONS.md` for OpenAI, Groq, Claude

### Why LocalStorage?
- Level 1 doesn't require database
- Instant persistence without backend complexity
- Easy to migrate to database later (Level 2+)
- No additional infrastructure needed

### Why Recharts?
- React-first charting library
- TypeScript support
- Responsive by default
- Clean, modern aesthetics

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

## 📝 Future Enhancements (Level 3)

Potential additions for Level 3:
- [ ] PostgreSQL database with Prisma ORM
- [ ] User authentication (NextAuth.js)
- [ ] AI auto-tagging (@team mentions)
- [ ] Export tasks to CSV/JSON
- [ ] Task search functionality
- [ ] Due date tracking
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Collaboration features

## 📄 License

This project was created for the InsightBoard AI take-home assessment.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- OpenAI for the GPT-3.5 API
- Next.js team for the excellent framework
- Vercel for seamless deployment
- Recharts for beautiful visualizations

---

**Built with ❤️ for InsightBoard AI**
