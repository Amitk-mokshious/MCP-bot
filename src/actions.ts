/**
 * Intent extraction and MCP server communication
 */

export interface Intent {
  vendor: string | null;
  topic: string | null;
  keywords: {
    vendor: string[];
    topic: string[];
  };
  confidence: number;
}

export interface FAQRecord {
  vendor: string;
  topic: string;
  answer: string;
  bullets: string[];
  source: string;
}

const MCP_SERVER_URL = 'http://localhost:8000';

/**
 * Extract intent from post text using keyword matching
 */
export function extractIntent(text: string): Intent {
  const textLower = text.toLowerCase();
  
  // Vendor keywords
  const vendorKeywords: Record<string, string[]> = {
    brightdata: ['brightdata', 'bright data', 'brightdata.com'],
    oxylabs: ['oxylabs', 'oxy labs', 'oxylabs.io'],
    smartproxy: ['smartproxy', 'smart proxy', 'smartproxy.com'],
    scrapeops: ['scrapeops', 'scrape ops', 'scrapeops.io']
  };
  
  // Topic keywords
  const topicKeywords: Record<string, string[]> = {
    speed: ['speed', 'fast', 'slow', 'latency', 'response time', 'quick'],
    pricing: ['price', 'cost', 'pricing', 'cheap', 'expensive', 'affordable', 'budget'],
    rotation: ['rotation', 'rotate', 'rotating', 'ip rotation', 'proxy rotation'],
    geo: ['geo', 'geographic', 'location', 'country', 'region', 'geolocation'],
    reliability: ['reliable', 'reliability', 'uptime', 'stable', 'stability', 'downtime']
  };
  
  // Detect vendor
  let detectedVendor: string | null = null;
  let vendorConfidence = 0.0;
  const vendorKeywordsFound: string[] = [];
  
  for (const [vendor, keywords] of Object.entries(vendorKeywords)) {
    const matches = keywords.filter(kw => textLower.includes(kw));
    if (matches.length > 0) {
      const confidence = matches.length / keywords.length;
      if (confidence > vendorConfidence) {
        detectedVendor = vendor;
        vendorConfidence = confidence;
        vendorKeywordsFound.push(...matches);
      }
    }
  }
  
  // Detect topic
  let detectedTopic: string | null = null;
  let topicConfidence = 0.0;
  const topicKeywordsFound: string[] = [];
  
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    const matches = keywords.filter(kw => textLower.includes(kw));
    if (matches.length > 0) {
      const confidence = matches.length / keywords.length;
      if (confidence > topicConfidence) {
        detectedTopic = topic;
        topicConfidence = confidence;
        topicKeywordsFound.push(...matches);
      }
    }
  }
  
  // Overall confidence
  const overallConfidence = (detectedVendor && detectedTopic)
    ? (vendorConfidence + topicConfidence) / 2
    : Math.max(vendorConfidence, topicConfidence);
  
  return {
    vendor: detectedVendor,
    topic: detectedTopic,
    keywords: {
      vendor: vendorKeywordsFound,
      topic: topicKeywordsFound
    },
    confidence: Math.round(overallConfidence * 100) / 100
  };
}

/**
 * Search FAQ via MCP server
 */
export async function searchProxyFAQ(
  vendor: string,
  topic: string
): Promise<FAQRecord | null> {
  try {
    const response = await fetch(`${MCP_SERVER_URL}/search-proxy-faq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vendor, topic })
    });
    
    if (!response.ok) {
      console.error(`MCP server error: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json() as { record?: FAQRecord; error?: string };
    
    if (data.error || !data.record) {
      return null;
    }
    
    return data.record;
    
  } catch (error) {
    console.error('Error calling MCP server:', error);
    return null;
  }
}

/**
 * Format reply from FAQ record
 */
export function formatReply(intent: Intent, record: FAQRecord): string {
  const vendor = record.vendor;
  const topic = record.topic;
  const answer = record.answer;
  const bullets = record.bullets || [];
  
  const replyParts: string[] = [];
  
  // Opening line
  replyParts.push(`Great question about ${vendor} and ${topic}!`);
  replyParts.push('');
  
  // Main answer
  if (answer) {
    replyParts.push(answer);
    replyParts.push('');
  }
  
  // Bullet points
  if (bullets.length > 0) {
    replyParts.push('Here are some key points:');
    for (const bullet of bullets) {
      replyParts.push(`• ${bullet}`);
    }
    replyParts.push('');
  }
  
  // Disclosure
  replyParts.push('---');
  replyParts.push('I\'m a test bot responding from a local knowledge base.');
  
  return replyParts.join('\n');
}

