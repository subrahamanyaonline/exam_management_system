import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([
        { from: 'bot', text: '👋 Hello! How can I help you with your tests today?' }
      ]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = {
        from: 'bot',
        text: generateBotReply(userMessage.text)
      };
      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 800);
  };

  const generateBotReply = (text) => {
    const query = text.toLowerCase();
    if (query.includes('test')) return '📄 You can view your tests in the "My Tests" section.';
    if (query.includes('create')) return '🛠️ Use the "Create Test" button on the homepage.';
    if (query.includes('assign')) return '🗂️ You can assign tests from the test management page.';
    if (query.includes('hi') || query.includes('hello')) return '👋 Hi there! How can I assist you?';
    return '🤖 Sorry, I didn’t get that. Try asking about tests, creation, or assignments.';
  };

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  return (
    <>
      <button className="chatbot-button" onClick={toggleChat}>
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">Ask AI Assistant</div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-message bot typing">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isTyping}
            />
           
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
