# MCP Server - Proxy FAQ API

FastAPI server that serves proxy FAQ data from a JSONL database.

## Local Development

```bash
# Create virtual environment
python -m venv .venv

# Activate (Windows)
.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run server
python server.py
```

Server runs on `http://localhost:8000`

## Endpoints

- `GET /` - Health check
- `GET /health` - Detailed health check with FAQ count
- `POST /search-proxy-faq` - Search FAQ by vendor and topic

## Railway Deployment

This app is configured for Railway deployment. Railway will:
- Automatically detect Python
- Install dependencies from `requirements.txt`
- Run the `Procfile` command
- Provide `PORT` environment variable

## Data

FAQ data is stored in `data/proxy_faq.jsonl` (JSON Lines format).

