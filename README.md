# 🚀 StartupSahayak - AI-Powered Startup Mentor

> Your intelligent AI assistant for validating and building successful startups in the Indian market

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![Grok API](https://img.shields.io/badge/Grok-API-orange)](https://x.ai/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## 🌟 Overview

**StartupSahayak** (Sanskrit: सहायक meaning "assistant" or "helper") is an AI-driven platform designed to help aspiring entrepreneurs evaluate their startup ideas and transform them into successful ventures. It acts as a virtual startup mentor, analyzing an idea's potential, suggesting improvements, and guiding users through the process of building a viable business — all personalized for the **Indian startup ecosystem**.

### ✨ Key Features

- 🤖 **AI Chat Advisor** - Real-time chat with an AI expert on Indian startup ecosystem
- 📊 **Idea Evaluation** - Comprehensive AI-powered analysis of startup potential
- 🇮🇳 **India-Focused** - Specialized insights for the Indian market
- 🔓 **No Login Required** - Free and accessible to everyone
- ⚡ **Real-time Streaming** - Fast, responsive AI interactions
- 💾 **Local Save** - Save your evaluations in browser

---

## 🚨 CHATBOT IS NOW FIXED! ✅

### What's New:
- ✅ **Integrated with Grok API** (xAI's powerful AI)
- ✅ **Removed login requirements** - Anyone can use it!
- ✅ **Error-free and tested**
- ✅ **Ready to deploy**

### Quick Start:

```bash
# 1. Get your Grok API key from: https://console.x.ai/

# 2. Add it to .env.local:
XAI_API_KEY=your_api_key_here

# 3. Install and run:
npm install --legacy-peer-deps
npm run dev

# 4. Visit: http://localhost:3000/chat
```

**📖 Full setup guide:** See [`QUICK_START.md`](./QUICK_START.md)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start-5-minutes)
- [Documentation](#documentation)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## ✨ Features

### 🤖 AI Chat Advisor (`/chat`)

Get real-time advice from an AI expert specializing in the Indian startup ecosystem:

- Market research and validation
- Regulatory compliance (GST, licenses, data protection)
- Funding landscape (VCs, angels, government schemes)
- Startup India registration and benefits
- Regional market insights (tier 1, 2, 3 cities)
- Success stories and case studies

**Example Questions:**
- "What are the key regulations for fintech startups in India?"
- "How do I apply for Startup India recognition?"
- "Which tier 2 cities are best for testing my product?"

### 📊 Startup Idea Evaluation (`/evaluate`)

Comprehensive AI-powered analysis of your startup idea:

**Evaluation Factors:**
- Market size and growth potential in India
- Competitive landscape analysis
- Regulatory environment
- Consumer behavior patterns
- Infrastructure readiness
- Funding environment
- Localization requirements
- Unit economics

**What You Get:**
- **Potential Score** (0-100)
- **Key Strengths** for Indian market
- **Challenges** specific to India
- **Step-by-Step Roadmap** (for high-potential ideas)
- **Pivot Suggestions** (for ideas needing improvement)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **AI:** Grok (xAI) via Vercel AI SDK
- **UI Components:** Radix UI primitives
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Grok API key from [console.x.ai](https://console.x.ai/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Anurag02012004/startupSahayak.git
cd startupSahayak

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Copy environment variables template
cp .env.example .env.local

# 4. Add your Grok API key to .env.local
# Edit .env.local and add:
XAI_API_KEY=your_actual_grok_api_key_here

# 5. Start development server
npm run dev

# 6. Open in browser
# Visit: http://localhost:3000
```

### Get Your Grok API Key

1. Visit [console.x.ai](https://console.x.ai/)
2. Sign up or log in
3. Go to **API Keys** section
4. Click **Create New Key**
5. Copy your API key
6. Paste it in `.env.local`

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [`QUICK_START.md`](./QUICK_START.md) | ⚡ Get started in 3 steps |
| [`CHATBOT_FIX_README.md`](./CHATBOT_FIX_README.md) | 📖 Complete chatbot guide |
| [`SETUP_GUIDE.md`](./SETUP_GUIDE.md) | 🔧 Detailed setup instructions |
| [`CHANGES_SUMMARY.md`](./CHANGES_SUMMARY.md) | 📝 All changes made |

---

## 🌐 API Endpoints

### `POST /api/chat`

Real-time chat with AI advisor.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Your question here" }
  ]
}
```

**Response:** Streaming text (Server-Sent Events)

### `POST /api/evaluate`

Evaluate startup idea with comprehensive analysis.

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Detailed startup idea description"
    }
  ]
}
```

**Response:** Streaming evaluation with score and recommendations

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Add environment variable in Vercel dashboard:
# XAI_API_KEY=your_key
```

