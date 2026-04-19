import { motion } from 'framer-motion';
import { scenes } from '../../data/scenes';

export default function StorySelector({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#FAF8F5',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        fontSize: '14px',
        color: '#9A8F82',
        marginBottom: '48px',
        fontWeight: 500,
        letterSpacing: '0.05em'
      }}>
        选择一个生活场景，开始体验
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '1000px',
        padding: '0 24px',
      }}>
        {scenes.map((scene) => (
          <motion.button
            key={scene.id}
            onClick={() => onSelect(scene)}
            whileHover={{ 
              scale: 1.03, 
              backgroundColor: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)' 
            }}
            whileTap={{ scale: 0.96 }}
            style={{
              width: '100%',
              height: '220px',
              background: '#FFFFFF',
              borderRadius: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
              transition: 'all 0.2s',
              gap: '20px'
            }}
          >
            <div style={{
              fontSize: '13px',
              color: scene.color,
              fontWeight: 600,
              background: `${scene.color}15`,
              padding: '8px 16px',
              borderRadius: '16px',
              letterSpacing: '0.02em'
            }}>
              {scene.tag}
            </div>

            <div style={{ 
              fontSize: '17px', 
              color: '#3D3530', 
              fontWeight: 500,
              lineHeight: '1.5'
            }}>
              {scene.name}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
