# How to Start ngrok

## Step 1: Open a NEW Terminal

Open a **new PowerShell terminal** (keep your other terminals running).

## Step 2: Start ngrok

Run this command:
```powershell
ngrok http 8000
```

## Step 3: Copy the HTTPS URL

You'll see output like:
```
Session Status                online
Account                       Your Name (Plan: Free)
Version                       3.x.x
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok-free.app -> http://localhost:8000
```

**Copy the HTTPS URL** (the one starting with `https://` and ending with `.ngrok-free.app`)

Example: `https://abc123.ngrok-free.app`

## Step 4: Update the Code

1. Open `mcp-bot/test-mcp1/src/actions.ts`
2. Find line 23: `const MCP_SERVER_URL = 'http://localhost:8000';`
3. Replace with your ngrok URL:
   ```typescript
   const MCP_SERVER_URL = 'https://abc123.ngrok-free.app'; // Replace with YOUR ngrok URL
   ```
4. Save the file

## Step 5: Keep ngrok Running

**IMPORTANT:** Keep the ngrok terminal open! If you close it, the tunnel stops.

## Step 6: Test the Bot

The Devvit playtest should auto-reload. Create a post: "What is the speed of Bright Data proxies?"

---

## Troubleshooting

**"ngrok not found"**
- Close and reopen your terminal (PATH needs refresh)
- Or use full path: `C:\Users\AmitKumar\AppData\Local\Microsoft\WinGet\Packages\Ngrok.Ngrok_Microsoft.Winget.Source_8wekyb3d8bbwe\ngrok.exe http 8000`

**"Address already in use"**
- Port 8000 is already in use - make sure your Python MCP server is running

**Still can't connect?**
- Make sure both Python server AND ngrok are running
- Check the ngrok URL matches what's in `actions.ts`
- Verify ngrok shows "Forwarding" status

