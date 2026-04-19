// DemoSection.jsx — 100vh 沉浸式布局
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloorPlan from './FloorPlan';
import AIChat from './AIChat';
import StateSimulator from './StateSimulator';
import ChatInput from './ChatInput';
import StorySelector from './StorySelector';
import { useClaudeAPI } from '../../hooks/useClaudeAPI';

export default function DemoSection() {
  const [activeScene, setActiveScene] = useState(null);
  const [messages, setMessages] = useState([]);
  const [simulatorState, setSimulatorState] = useState(null);
  const [floorState, setFloorState] = useState(null);
  const [actionToasts, setActionToasts] = useState([]);
  const { sendMessage, isLoading } = useClaudeAPI();
  const historyRef = useRef([]);

  const addToast = (text) => {
    const id = Date.now() + Math.random();
    setActionToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setActionToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const extractAndTriggerActions = (aiText) => {
    const actionRegex = /\[操作:\s*([^\]]+)\]/g;
    let match;
    let found = false;
    while ((match = actionRegex.exec(aiText)) !== null) {
      const action = match[1].trim();
      addToast(action);
      found = true;
      
      // 解析动作并实时更新平面图状态
      setFloorState(prev => {
        if (!prev) return prev;
        const next = { ...prev, devices: { ...prev.devices } };
        
        if (action.includes('开') && action.includes('灯')) {
          if (action.includes('客厅')) next.livingLight = 'warm';
          else if (action.includes('主卧')) next.bedroomLight = 'warm';
          else if (action.includes('卧室')) next.bedroomLight = 'warm';
          else if (action.includes('儿童')) next.kidsRoomLight = 'warm';
          else if (action.includes('书房')) next.studyLight = 'warm';
          else if (action.includes('厨房')) next.kitchenLight = 'warm';
          else if (action.includes('走廊') || action.includes('玄关')) next.entranceLight = 'warm';
          else {
            next.livingLight = 'warm'; next.bedroomLight = 'warm'; next.kitchenLight = 'warm'; next.entranceLight = 'warm'; next.kidsRoomLight = 'warm'; next.studyLight = 'warm';
          }
        }
        if (action.includes('关') && action.includes('灯')) {
          if (action.includes('客厅')) next.livingLight = 'off';
          else if (action.includes('主卧')) next.bedroomLight = 'off';
          else if (action.includes('卧室')) next.bedroomLight = 'off';
          else if (action.includes('儿童')) next.kidsRoomLight = 'off';
          else if (action.includes('书房')) next.studyLight = 'off';
          else if (action.includes('厨房')) next.kitchenLight = 'off';
          else if (action.includes('走廊') || action.includes('玄关')) next.entranceLight = 'off';
          else {
            next.livingLight = 'off'; next.bedroomLight = 'off'; next.kitchenLight = 'off'; next.entranceLight = 'off'; next.kidsRoomLight = 'off'; next.studyLight = 'off';
          }
        }
        if (action.includes('开') && action.includes('空调')) next.acOn = true;
        if (action.includes('关') && action.includes('空调')) next.acOn = false;
        if (action.includes('开') && action.includes('窗帘')) next.curtainOpen = true;
        if (action.includes('关') && action.includes('窗帘')) next.curtainOpen = false;
        if (action.includes('电视')) {
          if (action.includes('开')) setSimulatorState(s => ({ ...s, tvOn: true }));
          if (action.includes('关')) setSimulatorState(s => ({ ...s, tvOn: false }));
        }
        if (action.includes('扫地机器人')) {
          if (action.includes('扫') || action.includes('启动')) next.devices.robotVacuum = 'cleaning';
          if (action.includes('充') || action.includes('停')) next.devices.robotVacuum = 'charging';
        }
        if (action.includes('洗衣机')) {
          if (action.includes('洗') || action.includes('启动')) next.devices.washingMachine = 'washing';
          if (action.includes('停')) next.devices.washingMachine = 'standby';
        }
        if (action.includes('热水器')) {
          if (action.includes('热') || action.includes('启动')) next.devices.waterHeater = 'heating';
          if (action.includes('停')) next.devices.waterHeater = 'standby';
        }

        // 人员位置变化联动
        if (action.includes('进入玄关')) {
          next.personPositions = [{ id: 'dad', room: 'entrance', color: '#8B7355' }];
        } else if (action.includes('小朋友') && action.includes('进入儿童房')) {
          next.personPositions = [{ id: 'kid', room: 'kidsRoom', color: '#8DC7E8' }];
        } else if (action.includes('妈妈') && action.includes('进入厨房')) {
          next.personPositions = [{ id: 'mom', room: 'kitchen', color: '#C4956A' }];
        } else if (action.includes('进入书房')) {
          next.personPositions = [{ id: 'dad', room: 'study', color: '#8B7355' }];
        }

        return next;
      });
    }
    return found;
  };

  const handleSceneSelect = async (scene) => {
    setActiveScene(scene);
    setMessages([]);
    historyRef.current = [];
    setSimulatorState(scene.defaultState);
    setFloorState(scene.floorPlanState);

    // Add proactive message
    const proactiveMsg = { type: 'proactive', content: scene.proactiveMessage };
    setMessages([proactiveMsg]);
    historyRef.current = [{ role: 'assistant', content: scene.proactiveMessage }];
  };

  const handleUserSend = async (text) => {
    if (isLoading) return;

    const userMsg = { type: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    historyRef.current = [...historyRef.current, { role: 'user', content: text }];

    let aiText = '';
    setMessages((prev) => [...prev, { type: 'reply', content: '' }]);

    await sendMessage(text, historyRef.current.slice(0, -1), simulatorState, (chunk) => {
      aiText += chunk;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { type: 'reply', content: aiText };
        return updated;
      });
    });

    extractAndTriggerActions(aiText);
    historyRef.current = [...historyRef.current, { role: 'assistant', content: aiText }];
  };

  const handleSimulateEvent = async (eventText, newSimulatorState) => {
    if (isLoading) return;

    if (newSimulatorState) {
      setSimulatorState(newSimulatorState);
    }

    let aiText = '';
    setMessages((prev) => [...prev, { type: 'reply', content: '' }]);

    await sendMessage(`[系统事件接入]：${eventText}。请作为AI智能系统做出符合逻辑的客观播报或设备控制。严禁人类角色扮演，严禁描写你无法做到的物理动作或感官（如听到、看到）。`, historyRef.current, newSimulatorState || simulatorState, (chunk) => {
      aiText += chunk;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { type: 'reply', content: aiText };
        return updated;
      });
    });

    extractAndTriggerActions(aiText);
    // 把这句主动关怀转成 proactive 样式，并加入历史记录
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { type: 'proactive', content: aiText };
      return updated;
    });
    historyRef.current = [...historyRef.current, { role: 'assistant', content: aiText }];
  };

  return (
    <section id="demo" style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex',
      overflow: 'hidden',
      background: '#FFFFFF',
      position: 'relative',
      scrollSnapAlign: 'start',
    }}>
      <AnimatePresence mode="wait">
        {!activeScene ? (
          <StorySelector key="story-selector" onSelect={handleSceneSelect} />
        ) : (
          <motion.div
            key="main-demo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {/* Left: Floor Plan (65%) */}
            <div 
              style={{
                width: '65%',
                height: '100%',
                background: '#F5F0E8',
                display: 'flex',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                fontSize: '12px',
                fontWeight: 800,
                color: '#8B7355',
                letterSpacing: '-0.03em',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <button
                  onClick={() => setActiveScene(null)}
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#8B7355',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                    e.currentTarget.style.transform = 'translateX(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  重新选择场景
                </button>
                <span>HomeMind</span>
              </div>

              <div style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* 执行弹幕 (Action Toasts) */}
                <div style={{
                  position: 'absolute',
                  top: '15%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 50,
                  pointerEvents: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  alignItems: 'center'
                }}>
                  <AnimatePresence>
                    {actionToasts.map(t => (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        style={{
                          background: 'rgba(61, 53, 48, 0.75)',
                          backdropFilter: 'blur(12px)',
                          color: '#FFF',
                          padding: '10px 20px',
                          borderRadius: '24px',
                          fontSize: '14px',
                          fontWeight: 500,
                          letterSpacing: '0.02em',
                          boxShadow: '0 8px 24px rgba(61, 53, 48, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8956D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        执行: {t.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                {floorState && <FloorPlan floorState={floorState} />}
              </div>
            </div>

            {/* Right: Interaction Panel (35%) */}
            <div style={{
              width: '35%',
              height: '100%',
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid #F0EDE8',
              position: 'relative',
            }}>
              {/* Middle: AI Chat (占据主要空间) */}
              <AIChat 
                messages={messages} 
                isLoading={isLoading} 
                suggestions={messages.length === 1 && messages[0].type === 'proactive' ? activeScene.suggestions : []}
                onSuggestionClick={(text) => handleUserSend(text)}
              />

              {/* Bottom: Simulator Drawer & Input */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <StateSimulator state={simulatorState} activeScene={activeScene} onSimulateEvent={handleSimulateEvent} />
                <ChatInput onSend={handleUserSend} disabled={isLoading} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
