import { Devvit } from '@devvit/public-api';
import { Comment } from '@devvit/public-api';
import { Metadata } from '@devvit/protos';
import { extractIntent, searchProxyFAQ, formatReply } from './actions.js';

Devvit.addTrigger({
  event: Devvit.Trigger.PostSubmit,
  handler: async (event, metadata?: Metadata) => {
    const post = event.post;
    
    if (!post || !post.id) {
      console.log('Post or post ID is missing');
      return;
    }
    
    // Skip if already processed - check if bot already replied
    // Note: In production, you might want to track processed posts in a database
    // For now, we'll rely on Devvit's built-in deduplication
    
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
      
      // Call MCP server
      const faqRecord = await searchProxyFAQ(intent.vendor, intent.topic);
      
      if (!faqRecord) {
        console.log('No FAQ record found');
        // Post a helpful message even if no record found
        await Comment.submit({
          id: post.id as `t3_${string}`,
          text: `I couldn't find specific information about ${intent.vendor} and ${intent.topic} in my knowledge base. Please check back later or try rephrasing your question.`
        }, metadata);
        return;
      }
      
      // Format and post reply
      const reply = formatReply(intent, faqRecord);
      
      await Comment.submit({
        id: post.id as `t3_${string}`,
        text: reply
      }, metadata);
      
      console.log('Successfully posted reply');
      
    } catch (error) {
      console.error('Error processing post:', error);
      
      // Post error message
      try {
        await Comment.submit({
          id: post.id as `t3_${string}`,
          text: 'Sorry, I encountered an error while processing your question. Please try again later.'
        }, metadata);
      } catch (commentError) {
        console.error('Error posting error message:', commentError);
      }
    }
  }
});

export default Devvit;
