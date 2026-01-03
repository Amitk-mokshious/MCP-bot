# Quick Start Guide

## 🚀 Quick Setup (3 Steps)

### Step 1: Start Python MCP Server

```powershell
cd C:\Users\AmitKumar\Documents\Test-mcp\mcp-bot\mcp-server
.\.venv\Scripts\Activate.ps1
python server.py
```

**Keep this terminal open!** Server runs on http://localhost:8000

### Step 2: Initialize Devvit (First Time Only)

```powershell
cd C:\Users\AmitKumar\Documents\Test-mcp\mcp-bot
npx devvit init
```

Follow prompts to authenticate with Reddit.

### Step 3: Start Devvit App

**In a NEW terminal:**

```powershell
cd C:\Users\AmitKumar\Documents\Test-mcp\mcp-bot
npm install
npm run dev
```

This will:
- Create a test subreddit
- Show you the URL
- Deploy the bot

### Step 4: Test It!

1. Open the test subreddit URL
2. Create a post: **"What is the speed of Bright Data proxies?"**
3. Bot should reply within seconds! 🎉

## 📋 What You Need

- ✅ Python 3.x installed
- ✅ Node.js and npm installed
- ✅ Reddit account
- ✅ Devvit CLI installed (`npm install -g @devvit/cli`)

## 🔧 Troubleshooting

**MCP server not starting?**
- Check port 8000 is free
- Verify venv is activated
- Check `proxy_faq.jsonl` exists

**Bot not replying?**
- Check both terminals for errors
- Verify MCP server is running
- Test MCP server: `curl http://localhost:8000/health`

**Need help?** See `SETUP_INSTRUCTIONS.md` for detailed steps.

