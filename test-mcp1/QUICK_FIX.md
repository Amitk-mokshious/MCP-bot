# Quick Fix: Make MCP Server Accessible to Reddit

## The Problem
Reddit's servers **cannot access `localhost:8000`** on your computer. You need to expose your local server to the internet.

## Quick Solution (3 Steps)

### Step 1: Install ngrok

Download from: https://ngrok.com/download

Or install via PowerShell:
```powershell
# Using winget (Windows 10/11)
winget install ngrok

# Or download manually from https://ngrok.com/download
```

### Step 2: Start ngrok Tunnel

**Open a NEW terminal** and run:
```powershell
ngrok http 8000
```

You'll see:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:8000
```

**Copy the HTTPS URL** (the one starting with `https://`)

### Step 3: Update the Code

1. Open `mcp-bot/test-mcp1/src/actions.ts`
2. Find line 23: `const MCP_SERVER_URL = 'http://localhost:8000';`
3. Replace `'http://localhost:8000'` with your ngrok URL:
   ```typescript
   const MCP_SERVER_URL = 'https://abc123.ngrok-free.app'; // Your ngrok URL
   ```
4. Save the file

### Step 4: Restart Devvit

The playtest should auto-reload, or restart it:
```powershell
cd C:\Users\AmitKumar\Documents\Test-mcp\mcp-bot\test-mcp1
npx devvit playtest MCPBot
```

### Step 5: Test Again!

Create a post: "What is the speed of Bright Data proxies?"

The bot should now be able to reach your MCP server! 🎉

## Important Notes

- **Keep ngrok running** - Close the ngrok terminal and the tunnel stops
- **Keep Python server running** - The MCP server must stay running
- **ngrok URL changes** - Free ngrok URLs change each time you restart. Update the code if you restart ngrok.

## Troubleshooting

**ngrok not found?**
- Make sure ngrok is in your PATH, or use full path: `C:\path\to\ngrok.exe http 8000`

**Still getting errors?**
- Make sure both Python server AND ngrok are running
- Check the ngrok URL matches what's in `actions.ts`
- Verify ngrok shows "Forwarding" status

