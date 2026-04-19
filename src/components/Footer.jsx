export default function Footer() {
  return (
    <section 
      style={{ 
        background: '#FAF8F5', 
        minHeight: '100svh', 
        scrollSnapAlign: 'start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '800px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 900, 
          lineHeight: 1.2, 
          marginBottom: '2.5rem',
          letterSpacing: '-0.02em',
          color: '#3D3530' 
        }}>
          未来的家，应该像一个<br />
          <span style={{ color: '#E8956D' }}>懂你的老朋友。</span>
        </h2>

        <p style={{ 
          fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
          lineHeight: 2, 
          marginBottom: '5rem',
          color: '#6A605B',
          fontWeight: 500,
          maxWidth: '600px'
        }}>
          HomeMind 现在还是一个概念原型。但我们相信，当 AI 真正融入家庭空间，
          它不应该是冷冰冰的自动化工具，而是一个有记忆、有温度、真正关心你的生活伴侣。
        </p>

        <div style={{ 
          borderTop: '1px solid #EAE5DF', 
          width: '100%', 
          paddingTop: '2.5rem',
          color: '#A39B96',
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 1.8
        }}>
          <p>HomeMind — AI 家庭生活管家概念原型</p>
          <p>Powered by DeepSeek API · Built with React + Vite</p>
        </div>
      </div>
    </section>
  );
}
