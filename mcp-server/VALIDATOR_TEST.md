# Validator Test Checklist

After deploying to Railway, test these endpoints to verify validator-friendly responses:

## Test Commands

Replace `<domain>` with your Railway domain: `mcp-bot-production.up.railway.app`

### 1. GET / (should return 200 JSON fast)
```bash
curl -i https://<domain>/
```

**Expected:**
- Status: 200 OK
- Content-Type: application/json
- Response: `{"status":"ok","service":"mcp-faq-proxy","description":"Devvit bot FAQ lookup service"}`

### 2. HEAD / (should return 200 fast)
```bash
curl -I https://<domain>/
```

**Expected:**
- Status: 200 OK
- No body (HEAD request)

### 3. OPTIONS / (should return 204 fast)
```bash
curl -i -X OPTIONS https://<domain>/
```

**Expected:**
- Status: 204 No Content
- CORS headers present

### 4. GET /.well-known/devvit-mcp.json
```bash
curl -i https://<domain>/.well-known/devvit-mcp.json
```

**Expected:**
- Status: 200 OK
- Content-Type: application/json
- Response: JSON with service metadata

### 5. GET /health (should return 200 fast even if FAQ file missing)
```bash
curl -i https://<domain>/health
```

**Expected:**
- Status: 200 OK
- Response: `{"status":"ok","faq_count":<number>,"faq_loaded":true,"faq_file":"..."}`

### 6. GET /robots.txt
```bash
curl -i https://<domain>/robots.txt
```

**Expected:**
- Status: 200 OK
- Content-Type: text/plain
- Response: `User-agent: *\nDisallow:\n`

### 7. GET /.well-known/security.txt
```bash
curl -i https://<domain>/.well-known/security.txt
```

**Expected:**
- Status: 200 OK
- Content-Type: text/plain
- Response: `Contact: placeholder@example.com\n`

### 8. POST /search-proxy-faq (main endpoint - unchanged)
```bash
curl -i -X POST https://<domain>/search-proxy-faq \
  -H "Content-Type: application/json" \
  -d '{"vendor":"brightdata","topic":"speed"}'
```

**Expected:**
- Status: 200 OK
- Response: JSON with FAQ record or null

## All Tests Should Pass

All endpoints should respond in < 500ms (ideally < 200ms) to pass Reddit's validator.

## Deployment Checklist

- [ ] Railway service is deployed
- [ ] Root directory is set to `mcp-server` in Railway settings
- [ ] Environment variable `PORT` is set automatically by Railway
- [ ] All curl tests pass
- [ ] Response times are fast (< 500ms)
- [ ] No redirects or authentication required
- [ ] CORS headers are present
