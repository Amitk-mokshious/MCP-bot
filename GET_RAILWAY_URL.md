# 🌐 How to Get Your Railway URL

## Step 1: Find Your Railway URL

### Option A: From Settings → Domains
1. In Railway dashboard, click on your **service** (MCP-bot)
2. Go to **"Settings"** tab
3. Scroll to **"Domains"** section
4. You should see a domain like:
   - `https://mcp-bot-production-xxxx.up.railway.app`
   - Or click **"Generate Domain"** if none exists
5. **Copy the full URL** (including `https://`)

### Option B: From Service Overview
1. Click on your **service**
2. Look at the top right or in the **"Networking"** section
3. You should see a **"Public URL"** or domain
4. **Copy it**

### Option C: Check Deployments
1. Go to **"Deployments"** tab
2. Click on the latest successful deployment
3. Look for **"Public URL"** or domain in the details

---

## Step 2: Test Your Railway URL

Once you have the URL, test it:

**Health Check:**
```
https://YOUR-RAILWAY-URL.railway.app/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "faq_count": 10,
  "faq_file": "..."
}
```

✅ If you see this, your server is working!

---

## Step 3: Share the URL

**Copy your Railway URL and share it with me!**

It should look like:
- `https://mcp-bot-production-xxxx.up.railway.app`
- Or `https://mcp-bot-xxxx.up.railway.app`

Then I'll:
1. Update Devvit code with your Railway URL
2. Help you cancel the ngrok domain request
3. Help you request approval for Railway domain

