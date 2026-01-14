# MCP Bot - Reddit Bot with MCP Server Integration

A Reddit bot built with Devvit that monitors posts, extracts intent, and fetches answers from a Railway-hosted MCP (Model Context Protocol) server via HTTP.

## Fetch Domains

This app requires HTTP access to the following domain:

### `mcp-bot-production.up.railway.app`

**Justification:**
This domain hosts a production MCP (Model Context Protocol) server deployed on Railway, a reputable cloud hosting platform (railway.app). The MCP server acts as a knowledge engine that provides FAQ answers about proxy service providers (Bright Data, Oxylabs, Smartproxy, ScrapeOps) based on vendor and topic queries.

**Purpose:**
- The bot extracts intent (vendor + topic) from Reddit posts
- Makes HTTP POST requests to `/search-proxy-faq` endpoint
- Retrieves structured FAQ data from a JSONL database
- Formats and posts helpful replies to Reddit users

**Data Flow:**
1. Reddit post is created → Trigger fires
2. Bot extracts vendor and topic from post text
3. HTTP request to Railway domain → MCP server
4. MCP server searches JSONL database and returns FAQ record
5. Bot formats reply and posts to Reddit

**Security:**
- The server is hosted on Railway (reputable cloud platform, railway.app)
- All requests are POST requests with JSON payloads
- The MCP server only returns read-only FAQ data
- No user data is transmitted to the external domain
- Server uses HTTPS encryption for all communications
- Railway provides stable, production-grade hosting with 99.9% uptime SLA

**Why Railway:**
- Production-grade hosting platform with reliable uptime
- Stable, permanent domain (not temporary)
- HTTPS enabled by default
- Suitable for production Reddit bot operations
- Railway is a trusted platform used by thousands of developers

## Next up

Next up is uploading and developing your app using playtest.

In the project directory, you can run:

### `npm run deploy`

Upload the app to the App Directory. Uploaded apps are only visible to you (the app owner) and can only be installed to a small test subreddit with less than 200 subscribers.

### `npm run dev`

Installs your app to your test subreddit and starts a playtest session where a new version is installed whenever you save changes to your app code, and logs are continuously streamed.

## Learn more

You can learn more in the [documentation](https://developers.reddit.com/docs/).

You can manage your apps in the [developer portal](https://developers.reddit.com/my/apps).
