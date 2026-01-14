# Railway Deployment Fix for Reddit Devvit Domain Approval

## Changes Made

### 1. Updated `server.py`
- ✅ Added in-memory FAQ cache (loaded at startup, no file I/O on requests)
- ✅ Fast GET / endpoint (returns 200 JSON immediately)
- ✅ HEAD / endpoint (returns 200)
- ✅ OPTIONS / endpoint (returns 204)
- ✅ GET /robots.txt (allows all crawlers)
- ✅ GET /.well-known/security.txt (contact info)
- ✅ GET /.well-known/devvit-mcp.json (service metadata)
- ✅ Fast /health endpoint (responds even if FAQ file missing)
- ✅ Permissive CORS (allows all origins)
- ✅ No redirects, no auth, small responses
- ✅ POST /search-proxy-faq contract unchanged

### 2. Updated `Procfile`
- ✅ Changed to: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- ✅ Uses Railway's $PORT environment variable
- ✅ Binds to 0.0.0.0 (required for Railway)

### 3. Updated `nixpacks.toml`
- ✅ Start command uses uvicorn with $PORT
- ✅ Python 3.11 specified

### 4. Updated `railway.json`
- ✅ Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- ✅ Healthcheck path: `/health`

## Deployment Steps

1. **Commit and push to GitHub:**
   ```bash
   cd mcp-bot
   git add mcp-server/server.py mcp-server/Procfile mcp-server/nixpacks.toml railway.json
   git commit -m "Fix: Validator-friendly endpoints for Reddit Devvit approval"
   git push
   ```

2. **Railway will auto-deploy** (if connected to GitHub)

3. **Or manually deploy:**
   - Go to Railway dashboard
   - Select your service
   - Click "Redeploy"

4. **Verify deployment:**
   - Check Railway logs for: "Starting MCP server on http://0.0.0.0:PORT"
   - Check Railway logs for: "Loaded X FAQ records into cache"

5. **Test endpoints** (see VALIDATOR_TEST.md)

## Key Improvements

1. **Cold Start Performance:**
   - FAQ data cached in memory at startup
   - No file I/O on health checks or root requests
   - Fast response times (< 200ms)

2. **Validator-Friendly:**
   - All required endpoints (GET, HEAD, OPTIONS)
   - Proper status codes (200, 204)
   - No redirects or authentication
   - Small, fast responses

3. **Railway Configuration:**
   - Proper port binding (0.0.0.0:$PORT)
   - Healthcheck endpoint configured
   - No hardcoded ports

## Next Steps

1. Deploy to Railway
2. Test all endpoints (see VALIDATOR_TEST.md)
3. Re-upload Devvit app: `npx devvit upload`
4. Domain should be approved (validator will pass)
