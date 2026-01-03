# Understanding the Setup

## What is the ngrok URL?

The ngrok URL (`https://nondiametrally-nonwatertight-lesley.ngrok-free.dev`) is **your MCP server URL** that Reddit can access.

### How it works:

1. **Your Python MCP Server** runs on `localhost:8000` (only accessible on your computer)
2. **ngrok** creates a tunnel: `https://nondiametrally-nonwatertight-lesley.ngrok-free.dev` → `localhost:8000`
3. **Reddit's servers** can now access your MCP server through the ngrok URL
4. **Your Devvit bot** (running on Reddit) calls the ngrok URL to get FAQ data

## Why you see ERR_NGROK_3200

This error means **ngrok is not running** or **not forwarding to port 8000**.

### To fix:

1. **Make sure Python MCP server is running** on port 8000
2. **Start ngrok** with: `ngrok http 8000` (NOT port 80!)
3. **Keep both running** while testing

## Important Notes

- ✅ **ngrok URL** = MCP Server URL (what Reddit uses)
- ✅ **localhost:8000** = Your local MCP server (what ngrok forwards to)
- ❌ **Port 80** = Wrong! Your MCP server is on port 8000

## Quick Checklist

- [ ] Python MCP server running on port 8000
- [ ] ngrok running and forwarding to port 8000
- [ ] Code updated with ngrok URL
- [ ] Devvit playtest running

## Test the Setup

1. Check Python server: `curl http://localhost:8000/health`
2. Check ngrok: Open http://localhost:4040 in browser
3. Test ngrok URL: `curl https://nondiametrally-nonwatertight-lesley.ngrok-free.dev/health`

If all three work, your bot should work!

