import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StateSimulator({ state, activeScene, onSimulateEvent }) {
  const [expanded, setExpanded] = useState(false);

  const formatTime = (t) => {
    const h = Math.floor(t);
    const m = Math.round((t % 1) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const getMembersText = (members) => {
    if (!members) return '未知';
    const present = [];
    if (members.dad) present.push('爸爸');
    if (members.mom) present.push('妈妈');
    if (members.kid) present.push('小孩');
    if (present.length === 0) return '无人';
    if (present.length === 3) return '全家在家';
    return present.join('、') + ' 在家';
  };

  const renderActionButtons = () => {
    switch (activeScene?.id) {
      case 'story-coming-home':
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('门口摄像头识别到您已进门', { ...state, distance: 0, members: { ...state.members, dad: true } }); }}
              style={{ padding: '6px 12px', background: '#E8956D', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
              触发进门
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('手机GPS显示距家仅剩100米', { ...state, distance: 100 }); }}
              style={{ padding: '6px 12px', background: '#8FAF8A', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/></svg>
              距家100米
            </button>
          </div>
        );
      case 'story-find-keys':
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('用户询问包在哪里，请调用摄像头检索位置并回答'); }}
              style={{ padding: '6px 12px', background: '#8B7355', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              扫描背包
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('气象传感器显示室外开始下雨，请主动提醒带伞'); }}
              style={{ padding: '6px 12px', background: '#7090A8', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
              外面下雨了
            </button>
          </div>
        );
      case 'story-movie-weekend':
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('用户手动关闭了电视', { ...state, tvOn: false }); }}
              style={{ padding: '6px 12px', background: '#A39B96', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
              关闭电视
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('摄像头检测到用户在沙发上睡着了，且已超过15分钟，请静默执行设备控制（如调暗灯光调高温度）并简短播报'); }}
              style={{ padding: '6px 12px', background: '#8B7355', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              沙发睡着了
            </button>
          </div>
        );
      case 'story-food-reminder':
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('传感器显示冰箱门被打开，且用户在冰箱前停留超过10秒'); }}
              style={{ padding: '6px 12px', background: '#8FAF8A', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="8" y1="5" x2="8" y2="5.01"/><line x1="8" y1="14" x2="8" y2="14.01"/></svg>
              打开冰箱
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('厨房烟雾传感器数值轻微升高，提醒注意火候'); }}
              style={{ padding: '6px 12px', background: '#D4845A', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3M12 3v3M16 3v3"/><path d="M4 14a8 8 0 0 0 16 0"/><path d="M4 14h16"/></svg>
              厨房烟雾异常
            </button>
          </div>
        );
      case 'story-elderly-care':
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('时间到了中午12:30，该提醒奶奶吃降压药了', { ...state, time: 12.5 }); }}
              style={{ padding: '6px 12px', background: '#A89070', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              提醒吃药
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('摄像头检测到奶奶在沙发上久坐超过2小时未起身', { ...state, anomaly: true }); }}
              style={{ padding: '6px 12px', background: '#D95C41', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              久坐报警
            </button>
          </div>
        );
      case 'story-night-anomaly':
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('烟雾报警器触发警报', { ...state, anomaly: true }); }}
              style={{ padding: '6px 12px', background: '#D95C41', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              烟雾报警
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('门窗传感器显示主卧窗户被异常打开', { ...state, anomaly: true }); }}
              style={{ padding: '6px 12px', background: '#A39B96', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              窗户被打开
            </button>
          </div>
        );
      case 'story-leave-home':
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('门口摄像头检测到快递员正在按门铃'); }}
              style={{ padding: '6px 12px', background: '#7090A8', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              快递员上门
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('气象局发布暴雨预警，家中部分窗户未关，请主动操作关窗'); }}
              style={{ padding: '6px 12px', background: '#A39B96', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
              突降暴雨
            </button>
          </div>
        );
      case 'story-kid-home':
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('摄像头检测到小朋友走向厨房寻找食物'); }}
              style={{ padding: '6px 12px', background: '#7BB8D4', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              小孩去厨房
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onSimulateEvent('门口摄像头检测到陌生人按门铃，且小朋友独自在家'); }}
              style={{ padding: '6px 12px', background: '#D95C41', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              陌生人敲门
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      position: 'relative',
      background: '#FAFAFA',
      borderTop: '1px solid #F0EDE8',
      zIndex: 20,
    }}>
      {/* 默认折叠状态 (Header) */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: '#8B7D76', fontWeight: 500 }}>
            当前背景：{activeScene?.name || '环境状态模拟器'}
          </span>
          {renderActionButtons()}
        </div>
        <motion.svg 
          animate={{ rotate: expanded ? 180 : 0 }}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A39B96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </motion.svg>
      </button>

      {/* 展开面板 (只读状态展示) */}
      <AnimatePresence>
        {expanded && state && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0.5rem 1.5rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', color: '#6B6055' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#A39B96' }}>身份:</span>
                  <span>{activeScene?.tag?.includes('老人') || activeScene?.name?.includes('奶奶') ? '老人' : activeScene?.tag?.includes('小孩') || activeScene?.name?.includes('小孩') ? '小孩' : '爸爸/妈妈'}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#A39B96' }}>时间:</span>
                  <span>{formatTime(state.time)}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#A39B96' }}>季节:</span>
                  <span>{state.season || '未知'}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#A39B96' }}>位置:</span>
                  <span>{state.distance > 0 ? `距家 ${state.distance}米` : '在家'}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', gridColumn: '1 / -1' }}>
                  <span style={{ color: '#A39B96' }}>家中:</span>
                  <span>{getMembersText(state.members)}</span>
                </div>
                {state.tvOn && (
                  <div style={{ display: 'flex', gap: '8px', gridColumn: '1 / -1' }}>
                    <span style={{ color: '#A39B96' }}>电视:</span>
                    <span>播放中</span>
                  </div>
                )}
                {state.anomaly && (
                  <div style={{ display: 'flex', gap: '8px', gridColumn: '1 / -1' }}>
                    <span style={{ color: '#A39B96' }}>异常:</span>
                    <span style={{ color: '#D95C41' }}>检测到异常</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
