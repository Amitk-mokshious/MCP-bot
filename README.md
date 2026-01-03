# Reddit MCP Bot

A Reddit bot using Devvit that monitors posts, extracts intent, and replies using a local Python MCP server.

## Architecture

- **Devvit App** (TypeScript): Runs on Reddit, monitors posts, extracts intent, calls MCP server
- **Python MCP Server** (FastAPI): Runs locally on localhost:8000, serves FAQ data from JSONL
- **Data**: JSONL file with proxy FAQ records

## Setup

### 1. Install Devvit CLI

```powershell
npm install -g @devvit/cli
```

### 2. Initialize Devvit (if not done)

```powershell
npx devvit init
```

Follow the prompts to authenticate with Reddit.

### 3. Install Dependencies

```powershell
cd mcp-bot
npm install
```

### 4. Set Up Python MCP Server

```powershell
cd mcp-server
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 5. Start MCP Server

```powershell
python server.py
```

Keep this terminal open. The server will run on http://localhost:8000

### 6. Start Devvit App

In a new terminal:

```powershell
cd mcp-bot
npm run dev
```

This will:
- Create a test subreddit (e.g., `mcp-bot_dev`)
- Show you the test subreddit URL
- Deploy the bot to the test subreddit

## Testing

1. Go to the test subreddit URL shown in terminal
2. Create a test post: "What is the speed of Bright Data proxies?"
3. The bot should:
   - Detect the post
   - Extract intent (brightdata + speed)
   - Call MCP server
   - Reply with formatted answer

## Project Structure

```
mcp-bot/
├── src/
│   ├── main.tsx      # Devvit app with PostCreate trigger
│   └── actions.ts    # Intent extraction + HTTP calls
├── mcp-server/
│   ├── server.py     # FastAPI server
│   ├── data/
│   │   └── proxy_faq.jsonl
│   └── requirements.txt
├── package.json
└── tsconfig.json
```

## MCP Server Endpoints

- `GET /` - Health check
- `GET /health` - Health check with FAQ count
- `POST /search-proxy-faq` - Search FAQ by vendor and topic

## Intent Extraction

The bot extracts:
- **Vendors**: brightdata, oxylabs, smartproxy, scrapeops
- **Topics**: speed, pricing, rotation, geo, reliability

## Troubleshooting

- **MCP server not responding**: Make sure it's running on localhost:8000
- **Bot not replying**: Check Devvit logs in terminal
- **Authentication error**: Run `npx devvit init` to re-authenticate

