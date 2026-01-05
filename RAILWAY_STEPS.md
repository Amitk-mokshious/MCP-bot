# 🚂 Railway Deployment - Step by Step

## ✅ Step 1: Code Pushed to GitHub (DONE!)

Your code is now at: https://github.com/Amitk-mokshious/MCP-bot

---

## 📋 Step 2: Deploy on Railway

### 2.1 Login to Railway
1. Go to **https://railway.app**
2. Click **"Login"** or **"Start a New Project"**
3. Sign in with **GitHub** (use the same account: `Amitk-mokshious`)

### 2.2 Create New Project
1. Click **"New Project"** (top right)
2. Select **"Deploy from GitHub repo"**
3. If first time, authorize Railway to access GitHub
4. Find and select: **`Amitk-mokshious/MCP-bot`**
5. Click **"Deploy Now"**

### 2.3 ⚠️ IMPORTANT: Set Root Directory
Railway needs to know where your Python server is!

1. Click on your **service** (the deployed app)
2. Go to **"Settings"** tab
3. Scroll to **"Root Directory"**
4. Click **"Edit"**
5. Enter: **`mcp-server`**
6. Click **"Save"**

**Why?** Your Python server is in the `mcp-server` folder, not the root.

### 2.4 Verify Deployment
1. Go to **"Deployments"** tab
2. Wait for status to show **"Deploy Successful"** ✅
3. Check logs for any errors

---

## 🌐 Step 3: Get Your Railway URL

### 3.1 Generate Public Domain
1. Go to **"Settings"** tab
2. Scroll to **"Domains"** section
3. Click **"Generate Domain"** (if not auto-generated)
4. Copy the URL (e.g., `https://mcp-server-production-xxxx.up.railway.app`)

### 3.2 Test Your Deployment
Open in browser:
```
https://YOUR-RAILWAY-URL.railway.app/health
```

**Expected response:**
```json
{
  "status": "ok",
  "faq_count": 10,
  "faq_file": "..."
}
```

✅ If you see this, your server is working!

---

## 🔧 Step 4: Update Devvit Code

After you get your Railway URL, I'll help you update these files:

1. **`test-mcp1/src/actions.ts`** - Update MCP_SERVER_URL
2. **`test-mcp1/devvit.json`** - Update domains array
3. **`test-mcp1/src/main.tsx`** - Update domains in Devvit.configure()

**Tell me your Railway URL when you get it, and I'll update the files!**

---

## 📝 Step 5: Request Domain Approval

1. Go to: https://developers.reddit.com/apps/test-mcp1/developer-settings
2. Scroll to **"Domain exceptions"**
3. Click **"Add Domain"** or edit existing
4. Enter your Railway URL (without `https://`)
5. Submit for approval
6. Wait for approval (hours to days)

---

## 🎯 Quick Checklist

- [ ] Login to Railway
- [ ] Create new project from GitHub repo
- [ ] **Set Root Directory to `mcp-server`** ⚠️ CRITICAL
- [ ] Wait for deployment to succeed
- [ ] Generate/get Railway domain
- [ ] Test `/health` endpoint
- [ ] Get Railway URL
- [ ] Update Devvit code (I'll help with this)
- [ ] Request domain approval in Reddit
- [ ] Wait for approval
- [ ] Test on Reddit! 🎉

---

## 🆘 Troubleshooting

### Deployment fails
- Check **"Deployments"** → **"View Logs"**
- Verify Root Directory is set to `mcp-server`
- Check that `requirements.txt` exists in `mcp-server/`
- Verify `Procfile` exists in `mcp-server/`

### Server returns 404
- Check Root Directory is `mcp-server` (not root)
- Verify `data/proxy_faq.jsonl` is in the repository
- Check Railway logs for errors

### Health endpoint doesn't work
- Wait 1-2 minutes after deployment
- Check Railway **"Settings"** → **"Domains"**
- Try the full URL: `https://YOUR-URL.railway.app/health`

---

## 📞 Next Steps

1. **Do Step 2-3 now** (Deploy on Railway and get URL)
2. **Tell me your Railway URL**
3. **I'll update the Devvit code for you**
4. **Then do Step 5** (Request approval)

Ready? Start with Step 2.1! 🚀

