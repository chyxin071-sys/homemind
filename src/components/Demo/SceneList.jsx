// SceneList.jsx - 纯文本垂直场景列表
export default function SceneList({ activeScene, onSelect, scenes }) {
  return (
    <div style={{
      height: '320px', // 固定高度，超过滚动
      overflowY: 'auto',
      padding: '1.5rem',
      borderBottom: '1px solid #F0EDE8',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {scenes.map((scene) => {
          const isActive = activeScene?.id === scene.id;
          return (
            <button
              key={scene.id}
              onClick={() => onSelect(scene)}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '44px',
                width: '100%',
                background: isActive ? '#FDF8F3' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                padding: '0 0.75rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                textAlign: 'left',
              }}
            >
              {/* 指示器 */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '16px',
                background: '#E8956D',
                borderRadius: '0 4px 4px 0',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }} />

              <span style={{
                fontSize: '14px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#3D3530' : '#8B7D76',
                width: '120px',
                flexShrink: 0,
                transition: 'color 0.3s ease',
              }}>
                {scene.name}
              </span>

              <span style={{
                fontSize: '12px',
                color: isActive ? '#8B7D76' : '#C4B8B0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'color 0.3s ease',
              }}>
                {scene.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
