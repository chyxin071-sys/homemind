const painPoints = [
  {
    num: '01',
    title: '出门找不到钥匙',
    desc: '早上出门找不到钥匙，翻遍全屋，最后发现在昨晚外卖袋旁边。',
  },
  {
    num: '02',
    title: '食材悄悄过期',
    desc: '冰箱里的菜买了好几天，想起来的时候已经坏了。',
  },
  {
    num: '03',
    title: '回家摸黑找开关',
    desc: '冬天下班回家，进门一片黑暗，还要先摸黑找开关。',
  },
];

export default function PainPoints() {
  return (
    <section id="painpoints" style={{
      background: '#F0EBE4',
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
      scrollSnapAlign: 'start',
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <p style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#E8956D',
            marginBottom: '1rem',
          }}>生活里的小麻烦</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw + 0.5rem, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#3D3530',
          }}>
            这些场景，<span style={{ color: '#E8956D' }}>你一定遇到过。</span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }}>
          {painPoints.map((p) => (
            <div
              key={p.num}
              style={{
                background: '#FFFFFF',
                borderRadius: '1.25rem',
                padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(61,53,48,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* Large background number */}
              <div style={{
                position: 'absolute',
                top: '-0.5rem',
                right: '1rem',
                fontSize: 'clamp(5rem, 10vw, 8rem)',
                fontWeight: 900,
                color: '#3D3530',
                opacity: 0.03,
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
              }}>{p.num}</div>

              <div style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#E8956D',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}>{p.num}</div>

              <h3 style={{
                fontSize: 'clamp(1.125rem, 2vw + 0.25rem, 1.375rem)',
                fontWeight: 800,
                color: '#3D3530',
                marginBottom: '0.75rem',
                letterSpacing: '-0.02em',
              }}>{p.title}</h3>

              <p style={{
                fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1rem)',
                lineHeight: 1.7,
                color: '#8B7D76',
                fontWeight: 500,
              }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Transition quote */}
        <div style={{
          background: '#3D3530',
          borderRadius: '1.25rem',
          padding: 'clamp(1.5rem, 3vw, 2.25rem) clamp(2rem, 4vw, 3rem)',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: 'clamp(1rem, 2vw + 0.25rem, 1.375rem)',
            fontWeight: 700,
            color: '#FAF8F5',
            lineHeight: 1.6,
          }}>
            如果家里有一个什么都记得、什么都懂你的管家，会怎样？
          </p>
        </div>
      </div>
    </section>
  );
}
