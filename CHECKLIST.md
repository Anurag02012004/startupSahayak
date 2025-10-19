# ✅ StartupSahayak Setup Checklist

Use this checklist to ensure everything is set up correctly.

---

## 📋 Pre-Setup Checklist

- [ ] Node.js 18+ is installed
  - Check: `node --version`
  
- [ ] npm is installed
  - Check: `npm --version`

- [ ] Git is installed (optional, for version control)
  - Check: `git --version`

---

## 🔑 API Key Setup

- [ ] Created account at [console.x.ai](https://console.x.ai/)
- [ ] Generated Grok API key
- [ ] Copied API key to clipboard
- [ ] Created `.env.local` file in project root
- [ ] Added `XAI_API_KEY=your_key` to `.env.local`
- [ ] Verified `.env.local` is in `.gitignore`

---

## 📦 Installation Checklist

- [ ] Ran `npm install --legacy-peer-deps`
- [ ] Installation completed without errors
- [ ] `node_modules` folder exists
- [ ] Dependencies installed (319 packages)

---

## 🚀 First Run Checklist

- [ ] Ran `npm run dev`
- [ ] Server started successfully
- [ ] No error messages in terminal
- [ ] App running at `http://localhost:3000`

---

## 🧪 Testing Checklist

### Home Page
- [ ] Homepage loads at `http://localhost:3000`
- [ ] Navigation bar visible
- [ ] No console errors in browser

### Chat Feature (`/chat`)
- [ ] Chat page loads at `http://localhost:3000/chat`
- [ ] Chat interface displays correctly
- [ ] Input box is visible and clickable
- [ ] Suggested questions appear
- [ ] Can type a question
- [ ] "Send" button works
- [ ] AI responds to messages
- [ ] Response streams in real-time
- [ ] No errors in browser console
- [ ] Error message shows if API fails

### Evaluation Feature (`/evaluate`)
- [ ] Evaluation page loads at `http://localhost:3000/evaluate`
- [ ] Multi-step form displays
- [ ] Can enter idea title
- [ ] Can enter idea description
- [ ] Can select industry
- [ ] Can navigate between steps
- [ ] Submit button works
- [ ] Evaluation response displays
- [ ] Score is shown
- [ ] Recommendations are provided
- [ ] Can save results

---

## 🔍 Verification Checklist

### Files Exist
- [ ] `.env.local` (with your API key)
- [ ] `node_modules/` folder
- [ ] `package.json`
- [ ] `QUICK_START.md`
- [ ] `CHATBOT_FIX_README.md`
- [ ] `SETUP_GUIDE.md`

### API Routes Work
- [ ] `/api/chat` endpoint responds
- [ ] `/api/evaluate` endpoint responds
- [ ] No 500 errors
- [ ] Streaming responses work

### No Auth Required
- [ ] Can access `/chat` without login
- [ ] Can access `/evaluate` without login
- [ ] No redirects to `/login`
- [ ] No evaluation limits

---

## 🐛 Troubleshooting Checklist

If something doesn't work:

- [ ] Checked browser console for errors (F12)
- [ ] Verified `.env.local` has correct API key
- [ ] Restarted development server
- [ ] Cleared browser cache
- [ ] Checked terminal for error messages
- [ ] API key is valid at console.x.ai
- [ ] Internet connection is working

---

## 🎯 Example Tests

### Test 1: Ask About Startup India
```
Question: "How do I register under Startup India scheme?"
Expected: Detailed response about registration process
```

### Test 2: Evaluate an Idea
```
Idea: "Food delivery app for tier 3 cities"
Expected: Score, strengths, challenges, recommendations
```

### Test 3: Ask About Funding
```
Question: "What are the best angel investors in India?"
Expected: List of investors with details
```

---

## 📊 Success Criteria

✅ **All tests pass** = Chatbot is working correctly!

Your chatbot is ready when:
- [ ] Chat page loads and responds
- [ ] Evaluation page works end-to-end
- [ ] No authentication required
- [ ] AI responses are India-focused
- [ ] Error handling works
- [ ] Can save results locally

---

## 🚀 Deployment Checklist

When ready to deploy:

- [ ] Ran `npm run build` successfully
- [ ] No build errors
- [ ] Tested production build locally with `npm start`
- [ ] Chosen deployment platform (Vercel/Netlify)
- [ ] Added `XAI_API_KEY` to platform environment variables
- [ ] Deployed successfully
- [ ] Tested deployed app
- [ ] Chat works on production
- [ ] Evaluation works on production

---

## 📝 Documentation Review

- [ ] Read `QUICK_START.md`
- [ ] Reviewed `CHATBOT_FIX_README.md`
- [ ] Checked `SETUP_GUIDE.md` for details
- [ ] Reviewed `CHANGES_SUMMARY.md` to understand changes

---

## 🎉 Final Verification

When everything is ✅:

```bash
# Your chatbot is:
✅ Installed
✅ Configured
✅ Working
✅ Tested
✅ Ready to use!
```

---

## 📞 Need Help?

If any item is ❌:

1. Check the specific documentation file
2. Review troubleshooting section
3. Verify all previous steps completed
4. Check browser console for errors
5. Verify API key is correct

---

## 🎯 Next Steps After Setup

Once all items are ✅:

1. **Customize:** Update branding and colors
2. **Enhance:** Add more features
3. **Deploy:** Push to production
4. **Share:** Let users try your chatbot!
5. **Monitor:** Track usage and feedback

---

**Happy Building! 🚀**

*Use this checklist every time you set up the project on a new machine.*

---

**Checklist Version:** 1.0
**Last Updated:** October 19, 2025
