# Fix: Expose MCP Server to Internet

## Problem
Devvit runs on Reddit's servers, which **cannot access `localhost:8000`** on your machine. The error shows:
```
HTTP request to domain: localhost is not allowed
```

## Solution: Use ngrok to Expose Localhost

### Step 1: Install ngrok

Download from: https://ngrok.com/download

Or use chocolatey:
```powershell
choco install ngrok
```

Or use winget:
```powershell
winget install ngrok
```

### Step 2: Start ngrok Tunnel

**In a NEW terminal** (keep Python server running in another terminal):

```powershell
ngrok http 8000
```

You'll see output like:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:8000
```

**Copy the HTTPS URL** (e.g., `https://abc123.ngrok-free.app`)

### Step 3: Update MCP Server URL

Update `src/actions.ts` to use the ngrok URL instead of localhost.

### Step 4: Restart Devvit Playtest

The bot will now be able to reach your MCP server through the ngrok tunnel!

## Alternative: Use Environment Variable

We can also make the URL configurable via environment variable for easier switching.

