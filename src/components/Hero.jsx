export default function Hero() {
  return (
    <section style={{
      background: '#FAF8F5',
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      scrollSnapAlign: 'start',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        width: '70vw',
        height: '70vw',
        maxWidth: '800px',
        maxHeight: '800px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,149,109,0.10) 0%, transparent 65%)',
        top: '50%',
        right: '-15vw',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      {/* Nav */}
      <nav style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        padding: 'clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.5rem, 5vw, 3rem)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '2.25rem', height: '2.25rem',
            borderRadius: '50%',
            background: '#E8956D',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '-0.05em' }}>H</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.125rem', color: '#3D3530', letterSpacing: '-0.03em' }}>HomeMind</span>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1.125rem',
            borderRadius: '9999px',
            background: '#3D3530',
            color: '#FAF8F5',
            fontSize: '0.8125rem',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </nav>

      {/* Hero body */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 8vw, 6rem)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
          width: '100%',
        }}>
          {/* Left: text */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.875rem',
              borderRadius: '9999px',
              background: 'rgba(232,149,109,0.08)',
              border: '1px solid rgba(232,149,109,0.18)',
              color: '#E8956D',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
            }}>
              <span style={{
                width: '0.4rem', height: '0.4rem',
                borderRadius: '50%',
                background: '#E8956D',
                animation: 'pulse 2s cubic-bezier(.4,0,.6,1) infinite',
              }} />
              AI 家庭生活管家
            </div>

            <h1 style={{
              fontSize: 'clamp(2.75rem, 5vw + 1.5rem, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: '#3D3530',
              marginBottom: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            }}>
              家，<br />
              <span style={{ color: '#E8956D', position: 'relative', display: 'inline-block' }}>
                记得你。
                <span style={{
                  position: 'absolute',
                  bottom: '0.2em',
                  left: 0,
                  width: '100%',
                  height: '0.18em',
                  background: '#E8956D',
                  opacity: 0.18,
                  borderRadius: '2px',
                }} />
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.1875rem)',
              lineHeight: 1.75,
              color: '#6A605B',
              marginBottom: 'clamp(2rem, 4vw, 2.5rem)',
              maxWidth: '460px',
            }}>
              HomeMind 是一位住在你家里的 AI 管家。它观察、记忆、学习，在你需要之前，已经为你准备好一切。
            </p>

            <a
              href="#painpoints"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('painpoints')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.875rem 1.875rem',
                borderRadius: '9999px',
                background: '#E8956D',
                color: 'white',
                fontSize: '0.9375rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                boxShadow: '0 4px 20px rgba(232,149,109,0.3)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(232,149,109,0.38)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(232,149,109,0.3)'; }}
            >
              探索能力
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Right: notification card */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              background: 'white',
              borderRadius: '1.5rem',
              padding: 'clamp(1.25rem, 3vw, 1.75rem)',
              boxShadow: '0 24px 64px rgba(61,53,48,0.08)',
              border: '1px solid rgba(232,149,109,0.08)',
              width: '100%',
              maxWidth: '360px',
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '2.75rem', height: '2.75rem',
                  borderRadius: '50%',
                  background: '#FFF3EC',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8956D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#3D3530' }}>HomeMind 主动提醒</div>
                  <div style={{ fontSize: '0.6875rem', color: '#A39B96', marginTop: '0.125rem' }}>刚刚</div>
                </div>
              </div>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: '#6A605B', fontWeight: 500 }}>
                "您3天前购买的茄子今天是最佳食用期限，需要我帮您查找食谱吗？"
              </p>
              {/* Action row */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button style={{
                  flex: 1, padding: '0.5rem', borderRadius: '0.625rem',
                  background: '#E8956D', color: 'white',
                  fontSize: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                }}>查找食谱</button>
                <button style={{
                  flex: 1, padding: '0.5rem', borderRadius: '0.625rem',
                  background: '#F5F1EC', color: '#8B7D76',
                  fontSize: '0.75rem', fontWeight: 600, border: 'none', cursor: 'pointer',
                }}>稍后提醒</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
