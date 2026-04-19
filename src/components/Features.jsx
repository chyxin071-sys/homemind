const capabilities = [
  {
    num: '01',
    title: '感知',
    color: '#E8956D',
    bg: '#FFF3EC',
    items: ['摄像头识别物品位置', '手机定位距离', '识别是谁回家了', '声音识别环境变化'],
    visual: (
      <svg viewBox="0 0 200 200" fill="none" style={{ width: '100%', height: '100%', maxWidth: '200px' }}>
        <circle cx="100" cy="100" r="60" stroke="#E8956D" strokeWidth="1.5" opacity="0.3"/>
        <circle cx="100" cy="100" r="40" stroke="#E8956D" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="100" cy="100" r="20" stroke="#E8956D" strokeWidth="1.5" opacity="0.8"/>
        <circle cx="100" cy="100" r="6" fill="#E8956D"/>
        <line x1="100" y1="20" x2="100" y2="40" stroke="#E8956D" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <line x1="100" y1="160" x2="100" y2="180" stroke="#E8956D" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <line x1="20" y1="100" x2="40" y2="100" stroke="#E8956D" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <line x1="160" y1="100" x2="180" y2="100" stroke="#E8956D" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: '记忆与学习',
    color: '#7BB8D4',
    bg: '#EEF6FB',
    items: ['记住你把什么放在哪', '学习每个人的作息', '了解你的灯光偏好', '区分工作日和周末'],
    visual: (
      <svg viewBox="0 0 200 200" fill="none" style={{ width: '100%', height: '100%', maxWidth: '200px' }}>
        <rect x="40" y="50" width="120" height="100" rx="12" stroke="#7BB8D4" strokeWidth="1.5" opacity="0.4"/>
        <line x1="40" y1="80" x2="160" y2="80" stroke="#7BB8D4" strokeWidth="1" opacity="0.3"/>
        <rect x="55" y="95" width="35" height="8" rx="4" fill="#7BB8D4" opacity="0.5"/>
        <rect x="55" y="111" width="55" height="8" rx="4" fill="#7BB8D4" opacity="0.3"/>
        <rect x="55" y="127" width="45" height="8" rx="4" fill="#7BB8D4" opacity="0.2"/>
        <circle cx="140" cy="65" r="8" fill="#7BB8D4" opacity="0.6"/>
        <path d="M136 65 l3 3 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: '主动服务',
    color: '#A8C5A0',
    bg: '#EFF6EE',
    items: ['你还没开口，已经开好空调', '发现茄子快过期，主动提醒', '深夜自动调暗灯光', '检测异常，通知家人'],
    visual: (
      <svg viewBox="0 0 200 200" fill="none" style={{ width: '100%', height: '100%', maxWidth: '200px' }}>
        <path d="M100 40 L115 75 L155 80 L128 106 L135 145 L100 128 L65 145 L72 106 L45 80 L85 75 Z" stroke="#A8C5A0" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5"/>
        <path d="M100 55 L111 82 L140 86 L120 105 L125 134 L100 121 L75 134 L80 105 L60 86 L89 82 Z" fill="#A8C5A0" opacity="0.15"/>
        <circle cx="100" cy="100" r="12" fill="#A8C5A0" opacity="0.7"/>
        <path d="M95 100 l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section style={{
      background: '#FAF8F5',
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
      scrollSnapAlign: 'start',
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', maxWidth: '560px' }}>
          <p style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#E8956D',
            marginBottom: '1rem',
          }}>三层核心能力</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw + 0.5rem, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#3D3530',
          }}>
            HomeMind<br />
            <span style={{ color: '#E8956D' }}>是怎么工作的？</span>
          </h2>
        </div>

        {/* Capability columns */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 'clamp(1.5rem, 3vw, 3rem)' 
        }}>
          {capabilities.map((cap) => (
            <div
              key={cap.num}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: 'clamp(2rem, 3vw, 3rem)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background decorative number */}
              <div style={{
                position: 'absolute',
                top: '-1rem',
                right: '-1rem',
                fontSize: '120px',
                fontWeight: 900,
                color: cap.color,
                opacity: 0.05,
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}>
                {cap.num}
              </div>

              {/* Text block */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                  <span style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: cap.color,
                  }}>{cap.num}</span>
                  <h3 style={{
                    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                    fontWeight: 800,
                    color: '#3D3530',
                    letterSpacing: '-0.02em',
                  }}>{cap.title}</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cap.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '6px', height: '6px',
                        borderRadius: '50%',
                        background: cap.color,
                        flexShrink: 0,
                        marginTop: '8px'
                      }} />
                      <span style={{
                        fontSize: 'clamp(0.9375rem, 1vw + 0.25rem, 1.0625rem)',
                        color: '#6A605B',
                        fontWeight: 500,
                        lineHeight: 1.5,
                      }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
