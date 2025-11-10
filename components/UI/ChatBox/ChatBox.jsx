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
  "What is Nobin's experience?",
  "How can I contact Nobin?",
  "What services does Nobin offer?",
];

export default function ChatBox({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        // Initialize Bytez SDK
        const key = "16cf973b5ca4c99c522d56d71331bc43";
        const sdk = new Bytez(key);
        const model = sdk.model("inference-net/Schematron-3B");

        // Create comprehensive context about Nobin Sijo
        const allSkills = [
          ...nobinProfile.skills.frontend,
          ...nobinProfile.skills.backend,
          ...nobinProfile.skills.design,
          ...nobinProfile.skills.tools
        ].join(', ');

        const context = `You are an AI assistant representing Nobin Sijo's portfolio. Here's comprehensive information about Nobin:

PERSONAL INFO:
- Name: ${nobinProfile.personal.name}
- Role: ${nobinProfile.personal.tagline}
- Location: ${nobinProfile.personal.location}
- Status: ${nobinProfile.personal.availability}
- Bio: ${nobinProfile.personal.bio}

CONTACT & SOCIAL:
- LinkedIn: ${nobinProfile.social.linkedin}
- Instagram: ${nobinProfile.social.instagram}
- GitHub: ${nobinProfile.social.github || 'Available on request'}
- Portfolio: ${nobinProfile.social.portfolio || 'Current website'}

SKILLS:
- Frontend: ${nobinProfile.skills.frontend.join(', ')}
- Backend: ${nobinProfile.skills.backend.join(', ')}
- Design: ${nobinProfile.skills.design.join(', ')}
- Tools: ${nobinProfile.skills.tools.join(', ')}

EXPERIENCE:
${nobinProfile.experience.map(exp => `- ${exp.title} at ${exp.company} (${exp.duration}): ${exp.description}`).join('\n')}

SERVICES OFFERED:
${nobinProfile.services.join(', ')}

PROJECTS:
${nobinProfile.projects.highlights.join(', ')}

LANGUAGES: ${nobinProfile.languages.join(', ')}

PERSONALITY: ${nobinProfile.aiContext.personality}
RESPONSE STYLE: ${nobinProfile.aiContext.responseStyle}

Answer questions about Nobin professionally and helpfully. Be ${nobinProfile.aiContext.tone}. If asked about contact, provide the social media links. Keep responses concise and engaging.`;

        // Send input to model with context
        const { error, output } = await model.run([
          {
            "role": "system",
            "content": context
          },
          {
            "role": "user",
            "content": userMessage
          }
        ]);

        console.log('Bytez API Response:', { error, output, outputType: typeof output });

        if (error) {
          throw new Error(error);
        }

        // Extract text content from AI response
        let aiResponse = "I'm here to help you learn about Nobin Sijo. Feel free to ask me anything!";
        
        if (output) {
          // Handle different output formats
          if (typeof output === 'string') {
            aiResponse = output;
          } else if (Array.isArray(output)) {
            // If output is an array, get the last message content
            const lastMessage = output[output.length - 1];
            aiResponse = typeof lastMessage === 'string' 
              ? lastMessage 
              : lastMessage?.content || lastMessage?.text || aiResponse;
          } else if (typeof output === 'object') {
            // If output is an object, try to get content/text property
            aiResponse = output.content || output.text || output.message || JSON.stringify(output);
          }
        }

        // Add AI response
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          content: aiResponse,
          sender: 'bot',
          timestamp: new Date()
        }]);
      } catch (error) {
        console.error('AI Error:', error);
        // Fallback response with Nobin's info
        let fallbackResponse = "👋 I'm Nobin's AI assistant! ";
        
        const lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes('skill')) {
          fallbackResponse += `Nobin is skilled in ${nobinProfile.skills.frontend.slice(0, 4).join(', ')}, and many more technologies across frontend, backend, and design!`;
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('connect')) {
          fallbackResponse += `You can connect with Nobin:\n📧 LinkedIn: ${nobinProfile.social.linkedin}\n📱 Instagram: ${nobinProfile.social.instagram}`;
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
                  <ConversationEmptyState
                    title="👋 Hi! I'm Nobin's AI Assistant"
                    description="Ask me anything about Nobin Sijo - his skills, experience, projects, or how to connect!"
                    icon={<Sparkles size={48} />}
                  />
                  <div className={styles.examplePrompts}>
                    <p className={styles.promptsTitle}>Try asking:</p>
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
