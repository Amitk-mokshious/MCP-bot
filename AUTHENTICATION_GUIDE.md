# Devvit Authentication Guide

## The Problem

When you run `npx devvit init`, it shows a URL. If you open that URL and see the "Web templates" page, you're on the wrong page. You need to complete the OAuth authentication flow.

## Correct Authentication Steps

### Step 1: Run Devvit Init

```powershell
cd C:\Users\AmitKumar\Documents\Test-mcp\mcp-bot
npx devvit init
```

### Step 2: Complete OAuth Flow

When you see:
```
Please open Reddit to continue:
https://developers.reddit.com/new?source=win32&redirect_url=...
```

**DO THIS:**
1. **Press Enter** in the terminal (this should open the URL automatically)
2. OR **Copy the full URL** from the terminal
3. **Paste it in your browser**
4. You should see a **Reddit login/authorization page** (NOT the template page)
5. **Log in to Reddit** if prompted
6. **Authorize the app**
7. You'll be redirected to `localhost` with a code
8. **Copy the code** from the URL or the page
9. **Paste it back in the terminal** when prompted

### Step 3: If You See the Template Page Instead

If you see the "Web templates" page, it means:
- The URL expired or was incorrect
- You need to get a fresh authentication URL

**Solution:**
1. Close the browser tab
2. Run `npx devvit init` again
3. Get a fresh URL
4. Complete the flow immediately (URLs expire quickly)

### Step 4: Verify Authentication

After successful authentication, you should see:
```
✓ Successfully authenticated!
```

### Step 5: Start Development

Once authenticated:
```powershell
npm run dev
```

This will:
- Build your app
- Create a test subreddit
- Deploy the bot
- Show you the test subreddit URL

## Troubleshooting

**"devvit is not recognized"**
- ✅ Fixed: Devvit CLI is now installed globally
- You can also use `npx devvit` instead of just `devvit`

**URL shows template page**
- The authentication URL expired (they expire quickly)
- Run `npx devvit init` again to get a fresh URL
- Complete the flow immediately

**Authentication fails**
- Make sure you're logged into Reddit in your browser
- Try in an incognito/private window
- Clear browser cache and try again

## Quick Test

After authentication, test if it works:
```powershell
npx devvit whoami
```

This should show your Reddit username if authentication worked.

