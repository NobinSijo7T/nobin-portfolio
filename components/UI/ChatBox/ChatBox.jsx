"use client";

import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/src/components/ui/conversation";
import styles from './ChatBox.module.scss';
import Bytez from "bytez.js";
import nobinProfile from '@/database/config/nobin-profile.json';

const EXAMPLE_PROMPTS = [
  "Tell me about Nobin's skills",
  "Open Nobin's LinkedIn",
  "How can I contact Nobin?",
  "Send an email to Nobin",
];

export default function ChatBox({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle agentic actions (opening links, sending emails, etc.)
  const executeAgenticAction = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for LinkedIn opening request
    if (lowerMessage.includes('open') && (lowerMessage.includes('linkedin') || lowerMessage.includes('linked in'))) {
      window.open(nobinProfile.social.linkedin, '_blank');
      return `✅ Opening Nobin's LinkedIn profile in a new tab!\n\n🔗 ${nobinProfile.social.linkedin}`;
    }
    
    // Check for Instagram opening request
    if (lowerMessage.includes('open') && (lowerMessage.includes('instagram') || lowerMessage.includes('insta'))) {
      window.open(nobinProfile.social.instagram, '_blank');
      return `✅ Opening Nobin's Instagram profile in a new tab!\n\n🔗 ${nobinProfile.social.instagram}`;
    }
    
    // Check for GitHub opening request
    if (lowerMessage.includes('open') && lowerMessage.includes('github')) {
      if (nobinProfile.social.github) {
        window.open(nobinProfile.social.github, '_blank');
        return `✅ Opening Nobin's GitHub profile in a new tab!\n\n🔗 ${nobinProfile.social.github}`;
      }
      return `GitHub profile is available on request. Please reach out directly!`;
    }
    
    // Check for portfolio opening request
    if (lowerMessage.includes('open') && (lowerMessage.includes('portfolio') || lowerMessage.includes('website'))) {
      if (nobinProfile.social.portfolio) {
        window.open(nobinProfile.social.portfolio, '_blank');
        return `✅ Opening Nobin's portfolio in a new tab!\n\n🔗 ${nobinProfile.social.portfolio}`;
      }
      return `You're already on Nobin's portfolio! 😊`;
    }
    
    // Check for email request
    if ((lowerMessage.includes('email') || lowerMessage.includes('send') || lowerMessage.includes('mail') || lowerMessage.includes('contact')) 
        && !lowerMessage.includes('how') && !lowerMessage.includes('what')) {
      const email = nobinProfile.personal.email;
      const subject = 'Inquiry from Portfolio Website';
      const body = encodeURIComponent(`Hi Nobin,\n\nI visited your portfolio and would like to connect with you.\n\nBest regards,`);
      
      // Open Gmail compose in a new tab
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank');
      
      return `✅ Opening Gmail in a new tab to send a message to Nobin!\n\n📧 Email: ${email}\n\nA new tab with Gmail compose should open shortly. If you prefer using a different email client, you can copy the email address above.`;
    }
    
    // Check for phone/call request
    if ((lowerMessage.includes('call') || lowerMessage.includes('phone')) && nobinProfile.personal.phone) {
      return `📞 You can reach Nobin at: ${nobinProfile.personal.phone}\n\nFeel free to call or send a message!`;
    }
    
    return null; // No agentic action detected
  };

  // Generate smart fallback response
  const generateFallbackResponse = (userMessage) => {
    // First check if this is an agentic action request
    const agenticResponse = executeAgenticAction(userMessage);
    if (agenticResponse) {
      return agenticResponse;
    }
    
    let fallbackResponse = "👋 I'm Nobin's AI assistant! ";
    
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('skill')) {
      fallbackResponse += `Nobin is skilled in ${nobinProfile.skills.frontend.slice(0, 4).join(', ')}, and many more technologies across frontend, backend, and design!`;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('connect')) {
      fallbackResponse += `You can connect with Nobin:\n📧 LinkedIn: ${nobinProfile.social.linkedin}\n📱 Instagram: ${nobinProfile.social.instagram}\n\n💡 Tip: You can ask me to "open LinkedIn" or "send an email" and I'll help you!`;
    } else if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
      fallbackResponse += `Nobin is based in ${nobinProfile.personal.location}. He's ${nobinProfile.personal.availability.toLowerCase()} and open to ${nobinProfile.personal.workPreference.toLowerCase()} opportunities!`;
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      const latestExp = nobinProfile.experience[0];
      fallbackResponse += `${latestExp.title} at ${latestExp.company} (${latestExp.duration}). ${latestExp.description}`;
    } else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('help')) {
      fallbackResponse += `Nobin offers: ${nobinProfile.services.slice(0, 4).join(', ')}, and more!`;
    } else if (lowerMessage.includes('project')) {
      fallbackResponse += `Some of Nobin's projects include: ${nobinProfile.projects.highlights.slice(0, 2).join(', ')}. Check out the portfolio for more!`;
    } else if (lowerMessage.includes('education') || lowerMessage.includes('study')) {
      const edu = nobinProfile.education[0];
      fallbackResponse += `Nobin has a ${edu.degree} in ${edu.field} from ${edu.institution} (${edu.year}).`;
    } else {
      fallbackResponse += `${nobinProfile.personal.bio}\n\nFeel free to ask about his skills, experience, projects, or how to contact him!`;
    }
    
    return fallbackResponse;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      const userMessage = inputMessage.trim();
      
      // Add user message
      setMessages([...messages, {
        id: Date.now(),
        content: userMessage,
        sender: 'user',
        timestamp: new Date()
      }]);
      setInputMessage('');
      setIsLoading(true);
      
      try {
        // Try API call with timeout
        const apiCall = async () => {
          try {
            const key = "16cf973b5ca4c99c522d56d71331bc43";
            const sdk = new Bytez(key);
            const model = sdk.model("inference-net/Schematron-3B");

            // Simplified context for faster processing
            const context = `You are Nobin Sijo's AI assistant. Answer briefly about:
- Skills: ${nobinProfile.skills.frontend.slice(0, 3).join(', ')}, ${nobinProfile.skills.backend.slice(0, 2).join(', ')}
- Role: ${nobinProfile.personal.tagline}
- Contact: LinkedIn ${nobinProfile.social.linkedin}, Instagram ${nobinProfile.social.instagram}
- Experience: ${nobinProfile.experience[0].title} at ${nobinProfile.experience[0].company}
Keep responses under 100 words.`;

            const { error, output } = await model.run([
              { "role": "system", "content": context },
              { "role": "user", "content": userMessage }
            ]);

            if (error) throw new Error(error);
            
            // Extract text content
            if (typeof output === 'string') return output;
            if (Array.isArray(output)) {
              const lastMessage = output[output.length - 1];
              return typeof lastMessage === 'string' 
                ? lastMessage 
                : lastMessage?.content || lastMessage?.text || null;
            }
            if (typeof output === 'object') {
              return output.content || output.text || output.message || null;
            }
            
            return null;
          } catch (apiError) {
            console.log('API call failed:', apiError.message);
            return null;
          }
        };

        // Create a timeout promise (5 seconds)
        const timeoutPromise = new Promise((resolve) => 
          setTimeout(() => resolve(null), 5000)
        );

        const aiResponse = await Promise.race([apiCall(), timeoutPromise]);

        if (aiResponse) {
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            content: aiResponse,
            sender: 'bot',
            timestamp: new Date()
          }]);
        } else {
          // Use smart fallback response (API timed out or failed)
          const fallbackResponse = generateFallbackResponse(userMessage);
          
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            content: fallbackResponse,
            sender: 'bot',
            timestamp: new Date()
          }]);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        // Use smart fallback response
        const fallbackResponse = generateFallbackResponse(userMessage);
        
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          content: fallbackResponse,
          sender: 'bot',
          timestamp: new Date()
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleExamplePrompt = (prompt) => {
    setInputMessage(prompt);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Chat Box */}
      <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <div className={styles.headerContent}>
              <Sparkles size={20} />
              <div>
                <h3>AI Assistant</h3>
                <p className={styles.subtitle}>Ask me about Nobin Sijo</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <Conversation className={styles.chatConversation}>
            <ConversationContent>
              {messages.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateContent}>
                    <ConversationEmptyState
                      title="👋 Hi! I'm Nobin's AI Assistant"
                      description="Ask me anything about Nobin Sijo - his skills, experience, projects, or how to connect!"
                      icon={<Sparkles size={48} />}
                    />
                  </div>
                  <div className={styles.examplePrompts}>
                    <p className={styles.promptsTitle}>Try asking:</p>
                    <div className={styles.promptsContainer}>
                      {EXAMPLE_PROMPTS.map((prompt, index) => (
                        <button
                          key={index}
                          className={styles.promptButton}
                          onClick={() => handleExamplePrompt(prompt)}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.messagesContainer}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`${styles.message} ${
                        message.sender === 'user' ? styles.userMessage : styles.botMessage
                      }`}
                    >
                      <div className={styles.messageContent}>
                        {message.content}
                      </div>
                      <div className={styles.messageTime}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className={`${styles.message} ${styles.botMessage}`}>
                      <div className={styles.messageContent}>
                        <div className={styles.typingIndicator}>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <form onSubmit={handleSendMessage} className={styles.chatInput}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about Nobin..."
              className={styles.input}
              disabled={isLoading}
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={!inputMessage.trim() || isLoading}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
    </>
  );
}
