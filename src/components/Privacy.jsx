const privacyPoints = [
  {
    title: '数据不离家',
    desc: '所有识别和记忆数据存储在本地设备，不上传任何云端服务器，即使断网也能正常工作。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="8" y="16" width="24" height="18" rx="3" stroke="#E8956D" strokeWidth="1.5"/>
        <path d="M14 16v-4a6 6 0 0 1 12 0v4" stroke="#E8956D" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="25" r="2.5" fill="#E8956D"/>
        <line x1="20" y1="27.5" x2="20" y2="30" stroke="#E8956D" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: '摄像头只提取信息',
    desc: '摄像头进行边缘计算，只保存"钥匙在玄关"这样的结构化信息，不保存原始视频画面。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="6" y="12" width="22" height="16" rx="3" stroke="#E8956D" strokeWidth="1.5"/>
        <path d="M28 17 L34 14 V26 L28 23" stroke="#E8956D" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="17" cy="20" r="4" stroke="#E8956D" strokeWidth="1.5"/>
        <circle cx="17" cy="20" r="1.5" fill="#E8956D"/>
      </svg>
    ),
  },
  {
    title: '随时可以删除',
    desc: '所有记录对家庭成员完全透明，可以查看AI知道的所有信息，一键删除任何记录。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M10 20 L17 27 L30 13" stroke="#E8956D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="20" r="13" stroke="#E8956D" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

export default function Privacy() {
  return (
    <section style={{ 
      background: '#3D3530', 
      minHeight: '100svh', 
      scrollSnapAlign: 'start',
      display: 'flex',
      alignItems: 'center',
      padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 5vw, 4rem)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 'clamp(4rem, 8vw, 6rem)' }}>
          <p style={{ 
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#E8956D',
            marginBottom: '1.5rem',
          }}>
            绝对隐私优先
          </p>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.2,
            color: '#FFFFFF',
            letterSpacing: '-0.02em'
          }}>
            你的家，<span style={{ color: '#E8956D' }}>只有你知道。</span>
          </h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 'clamp(2rem, 4vw, 4rem)' 
        }}>
          {privacyPoints.map((point, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ 
                marginBottom: '2rem',
              }}>
                {point.icon}
              </div>
              <h3 style={{ 
                fontSize: 'clamp(1.5rem, 2vw, 1.75rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>{point.title}</h3>
              <p style={{ 
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                lineHeight: 1.8,
                fontWeight: 500,
                color: '#A39B96'
              }}>{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
