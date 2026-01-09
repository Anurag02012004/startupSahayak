# QUICK START - StartupSahayak Chatbot

## 3-Step Setup (5 Minutes)

### Step 1: Get Grok API Key (2 min)
1. Go to: **https://console.x.ai/**
2. Sign up / Login
3. Click "API Keys" → "Create New Key"
4. **COPY** your key

### Step 2: Add API Key (1 min)
Open `.env.local` in project root:
```env
XAI_API_KEY=paste-your-key-here
```

### Step 3: Start Server (2 min)
```bash
npm run dev
```

**Done!** Visit: **http://localhost:3000/chat**

---

## What's Fixed

- Chatbot works with **Grok API**
- **No login required**
- Error-free
- Dependencies installed
- Ready to use!

---

## Test It Now

### Try the Chat:
```
http://localhost:3000/chat
```

Ask: *"What funding options exist for Indian startups?"*

### Try Idea Evaluation:
```
http://localhost:3000/evaluate
```

Fill in your startup idea and get AI feedback!

---

## Troubleshooting

**"Grok API key not configured"**
→ Check `.env.local` has your key

**Port 3000 in use**
→ Run: `PORT=3001 npm run dev`

**Chat not responding**
→ Check browser console (F12) for errors

---

## Full Documentation

- `CHATBOT_FIX_README.md` - Complete guide
- `SETUP_GUIDE.md` - Detailed instructions
- `CHANGES_SUMMARY.md` - All changes made

---

## You're Ready!

Your AI chatbot is now working and ready to help Indian entrepreneurs!

**Need help?** Read the full guides above.

**Happy Building! **
