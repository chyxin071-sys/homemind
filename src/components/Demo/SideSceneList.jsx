import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SideSceneList({ activeScene, onSelect, scenes, isOpen, onToggle }) {
  // 阻止内部点击事件冒泡到外层容器
  const handleInnerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 220 : 48 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      onClick={!isOpen ? onToggle : undefined}
      style={{
        height: '100%',
        background: '#EDE8DF',
        borderRight: '1px solid #D4C9B8',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: !isOpen ? 'pointer' : 'default',
        flexShrink: 0,
      }}
    >
      <AnimatePresence initial={false} mode="wait">
        {!isOpen ? (
          // 收起状态
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: '11px',
              letterSpacing: '4px',
              color: '#9A8F82',
              fontWeight: 600,
            }}>
              场景
            </div>
            {/* 指示点 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '16px' }}>
              {scenes.map((s, i) => (
                <div
                  key={i}
                  style={{
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: activeScene?.id === s.id ? '#D4845A' : '#D4C9B8',
                    transition: 'background 0.3s',
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          // 展开状态
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={handleInnerClick}
            style={{
              width: '220px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* 顶部标题 */}
            <div style={{
              padding: '12px 16px',
              fontSize: '12px',
              color: '#9A8F82',
              fontWeight: 500,
            }}>
              选择场景
            </div>

            {/* 列表 */}
            <div 
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '0 10px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                // Hide scrollbar for a cleaner look
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
              // Inline style for webkit hidden scrollbar
              className="hide-scrollbar"
            >
              {/* Add a global style tag just for the scrollbar hiding if needed, or use className */}
              <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
              {scenes.map((scene) => {
                const isActive = activeScene?.id === scene.id;
                return (
                  <button
                    key={scene.id}
                    onClick={() => {
                      onSelect(scene);
                      onToggle(); // 选中后自动收起
                    }}
                    style={{
                      flexShrink: 0, // Prevent buttons from squishing
                      background: isActive ? '#FDF8F3' : '#FFFFFF',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      position: 'relative',
                      boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                      transition: 'all 0.15s ease',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = '#F7F4F0';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = '#FFFFFF';
                    }}
                  >
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '3px',
                        height: '16px',
                        background: '#D4845A',
                        borderRadius: '0 2px 2px 0',
                      }} />
                    )}
                    <div style={{
                      fontSize: '14px',
                      color: isActive ? '#1A1209' : '#3D3530',
                      fontWeight: 500,
                      marginBottom: '4px',
                      transition: 'color 0.15s ease',
                    }}>
                      {scene.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#9A8F82',
                      fontWeight: 400,
                    }}>
                      {scene.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
