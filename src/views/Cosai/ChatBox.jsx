import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Replace with your actual API key
const API_KEY = 'AIzaSyD82IyWZlxx6nIy5HL2Tt0R2CZMosHd_vM';
const genAI = new GoogleGenerativeAI(API_KEY);

const Chatbox = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Actual Gemini AI response function
  const generateAIResponse = async (message) => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: "Chào chatbot, bạn là chuyên gia tư vấn về các sản phẩm mỹ phẩm và chăm sóc da của Việt Nam. Hãy tư vấn chi tiết và cụ thể về các sản phẩm, lợi ích, cách sử dụng, và các thương hiệu uy tín tại Việt Nam. Trả lời bằng tiếng Việt một cách thân thiện và chuyên nghiệp." }],
          },
          {
            role: 'model',
            parts: [{ text: "Chào bạn! Tôi rất vui được hỗ trợ bạn tìm hiểu về thế giới mỹ phẩm và chăm sóc da. Bạn muốn biết gì về các sản phẩm này?" }],
          },
          ...messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          }))
        ],
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const result = await chat.sendMessage(message);
      return result.response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (isChatboxOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatboxOpen]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { sender: 'user', text: inputMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await generateAIResponse(inputMessage);
      const aiMessage = { sender: 'ai', text: response, timestamp: new Date() };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'Xin lỗi, có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau.', timestamp: new Date() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  return (
    <div className="chatbox-wrapper">
      {/* Floating Button */}
      {!isChatboxOpen && (
        <div className="floating-button" onClick={toggleChatbox}>
          <div className="floating-avatar">
            <img 
              src="https://c.animaapp.com/mbs5h78mOlSTof/img/ellipse-106-1.png" 
              alt="COSAI Avatar" 
            />
          </div>
          <div className="floating-badge">
            <span>CHATBOX</span>
          </div>
        </div>
      )}

      {/* Main Chatbox */}
      {isChatboxOpen && (
        <div className="chatbox-container">
          {/* Header */}
          <div className="chatbox-header">
            <div className="header-content">
              <div className="avatar-container">
                <img 
                  src="https://c.animaapp.com/mbs5h78mOlSTof/img/ellipse-106-1.png" 
                  alt="COSAI Avatar" 
                  className="header-avatar"
                />
                <div className="online-indicator"></div>
              </div>
              <div className="header-text">
                <h3 className="bot-name">COSAI - BEAUTY AI ASSISTANT</h3>
                <p className="status">● Online</p>
              </div>
            </div>
            <button className="close-button" onClick={toggleChatbox}>
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="messages-container">
            {messages.length === 0 && (
              <div className="welcome-message">
                <div className="message-avatar">
                  <img src="https://c.animaapp.com/mbs5h78mOlSTof/img/ellipse-106-1.png" alt="COSAI" />
                </div>
                <div className="ai-bubble welcome-bubble">
                  <p>Chào bạn! Mình là <strong>COSAI</strong> tư vấn viên AI của <strong>Comestic Selling</strong>. Mình có thể giúp gì cho bạn?</p>
                </div>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}-message`}>
                {msg.sender === 'ai' && (
                  <div className="message-avatar">
                    <img src="https://c.animaapp.com/mbs5h78mOlSTof/img/ellipse-106-1.png" alt="COSAI" />
                  </div>
                )}
                <div className={`message-bubble ${msg.sender}-bubble`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message ai-message">
                <div className="message-avatar">
                  <img src="https://c.animaapp.com/mbs5h78mOlSTof/img/ellipse-106-1.png" alt="COSAI" />
                </div>
                <div className="message-bubble ai-bubble loading-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  Đang soạn tin nhắn...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi của bạn..."
                disabled={isLoading}
                className="message-input"
              />
              <button 
                onClick={handleSendMessage} 
                disabled={isLoading || !inputMessage.trim()}
                className="send-button"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .chatbox-wrapper {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .floating-button {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .floating-button:hover {
          transform: translateY(-2px);
        }

        .floating-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4CAF50, #45a049);
          padding: 4px;
          box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
          margin-bottom: 8px;
        }

        .floating-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .floating-badge {
          background: #4CAF50;
          color: white;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          text-align: center;
          box-shadow: 0 4px 16px rgba(76, 175, 80, 0.2);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .chatbox-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 400px;
          height: 600px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 999;
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .chatbox-header {
          background: #329066;
          color: white;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .header-content {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .avatar-container {
          position: relative;
          margin-right: 15px;
        }

        .header-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.3);
          object-fit: cover;
        }

        .online-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          background: #4CAF50;
          border: 2px solid white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(76, 175, 80, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
          }
        }

        .header-text {
          flex: 1;
        }

        .bot-name {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .status {
          margin: 4px 0 0 0;
          font-size: 12px;
          opacity: 0.9;
          font-weight: 500;
        }

        .close-button {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.2s ease;
          line-height: 1;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(90deg);
        }

        .messages-container {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: linear-gradient(145deg, #f8fffe, #f0f9f7);
          background-size: 100% 100%;
        }

        .messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: rgba(76, 175, 80, 0.3);
          border-radius: 3px;
        }

        .welcome-message,
        .message {
          display: flex;
          margin-bottom: 20px;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ai-message {
          justify-content: flex-start;
          align-items: flex-end;
        }

        .user-message {
          justify-content: flex-end;
        }

        .message-avatar {
          width: 36px;
          height: 36px;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .message-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(76, 175, 80, 0.2);
        }

        .message-bubble {
          max-width: 280px;
          padding: 14px 18px;
          border-radius: 20px;
          word-wrap: break-word;
          position: relative;
        }

        .ai-bubble {
          background: white;
          border: 1px solid rgba(76, 175, 80, 0.1);
          border-radius: 6px;
          box-shadow: 0 2px 12px rgba(76, 175, 80, 0.08);
        }

        .welcome-bubble {
          background: linear-gradient(135deg, #e8f5e8, #f0f9f0);
          border: 1px solid rgba(76, 175, 80, 0.2);
        }

        .user-bubble {
          background: #f9a65a;
          color: white;
          border-bottom-right-radius: 6px;
          box-shadow: 0 2px 12px rgba(76, 175, 80, 0.2);
        }

        .loading-bubble {
          background: #f5f5f5;
          color: #666;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .typing-indicator {
          display: flex;
          gap: 3px;
        }

        .typing-indicator span {
          width: 6px;
          height: 6px;
          background: #4CAF50;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .input-container {
          padding: 20px;
          background: white;
          border-top: 1px solid rgba(76, 175, 80, 0.1);
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          background: #f8f9fa;
          border-radius: 25px;
          padding: 4px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .input-wrapper:focus-within {
          border-color: #4CAF50;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
          background: white;
        }

        .message-input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 12px 16px;
          font-size: 14px;
          outline: none;
          color: #333;
        }

        .message-input::placeholder {
          color: #999;
        }

        .message-input:disabled {
          opacity: 0.6;
        }

        .send-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #4CAF50, #45a049);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .send-button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }

        .send-button:active {
          transform: scale(0.95);
        }

        .send-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }

        .send-button svg {
          width: 20px;
          height: 20px;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .chatbox-container {
            width: 100vw;
            height: 100vh;
            bottom: 0;
            right: 0;
            border-radius: 0;
          }

          .floating-button {
            bottom: 20px;
            right: 20px;
          }

          .floating-avatar {
            width: 60px;
            height: 60px;
          }
        }

        /* Dark theme support */
        @media (prefers-color-scheme: dark) {
          .messages-container {
            background: #f2eee5
          }

          .ai-bubble {
            background: #329066;
            color: white;
            border-color: rgba(76, 175, 80, 0.3);
          }

          .loading-bubble {
            background: #444;
            color: #ccc;
            background: #329066;

          }
        }
      `}</style>
    </div>
  );
};

export default Chatbox;