### Deploy to Netlify

```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Build the project
npm run build

# 3. Deploy
netlify deploy --prod

# 4. Add environment variable in Netlify dashboard:
# XAI_API_KEY=your_key
```

### Environment Variables for Production

Required:
- `XAI_API_KEY` - Your Grok API key

Optional:
- `NEXTAUTH_URL` - Your app URL
- `NEXTAUTH_SECRET` - Secret for authentication

---

## 📁 Project Structure

```
startupSahayak/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts          # Chat API with Grok
│   │   ├── evaluate/
│   │   │   └── route.ts          # Evaluation API
│   │   └── auth/                 # NextAuth (optional)
│   ├── chat/
│   │   └── page.tsx              # Chat interface
│   ├── evaluate/
│   │   └── page.tsx              # Evaluation form
│   └── (other pages...)
├── components/
│   ├── ui/                       # shadcn/ui components
│   └── (custom components...)
├── lib/
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── .env.local                    # Your API keys (DON'T COMMIT!)
├── .env.example                  # Environment template
└── (documentation files...)
```

---

## 🎯 Use Cases

### For Entrepreneurs
- Validate startup ideas before investing time/money
- Get market insights specific to India
- Understand regulatory requirements
- Find funding opportunities
- Learn from Indian startup success stories

### For Students
- Explore entrepreneurship
- Learn about Indian startup ecosystem
- Practice business planning
- Get mentorship without barriers

### For Investors
- Quickly assess startup potential
- Understand market dynamics
- Evaluate team and execution plans

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Areas for Contribution
- 🌐 Add multilingual support (Hindi, Tamil, Telugu)
- 📊 Improve evaluation algorithms
- 🎨 Enhance UI/UX
- 📝 Add more documentation
- 🐛 Fix bugs
- ✨ Suggest new features

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** "Grok API key not configured"
**Solution:** Ensure `XAI_API_KEY` is set in `.env.local` and restart server

**Issue:** Chat not responding
**Solution:** Check browser console for errors, verify API key

**Issue:** Port 3000 already in use
**Solution:** Use different port: `PORT=3001 npm run dev`

**Issue:** Dependency conflicts
**Solution:** Use `npm install --legacy-peer-deps`

See [`SETUP_GUIDE.md`](./SETUP_GUIDE.md) for more troubleshooting.

---

## 📜 License

This project is for educational purposes. Please comply with xAI's API terms of service.

---

## 🙏 Acknowledgments

- **xAI** for Grok API
- **Vercel** for Next.js and AI SDK
- **shadcn** for beautiful UI components
- **Indian startup ecosystem** for inspiration

---

## 📞 Support

- 📧 Email: [your-email@example.com]
- 🐦 Twitter: [@your-twitter]
- 💬 Issues: [GitHub Issues](https://github.com/Anurag02012004/startupSahayak/issues)

---

## 🗺️ Roadmap

- [x] Core chatbot functionality
- [x] Idea evaluation system
- [x] Grok API integration
- [x] Remove authentication requirements
- [ ] Add database for persistent storage
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] PDF export for evaluations
- [ ] Community features
- [ ] Mobile app

---

## ⭐ Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ for Indian Entrepreneurs**

*StartupSahayak - Your AI Sahayak (Assistant) for Startup Success*

---

**Status:** ✅ Production Ready | 🚀 Actively Maintained

**Last Updated:** October 19, 2025