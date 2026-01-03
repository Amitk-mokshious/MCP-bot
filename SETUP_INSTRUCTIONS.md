# Setup Instructions - Reddit MCP Bot

## Step-by-Step Setup

### Step 1: Install Devvit CLI (if not already installed)

```powershell
npm install -g @devvit/cli
```

### Step 2: Initialize Devvit Authentication

```powershell
npx devvit init
```

Follow the prompts:
1. Visit the URL shown in terminal
2. Authorize the app
3. Copy the code and paste it back

### Step 3: Install Project Dependencies

```powershell
cd C:\Users\AmitKumar\Documents\Test-mcp\mcp-bot
npm install
```

### Step 4: Set Up Python MCP Server

```powershell
cd mcp-server
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Step 5: Start the Python MCP Server

**Keep this terminal open!**

```powershell
python server.py
```

You should see:
```
Starting MCP server on http://localhost:8000
FAQ file: C:\Users\AmitKumar\Documents\Test-mcp\mcp-bot\mcp-server\data\proxy_faq.jsonl
FAQ file exists: True
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 6: Start Devvit App (in a NEW terminal)

```powershell
cd C:\Users\AmitKumar\Documents\Test-mcp\mcp-bot
npm run dev
```

This will:
- Build the TypeScript code
- Create a test subreddit (e.g., `mcp-bot_dev`)
- Show you the test subreddit URL
- Deploy the bot

**Example output:**
```
✓ Built successfully
Test subreddit: https://www.reddit.com/r/mcp-bot_dev?playtest=mcp-bot
```

### Step 7: Test the Bot

1. Open the test subreddit URL in your browser
2. Create a new post with title: **"What is the speed of Bright Data proxies?"**
3. The bot should:
   - Detect the post within a few seconds
   - Extract intent (brightdata + speed)
   - Call the MCP server
   - Reply with formatted answer

## Troubleshooting

### MCP Server Not Starting

- Check if port 8000 is already in use
- Verify Python venv is activated
- Check that `proxy_faq.jsonl` exists in `mcp-server/data/`

### Bot Not Replying

- Check Devvit logs in the terminal running `npm run dev`
- Verify MCP server is running (test: `curl http://localhost:8000/health`)
- Check that intent extraction is working (vendor + topic detected)

### Authentication Issues

- Run `npx devvit init` again to re-authenticate
- Make sure you're logged into Reddit in your browser

### Test MCP Server Manually

```powershell
# Test health endpoint
curl http://localhost:8000/health

# Test search endpoint
curl -X POST http://localhost:8000/search-proxy-faq -H "Content-Type: application/json" -d "{\"vendor\":\"brightdata\",\"topic\":\"speed\"}"
```

## Project Structure

```
mcp-bot/
├── src/
│   ├── main.tsx          # Devvit trigger handler
│   └── actions.ts        # Intent extraction + HTTP calls
├── mcp-server/
│   ├── server.py         # FastAPI server
│   ├── data/
│   │   └── proxy_faq.jsonl
│   └── requirements.txt
├── package.json
└── tsconfig.json
```

## Next Steps

- Add more FAQ records to `mcp-server/data/proxy_faq.jsonl`
- Improve intent extraction keywords
- Add post deduplication tracking
- Deploy to production subreddit (requires mod permissions)

