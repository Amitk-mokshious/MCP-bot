#!/usr/bin/env python3
"""
FastAPI MCP Server for Proxy FAQ
Validator-friendly endpoints for Reddit Devvit domain approval
"""

import json
import os
from pathlib import Path
from typing import Optional
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

# Get data directory path
SCRIPT_DIR = Path(__file__).parent.resolve()
DATA_DIR = SCRIPT_DIR / "data"
FAQ_FILE = DATA_DIR / "proxy_faq.jsonl"

# Create FastAPI app
app = FastAPI(title="Proxy FAQ MCP Server")

# Enable permissive CORS for Devvit
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory cache for FAQ records (loaded at startup)
FAQ_CACHE: list[dict] = []
FAQ_LOADED = False


class SearchRequest(BaseModel):
    vendor: str
    topic: str


class FAQRecord(BaseModel):
    vendor: str
    topic: str
    answer: str
    bullets: list[str]
    source: str


class SearchResponse(BaseModel):
    record: Optional[FAQRecord] = None
    error: Optional[str] = None


def load_faq_cache():
    """Load FAQ records into memory cache at startup."""
    global FAQ_CACHE, FAQ_LOADED
    
    if FAQ_LOADED:
        return
    
    FAQ_CACHE = []
    if not FAQ_FILE.exists():
        print(f"FAQ file not found: {FAQ_FILE}")
        FAQ_LOADED = True
        return
    
    try:
        with open(FAQ_FILE, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    record = json.loads(line)
                    if isinstance(record, dict):
                        FAQ_CACHE.append(record)
                except json.JSONDecodeError:
                    continue
        print(f"Loaded {len(FAQ_CACHE)} FAQ records into cache")
    except Exception as e:
        print(f"Error loading FAQ file: {e}")
    
    FAQ_LOADED = True


# Load cache at startup
@app.on_event("startup")
async def startup_event():
    load_faq_cache()


# Validator-friendly root endpoint (GET /)
@app.get("/")
async def root():
    """Fast root endpoint for validators."""
    return {
        "status": "ok",
        "service": "mcp-faq-proxy",
        "description": "Devvit bot FAQ lookup service"
    }


# Validator-friendly HEAD / (returns 200)
@app.head("/")
async def root_head():
    """HEAD request handler for root."""
    return Response(status_code=200)


# Validator-friendly OPTIONS / (returns 204)
@app.options("/")
async def root_options():
    """OPTIONS request handler for root."""
    return Response(status_code=204)


# Robots.txt (allow all)
@app.get("/robots.txt")
async def robots_txt():
    """Robots.txt - allow all crawlers."""
    return Response(
        content="User-agent: *\nDisallow:\n",
        media_type="text/plain"
    )


# Security.txt
@app.get("/.well-known/security.txt")
async def security_txt():
    """Security contact information."""
    return Response(
        content="Contact: placeholder@example.com\n",
        media_type="text/plain"
    )


# Devvit MCP metadata
@app.get("/.well-known/devvit-mcp.json")
async def devvit_mcp_info():
    """Devvit MCP service metadata."""
    return {
        "service": "mcp-faq-proxy",
        "description": "Devvit bot FAQ lookup service",
        "endpoints": {
            "root": "/",
            "health": "/health",
            "search": "/search-proxy-faq"
        },
        "contact": "placeholder@example.com"
    }


# Health check (must respond fast even if FAQ file is missing)
@app.get("/health")
async def health():
    """Fast health check endpoint."""
    return {
        "status": "ok",
        "faq_count": len(FAQ_CACHE),
        "faq_loaded": FAQ_LOADED,
        "faq_file": str(FAQ_FILE) if FAQ_FILE.exists() else "not found"
    }


# Main search endpoint (unchanged contract)
@app.post("/search-proxy-faq", response_model=SearchResponse)
async def search_proxy_faq(request: SearchRequest):
    """
    Search FAQ database for matching vendor and topic.
    
    Args:
        request: SearchRequest with vendor and topic
    
    Returns:
        SearchResponse with matching record or error
    """
    if not request.vendor or not request.topic:
        return SearchResponse(
            error="Both vendor and topic are required"
        )
    
    # Use cached records (no file I/O)
    vendor_lower = request.vendor.lower()
    topic_lower = request.topic.lower()
    
    for record in FAQ_CACHE:
        record_vendor = str(record.get("vendor", "")).lower()
        record_topic = str(record.get("topic", "")).lower()
        
        if record_vendor == vendor_lower and record_topic == topic_lower:
            try:
                faq_record = FAQRecord(**record)
                return SearchResponse(record=faq_record)
            except Exception as e:
                return SearchResponse(
                    error=f"Error parsing record: {str(e)}"
                )
    
    return SearchResponse(record=None)


if __name__ == "__main__":
    import uvicorn
    
    # Railway provides PORT environment variable
    port = int(os.getenv("PORT", 8000))
    host = "0.0.0.0"
    
    print(f"Starting MCP server on http://{host}:{port}")
    print(f"FAQ file: {FAQ_FILE}")
    print(f"FAQ file exists: {FAQ_FILE.exists()}")
    
    # Load cache before starting server
    load_faq_cache()
    
    uvicorn.run(app, host=host, port=port)
