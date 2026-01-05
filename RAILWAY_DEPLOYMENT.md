# Railway Deployment Guide

## Step-by-Step Instructions

### Prerequisites
- ✅ Railway account created
- ✅ GitHub repository ready: https://github.com/Amitk-mokshious/MCP-bot.git

---

## Step 1: Push Code to GitHub

### 1.1 Navigate to project
```powershell
cd C:\Users\AmitKumar\Documents\Test-mcp\mcp-bot
```

### 1.2 Initialize Git (if not already done)
```powershell
git init
git branch -M main
```

### 1.3 Add all files
```powershell
git add .
```

### 1.4 Commit
```powershell
git commit -m "Add MCP server for Railway deployment"
```

### 1.5 Add remote and push
```powershell
git remote add origin https://github.com/Amitk-mokshious/MCP-bot.git
git push -u origin main
```

**Note:** If you already pushed README.md, use:
```powershell
git remote set-url origin https://github.com/Amitk-mokshious/MCP-bot.git
git push -u origin main
```

---

## Step 2: Deploy on Railway

### 2.1 Login to Railway
1. Go to https://railway.app
2. Click **"Login"** (use GitHub to sign in)

### 2.2 Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub (if first time)
4. Select repository: **`Amitk-mokshious/MCP-bot`**

### 2.3 Configure Service
1. Railway will detect the repository
2. Click **"Add Service"** → **"GitHub Repo"**
3. Select **`MCP-bot`** repository
4. Railway will auto-detect it's a Python project

### 2.4 Set Root Directory
**IMPORTANT:** Railway needs to know where the Python server is.

1. Click on the service (your app)
2. Go to **"Settings"** tab
3. Find **"Root Directory"**
4. Set it to: **`mcp-server`**
5. Click **"Save"**

### 2.5 Configure Start Command (Optional)
Railway should auto-detect from `Procfile`, but verify:

1. Go to **"Settings"** → **"Deploy"**
2. **Start Command** should be: `python server.py`
3. If not, set it manually

### 2.6 Deploy
1. Railway will automatically start deploying
2. Watch the **"Deployments"** tab for progress
3. Wait for **"Deploy Successful"** ✅

---

## Step 3: Get Your Railway URL

### 3.1 Find Public URL
1. Go to **"Settings"** tab
2. Scroll to **"Domains"** section
3. Click **"Generate Domain"** (if not auto-generated)
4. Copy the URL (e.g., `https://mcp-server-production-xxxx.up.railway.app`)

### 3.2 Test Your Deployment
Open in browser:
- `https://YOUR-URL.railway.app/health`

Should return:
```json
{"status":"ok","faq_count":10,...}
```

---

## Step 4: Update Devvit Code

### 4.1 Update `test-mcp1/src/actions.ts`
Replace line 25:
```typescript
const MCP_SERVER_URL = 'https://YOUR-RAILWAY-URL.railway.app';
```

### 4.2 Update `test-mcp1/devvit.json`
Replace line 7:
```json
"domains": ["YOUR-RAILWAY-URL.railway.app"]
```

### 4.3 Update `test-mcp1/src/main.tsx`
Replace line 9:
```typescript
domains: ['YOUR-RAILWAY-URL.railway.app'],
```

### 4.4 Upload to Devvit
```powershell
cd test-mcp1
npx devvit upload
```

---

## Step 5: Request Domain Approval

1. Go to: https://developers.reddit.com/apps/test-mcp1/developer-settings
2. Scroll to **"Domain exceptions"**
3. Add your Railway domain
4. Submit for approval
5. Wait for approval (hours to days)

---

## Troubleshooting

### Railway deployment fails
- Check **"Deployments"** tab for error logs
- Verify `Root Directory` is set to `mcp-server`
- Check `requirements.txt` exists
- Verify `Procfile` exists

### Server returns 404
- Check Root Directory is `mcp-server`
- Verify `data/proxy_faq.jsonl` exists in repository
- Check Railway logs in **"Deployments"** tab

### Domain not working
- Wait a few minutes after deployment
- Check Railway **"Settings"** → **"Domains"**
- Test `/health` endpoint first

---

## Summary

✅ **Step 1:** Push code to GitHub  
✅ **Step 2:** Deploy on Railway (set Root Directory to `mcp-server`)  
✅ **Step 3:** Get Railway URL  
✅ **Step 4:** Update Devvit code with Railway URL  
✅ **Step 5:** Request domain approval  

Once approved, your Reddit bot will work! 🎉

