# 🔧 Fix Railway Deployment Error

## Problem
Railway detected Node.js (because of `package.json` in root) but we need to deploy Python from `mcp-server/` folder.

## ✅ Solution: Set Root Directory in Railway

### Step 1: Go to Railway Settings
1. In Railway dashboard, click on your **service** (the failed deployment)
2. Click **"Settings"** tab (top menu)
3. Scroll down to **"Root Directory"** section

### Step 2: Set Root Directory
1. Click **"Edit"** or **"Change"** next to Root Directory
2. Enter: **`mcp-server`**
3. Click **"Save"**

### Step 3: Redeploy
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** or wait for auto-redeploy
3. Railway will now:
   - Look in `mcp-server/` folder
   - Detect Python (from `requirements.txt`)
   - Use `Procfile` to start server
   - ✅ Should work!

---

## Alternative: Manual Configuration

If Root Directory setting doesn't work, try this:

### In Railway Settings:
1. **"Deploy"** tab → **"Start Command"**
2. Set to: `cd mcp-server && python server.py`

3. **"Build"** tab → **"Build Command"**  
4. Set to: `cd mcp-server && pip install -r requirements.txt`

---

## What I Just Added

I've added configuration files to help Railway:
- ✅ `railway.json` - Tells Railway to build from mcp-server
- ✅ `mcp-server/nixpacks.toml` - Python build configuration
- ✅ `mcp-server/runtime.txt` - Python version

**But the easiest fix is still: Set Root Directory to `mcp-server` in Railway Settings!**

---

## After Fix

Once you set Root Directory and redeploy:
1. ✅ Railway will detect Python
2. ✅ Install from `requirements.txt`
3. ✅ Start with `Procfile`
4. ✅ Get your public URL!

Then test: `https://YOUR-URL.railway.app/health`

---

## Quick Steps Summary

1. **Railway Dashboard** → Your service
2. **Settings** → **Root Directory**
3. Set to: **`mcp-server`**
4. **Save**
5. **Redeploy** (or wait for auto-redeploy)
6. ✅ Done!

