# Testing Guide

## ✅ Local Server Testing (Working Now)

### Test Health Endpoint (GET)
```powershell
# Browser or PowerShell
Invoke-RestMethod -Uri "http://localhost:8000/health" -Method GET
```
**Result:** `{"status":"ok","faq_count":10,...}` ✅

### Test Search Endpoint (POST - Required)
```powershell
# PowerShell (correct way)
$body = @{ vendor = "brightdata"; topic = "speed" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8000/search-proxy-faq" -Method POST -Body $body -ContentType "application/json"
```
**Result:** Returns FAQ record ✅

### ❌ Browser Testing (Won't Work)
- **URL:** `http://localhost:8000/search-proxy-faq`
- **Method:** Browser uses GET
- **Result:** `{"detail":"Method Not Allowed"}` ❌
- **Why:** Endpoint requires POST method

---

## 🔴 Reddit Testing (Won't Work Until Domain Approved)

### Current Status
- **Domain:** `nondiametrally-nonwatertight-lesley.ngrok-free.dev`
- **Status:** ❌ **REJECTED**
- **Result:** Reddit blocks all HTTP requests to this domain

### What Happens When You Test on Reddit

1. **Go to:** https://www.reddit.com/r/MCPBot/?playtest=test-mcp1
2. **Create post:** "What is the speed of Bright Data proxies?"
3. **Bot extracts intent:** ✅ Works (vendor=brightdata, topic=speed)
4. **Bot calls MCP server:** ❌ **BLOCKED** by Reddit
5. **Bot replies:** "I couldn't find specific information..."

### Terminal Logs You'll See
```
Processing post: What is the speed of Bright Data proxies?
Extracted intent: vendor=brightdata, topic=speed
Error calling MCP server: Error: 7 PERMISSION_DENIED: HTTP request to domain: ... is not allowed
No FAQ record found
```

---

## ✅ What You CAN Test Now

### 1. Local Server (Fully Working)
- ✅ Health endpoint
- ✅ Search endpoint (with POST)
- ✅ All FAQ queries
- ✅ Error handling

### 2. Reddit Bot Logic (Partially Working)
- ✅ Post detection
- ✅ Intent extraction
- ✅ Reply formatting
- ❌ MCP server calls (blocked by domain rejection)

---

## 🚀 To Make Reddit Testing Work

### Option 1: Deploy to Railway (Recommended)
1. Deploy `mcp-server` to Railway
2. Get permanent URL: `https://your-app.railway.app`
3. Update code with Railway URL
4. Request domain approval
5. Wait for approval
6. Test on Reddit ✅

### Option 2: Use Your Domain
1. Set up `api.mokshious.com`
2. Point to server
3. Request approval
4. Wait for approval
5. Test on Reddit ✅

---

## Summary

| Test Type | Status | Notes |
|-----------|--------|-------|
| Local Server (GET /health) | ✅ Working | Use PowerShell or browser |
| Local Server (POST /search) | ✅ Working | Must use POST method |
| Browser (GET /search) | ❌ Expected | Endpoint requires POST |
| Reddit Bot (Intent) | ✅ Working | Extracts vendor/topic |
| Reddit Bot (MCP Call) | ❌ Blocked | Domain rejected by Reddit |
| Reddit Bot (Reply) | ⚠️ Partial | Replies but with error message |

---

## Next Steps

1. **Deploy to Railway** (get permanent URL)
2. **Update code** with Railway URL
3. **Request approval** in Reddit Developer Portal
4. **Wait for approval** (hours to days)
5. **Test on Reddit** - then it will work! ✅

