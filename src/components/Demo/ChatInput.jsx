import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatInput({ onSend, disabled = false }) {
  const [isFocused, setIsFocused] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;
    const input = e.target.elements.msg;
    const v = input.value.trim();
    if (v) {
      onSend(v);
      input.value = '';
    }
  };

  return (
    <div style={{
      height: '56px',
      background: '#FFFFFF',
      borderTop: '1px solid #F0EDE8',
      position: 'relative',
      zIndex: 10,
    }}>
      <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', height: '100%' }}>
        <input
          name="msg"
          placeholder="问 HomeMind 任何问题..."
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            flex: 1,
            height: '100%',
            padding: '0 1.5rem',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: '#3D3530',
            opacity: disabled ? 0.55 : 1,
          }}
        />
        
        <button
          type="submit"
          disabled={disabled}
          style={{
            width: '56px',
            height: '100%',
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled ? 'default' : 'pointer',
            color: '#E8956D',
            opacity: disabled ? 0.55 : 1,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>

      {/* Focus Indicator Line */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: '#E8956D',
              transformOrigin: 'center',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
