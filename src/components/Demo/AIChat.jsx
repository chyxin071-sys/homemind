import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function TypewriterText({ text, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, 30); // 打字速度，数字越小越快
    return () => clearInterval(timer);
  }, [text]); // 仅在 text 变化时重新触发

  return <span>{displayedText}</span>;
}

export default function AIChat({ messages, isLoading, suggestions = [], onSuggestionClick }) {
  const messagesEndRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isLoading, showSuggestions]);

  // 当建议列表改变时，先隐藏，等待打字机完成
  useEffect(() => {
    setShowSuggestions(false);
  }, [suggestions]);

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
    }}>
      {messages.length === 0 && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#C4B8B0',
          fontSize: '14px',
          letterSpacing: '0.05em',
          textAlign: 'center',
          lineHeight: 1.8,
        }}>
          选择左侧一个场景<br/>
          HomeMind 会主动和你说话
        </div>
      )}

      <AnimatePresence initial={false}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            layout
            style={{
              display: 'flex',
              justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
              width: '100%',
            }}
          >
            {msg.type === 'proactive' && (
              <div style={{
                position: 'relative',
                background: '#FDF8F3',
                color: '#3D3530',
                padding: '1.25rem 1.5rem',
                borderRadius: '0 16px 16px 16px',
                maxWidth: '85%',
                fontSize: '14px',
                lineHeight: 1.7,
                boxShadow: '0 2px 12px rgba(61,53,48,0.03)',
              }}>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '1rem',
                  bottom: '1rem',
                  width: '4px',
                  background: '#E8956D',
                  borderRadius: '0 4px 4px 0',
                }} />
                <span style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#C4845A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                }}>主动感知</span>
                <TypewriterText 
                  text={msg.content.replace(/\[操作:.*?\]/g, '').trim()} 
                  onComplete={() => {
                    if (suggestions.length > 0 && i === 0) {
                      setTimeout(() => setShowSuggestions(true), 400);
                    }
                  }}
                />
              </div>
            )}

            {msg.type === 'reply' && (
              <div style={{
                background: '#FFFFFF',
                color: '#3D3530',
                padding: '1rem 1.25rem',
                borderRadius: '0 12px 12px 12px',
                maxWidth: '85%',
                fontSize: '14px',
                lineHeight: 1.6,
                boxShadow: '0 2px 12px rgba(61,53,48,0.04)',
                border: '1px solid #F5F1EC',
              }}>
                {msg.content.replace(/\[操作:.*?\]/g, '').trim()}
              </div>
            )}

            {msg.type === 'user' && (
              <div style={{
                background: '#F0EDE8',
                color: '#3D3530',
                padding: '0.875rem 1.25rem',
                borderRadius: '12px 12px 0 12px',
                maxWidth: '80%',
                fontSize: '14px',
                lineHeight: 1.5,
              }}>
                {msg.content}
              </div>
            )}
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <div style={{
              background: '#FFFFFF',
              padding: '1rem 1.25rem',
              borderRadius: '0 12px 12px 12px',
              border: '1px solid #F5F1EC',
              display: 'flex',
              gap: '4px',
            }}>
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0 }} style={{ width: 4, height: 4, borderRadius: '50%', background: '#D4C4BC' }} />
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }} style={{ width: 4, height: 4, borderRadius: '50%', background: '#D4C4BC' }} />
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }} style={{ width: 4, height: 4, borderRadius: '50%', background: '#D4C4BC' }} />
            </div>
          </motion.div>
        )}

        {messages.length === 1 && showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '4px',
            }}
          >
            {suggestions.map((text, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setShowSuggestions(false);
                  if (onSuggestionClick) onSuggestionClick(text);
                }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  border: '1px solid #E8E0D5',
                  color: '#6B6055',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FDF8F3';
                  e.currentTarget.style.borderColor = '#E8956D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#E8E0D5';
                }}
              >
                {text}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
}
