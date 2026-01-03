# Domain Approval Guide

## Current Status

The domain `nondiametrally-nonwatertight-lesley.ngrok-free.dev` needs to be approved by Reddit admins before HTTP requests will work.

## What Has Been Done

✅ **1. Created `devvit.json`** with correct permissions format:
```json
{
  "permissions": {
    "http": {
      "enable": true,
      "domains": ["nondiametrally-nonwatertight-lesley.ngrok-free.dev"]
    }
  }
}
```

✅ **2. Updated `README.md`** with "Fetch Domains" section explaining:
- Why the domain is needed
- What it's used for
- Security considerations

✅ **3. Configured in code** (`main.tsx`):
```typescript
Devvit.configure({
  redditAPI: true,
  http: {
    domains: ['nondiametrally-nonwatertight-lesley.ngrok-free.dev'],
  },
});
```

## Next Steps: Submit for Review

### Step 1: Upload the App

Run this command to upload your app and trigger the domain approval request:

```powershell
cd C:\Users\AmitKumar\Documents\Test-mcp\mcp-bot\test-mcp1
npx devvit upload
```

This will:
- Upload your app to Reddit
- Submit the domain for admin review
- Make the app available in the App Directory (visible only to you)

### Step 2: Check Approval Status

After uploading, check the status in the Developer Portal:

1. Go to: https://developers.reddit.com/my/apps
2. Click on your app (`test-mcp1`)
3. Go to **Developer Settings**
4. Check the **HTTP Fetch** section for domain approval status

URL format: `https://developers.reddit.com/apps/test-mcp1/developer-settings`

### Step 3: Wait for Approval

- Reddit admins will review your domain request
- Approval can take some time (hours to days)
- You'll be notified when the domain is approved

### Step 4: Test After Approval

Once approved:
1. Restart your playtest: `npx devvit playtest MCPBot`
2. Create a test post: "What is the speed of Bright Data proxies?"
3. The bot should now successfully call the MCP server!

## Important Notes

### ngrok Domain Limitation

⚠️ **Important:** ngrok free domains change each time you restart ngrok. If you get a new ngrok URL:

1. Update `devvit.json` with the new domain
2. Update `src/main.tsx` in `Devvit.configure()`
3. Update `src/actions.ts` with the new URL
4. Re-upload the app: `npx devvit upload`

### Alternative: Use a Static Domain

For production, consider:
- Using a static domain (not ngrok)
- Deploying the MCP server to a cloud service (Heroku, Railway, etc.)
- Using a domain you control

## Current Configuration Files

- ✅ `devvit.json` - Domain permissions
- ✅ `README.md` - Fetch Domains section
- ✅ `src/main.tsx` - Devvit.configure() with domain
- ✅ `.devvitrc.json` - App configuration

## Troubleshooting

If domain is still blocked after approval:
1. Make sure you restarted the playtest after approval
2. Verify the domain in `devvit.json` matches exactly (no https://, no paths)
3. Check Developer Portal for approval status
4. Try `npx devvit upload` again to refresh the request

