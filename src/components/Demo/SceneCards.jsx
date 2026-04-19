import { scenes } from '../../data/scenes';

export default function SceneCards({ activeScene, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem', paddingTop: '0.25rem' }}>
      {scenes.map((scene) => {
        const active = activeScene?.id === scene.id;
        return (
          <button
            key={scene.id}
            onClick={() => onSelect(scene)}
            style={{
              flexShrink: 0,
              padding: '0.875rem 1.125rem',
              borderRadius: '1rem',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer',
              minWidth: '148px',
              background: active ? '#E8956D' : '#FFFFFF',
              color: active ? '#FFFFFF' : '#3D3530',
              boxShadow: active ? '0 4px 16px rgba(232,149,109,0.3)' : '0 2px 8px rgba(61,53,48,0.05)',
              transition: 'all 0.25s ease',
              transform: active ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            <div style={{ fontSize: '1.25rem', marginBottom: '0.375rem' }}>{scene.icon}</div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.25rem' }}>{scene.name}</div>
            <div style={{ fontSize: '0.6875rem', opacity: 0.7, lineHeight: 1.4 }}>{scene.desc}</div>
          </button>
        );
      })}
    </div>
  );
}
