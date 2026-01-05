import { Devvit } from '@devvit/public-api';
import { extractIntent, searchProxyFAQ, formatReply } from './actions.js';

// Configure Devvit to enable Reddit API and HTTP requests
// IMPORTANT: Must specify allowed domains for HTTP requests
Devvit.configure({
  redditAPI: true,
  http: {
    domains: ['mcp-bot-production.up.railway.app'],
  },
});

Devvit.addTrigger({
  event: 'PostSubmit',
  onEvent: async (event, context) => {
    const post = event.post;
    
    if (!post || !post.id) {
      console.log('Post or post ID is missing');
      return;
    }
    
    try {
      // Extract intent from post
      const postText = `${post.title || ''} ${post.selftext || ''}`.trim();
      
      if (!postText) {
        console.log('Post has no text content');
        return;
      }
      
      console.log(`Processing post: ${postText}`);
      
      const intent = extractIntent(postText);
      
      if (!intent.vendor || !intent.topic) {
        console.log('Could not extract vendor or topic from post');
        return;
      }
      
      console.log(`Extracted intent: vendor=${intent.vendor}, topic=${intent.topic}`);
      
      // Call MCP server - use global fetch (domain configured in Devvit.configure and .devvitrc.json)
      const faqRecord = await searchProxyFAQ(intent.vendor, intent.topic);
      
      if (!faqRecord) {
        console.log('No FAQ record found');
        // Post a helpful message even if no record found
        await context.reddit.submitComment({
          id: post.id,
          text: `I couldn't find specific information about ${intent.vendor} and ${intent.topic} in my knowledge base. Please check back later or try rephrasing your question.`
        });
        return;
      }
      
      // Format and post reply
      const reply = formatReply(intent, faqRecord);
      
      await context.reddit.submitComment({
        id: post.id,
        text: reply
      });
      
      console.log('Successfully posted reply');
      
    } catch (error) {
      console.error('Error processing post:', error);
      
      // Post error message
      try {
        await context.reddit.submitComment({
          id: post.id,
          text: 'Sorry, I encountered an error while processing your question. Please try again later.'
        });
      } catch (commentError) {
        console.error('Error posting error message:', commentError);
      }
    }
  }
});

export default Devvit;

