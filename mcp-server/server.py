#!/usr/bin/env python3
"""
FastAPI MCP Server for Proxy FAQ
Runs on localhost:8000 and serves data from JSONL file
"""

import json
from pathlib import Path
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Get data directory path
SCRIPT_DIR = Path(__file__).parent.resolve()
DATA_DIR = SCRIPT_DIR / "data"
FAQ_FILE = DATA_DIR / "proxy_faq.jsonl"

# Create FastAPI app
app = FastAPI(title="Proxy FAQ MCP Server")

# Enable CORS for Devvit to call from localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


def read_faq_records() -> list[dict]:
    """Read all FAQ records from JSONL file."""
    records = []
    if not FAQ_FILE.exists():
        return records
    
    try:
        with open(FAQ_FILE, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    record = json.loads(line)
                    if isinstance(record, dict):
                        records.append(record)
                except json.JSONDecodeError:
                    continue
    except Exception as e:
        print(f"Error reading FAQ file: {e}")
    
    return records


@app.get("/")
async def root():
    """Health check endpoint."""
    return {"status": "ok", "service": "Proxy FAQ MCP Server"}


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
    
    records = read_faq_records()
    vendor_lower = request.vendor.lower()
    topic_lower = request.topic.lower()
    
    for record in records:
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


@app.get("/health")
async def health():
    """Health check with FAQ count."""
    records = read_faq_records()
    return {
        "status": "ok",
        "faq_count": len(records),
        "faq_file": str(FAQ_FILE)
    }


if __name__ == "__main__":
    import uvicorn
    import os
    
    # Railway provides PORT environment variable, default to 8000 for local
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "0.0.0.0")
    
    print(f"Starting MCP server on http://{host}:{port}")
    print(f"FAQ file: {FAQ_FILE}")
    print(f"FAQ file exists: {FAQ_FILE.exists()}")
    uvicorn.run(app, host=host, port=port)

