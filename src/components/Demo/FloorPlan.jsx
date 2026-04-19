import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  bg: '#F5F0E8',
  room: '#F7F3ED',
  roomPulse: '#EEE5D9',
  wall: '#B8AA98',
  furniture: '#C4B9AA',
  furnitureLine: '#CEC3B5',
  furnitureSoft: 'rgba(224, 215, 204, 0.18)',
  stroke: '#8B7B6A',
  text: '#9A8F82',
  warm: '#FFE4A0',
  warmAccent: '#D4845A',
  success: '#96BA8C',
  alert: '#E36C5B',
  tvGlow: '#CFE6F5',
  personDad: '#8B7355',
};

const ROOMS = {
  kitchen: { x: 84, y: 84, w: 220, h: 164, label: '厨房', light: { x: 194, y: 166, r: 112 } },
  living: { x: 304, y: 84, w: 376, h: 220, label: '客厅', light: { x: 492, y: 182, r: 170 } },
  bedroom: { x: 84, y: 248, w: 220, h: 180, label: '主卧', light: { x: 194, y: 338, r: 118 } },
  kidsRoom: { x: 84, y: 428, w: 220, h: 140, label: '儿童房', light: { x: 194, y: 498, r: 100 } },
  bathroom: { x: 304, y: 304, w: 156, h: 124, label: '卫生间', light: { x: 382, y: 366, r: 74 } },
  entrance: { x: 460, y: 304, w: 220, h: 124, label: '玄关', light: { x: 570, y: 366, r: 86 } },
  study: { x: 304, y: 428, w: 156, h: 140, label: '书房', light: { x: 382, y: 498, r: 80 } },
};

const PERSON_POSITIONS = {
  kitchen: { x: 194, y: 192 },
  living: { x: 520, y: 220 },
  bedroom: { x: 194, y: 360 },
  kidsRoom: { x: 194, y: 498 },
  bathroom: { x: 382, y: 382 },
  entrance: { x: 572, y: 382 },
  study: { x: 382, y: 498 },
};

function getLightColor(state) {
  switch (state) {
    case 'natural':
      return '#FFF6DA';
    case 'cinema':
      return '#FFC978';
    case 'alert':
      return '#FF8A70';
    default:
      return COLORS.warm;
  }
}

function isLightOn(state) {
  return state && state !== 'off';
}

function RoomFill({ roomKey, pulse, lightState, children }) {
  const room = ROOMS[roomKey];
  return (
    <g>
      <rect
        x={room.x}
        y={room.y}
        width={room.w}
        height={room.h}
        fill={pulse ? COLORS.roomPulse : COLORS.room}
        style={{ transition: 'fill 600ms cubic-bezier(0.4, 0, 0.2, 1)' }}
      />
      <circle
        cx={room.light.x}
        cy={room.light.y}
        r={room.light.r}
        fill={`url(#light-${roomKey})`}
        filter="url(#light-blur)"
        style={{
          opacity: isLightOn(lightState) ? 0.6 : 0,
          transition: isLightOn(lightState)
            ? 'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)'
            : 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      <circle cx={room.light.x} cy={room.light.y} r="6" fill={isLightOn(lightState) ? COLORS.warm : '#F1ECE6'} stroke={COLORS.wall} strokeWidth="1" />
      <text x={room.x + 16} y={room.y + 24} fill={COLORS.text} fontSize="12" fontWeight="600">
        {room.label}
      </text>
      {children}
    </g>
  );
}

function ActiveChip({ x, y, text, tone = 'neutral' }) {
  const width = Math.max(40, text.length * 11 + 16);
  const stroke = tone === 'alert' ? '#E8B8AF' : tone === 'success' ? '#BCD8B6' : '#E6DDD2';
  const fill = tone === 'alert' ? '#FFF5F2' : tone === 'success' ? '#F4FBF2' : 'rgba(247,243,237,0.96)';
  return (
    <g>
      <rect x={x} y={y - 12} width={width} height="18" rx="9" fill={fill} stroke={stroke} strokeWidth="0.8" />
      <text x={x + width / 2} y={y} textAnchor="middle" fill={COLORS.text} fontSize="10" fontWeight="600">
        {text}
      </text>
    </g>
  );
}

function Fridge({ status }) {
  const open = status === 'open';
  return (
    <g>
      <rect x="246" y="104" width="34" height="72" rx="6" fill="#FAF7F2" stroke={COLORS.stroke} strokeWidth="1.1" />
      <rect x={open ? 252 : 246} y="104" width="34" height="72" rx="6" fill="#FCF9F5" stroke={COLORS.stroke} strokeWidth="1.1" />
      <line x1={open ? 270 : 264} y1="116" x2={open ? 270 : 264} y2="164" stroke={COLORS.wall} strokeWidth="1.1" />
      {open && <circle cx="290" cy="112" r="3.5" fill={COLORS.warmAccent} />}
      {status === 'temperatureAlert' && (
        <circle cx="290" cy="112" r="8" fill="none" stroke={COLORS.alert} strokeWidth="1.4">
          <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

function RiceCooker({ status }) {
  return (
    <g>
      <ellipse cx="134" cy="126" rx="18" ry="12" fill="#F4EFEA" stroke={COLORS.stroke} strokeWidth="1" />
      <path d="M116 126 Q134 144 152 126" fill="#ECE4DB" stroke={COLORS.stroke} strokeWidth="1" />
      {status === 'done' && <circle cx="134" cy="126" r="4" fill={COLORS.success} />}
      {status === 'cooking' && (
        <g stroke={COLORS.warmAccent} strokeWidth="1.2" fill="none" strokeLinecap="round">
          <path d="M126 112 C124 104 130 100 128 92">
            <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" />
          </path>
          <path d="M138 112 C136 104 142 100 140 92">
            <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
          </path>
        </g>
      )}
    </g>
  );
}

function KitchenFixtures() {
  return (
    <g>
      <rect x="98" y="98" width="136" height="22" rx="6" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.2" />
      <rect x="98" y="120" width="22" height="78" rx="6" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.2" />
      <rect x="104" y="128" width="64" height="12" rx="4" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="104" y="152" width="8" height="30" rx="3" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="116" y="188" width="132" height="18" rx="5" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.2" />
      <circle cx="154" cy="108" r="8" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1.1" />
      <circle cx="182" cy="108" r="8" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1.1" />
      <rect x="135" y="102" width="34" height="12" rx="4" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1" />
    </g>
  );
}

function Sofa() {
  return (
    <g>
      <rect x="598" y="140" width="28" height="92" rx="7" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.2" />
      <rect x="592" y="146" width="40" height="16" rx="5" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="592" y="210" width="40" height="16" rx="5" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="594" y="134" width="36" height="12" rx="4" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="594" y="226" width="36" height="12" rx="4" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1" />
    </g>
  );
}

function Television({ on }) {
  return (
    <g>
      {on && <rect x="354" y="136" width="18" height="70" rx="8" fill={COLORS.tvGlow} filter="url(#soft-blur)" opacity="0.65" />}
      <rect x="360" y="142" width="10" height="60" rx="5" fill={on ? '#8DC7E8' : '#6B6560'} />
      <rect x="363" y="202" width="4" height="12" rx="2" fill={COLORS.wall} />
    </g>
  );
}

function CoffeeTable() {
  return (
    <g>
      <rect x="452" y="176" width="78" height="36" rx="10" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.2" />
      <rect x="468" y="188" width="46" height="12" rx="5" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1" />
    </g>
  );
}

function MediaConsole() {
  return (
    <g>
      <rect x="330" y="216" width="76" height="14" rx="4" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.1" />
      <rect x="340" y="220" width="18" height="6" rx="2" fill="none" stroke={COLORS.furnitureLine} strokeWidth="0.9" />
      <rect x="378" y="220" width="18" height="6" rx="2" fill="none" stroke={COLORS.furnitureLine} strokeWidth="0.9" />
    </g>
  );
}

function LivingRug() {
  return <rect x="420" y="148" width="180" height="96" rx="18" fill="none" stroke="#E5D9CA" strokeWidth="1.2" />;
}

function AirPurifier({ status }) {
  return (
    <g>
      <rect x="642" y="224" width="20" height="50" rx="10" fill="#F7F3EE" stroke={COLORS.stroke} strokeWidth="1.1" />
      {status === 'running' && (
        <g fill="none" stroke="#DDEBE4" strokeWidth="1.2">
          <circle cx="652" cy="214" r="8">
            <animate attributeName="r" values="8;20;26" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.35;0" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
    </g>
  );
}

function RobotVacuum({ status }) {
  if (status === 'cleaning') {
    return (
      <g>
        <path d="M616 278 C592 290 548 296 506 288 C470 280 446 260 430 238" fill="none" stroke="#D2C6B8" strokeWidth="1.4" strokeDasharray="5 6" opacity="0.85" />
        <motion.g
          initial={false}
          animate={{
            x: [0, -24, -72, -128, -150, -112, -56, 0],
            y: [0, 8, 18, 4, -18, -34, -16, 0],
            rotate: [0, 40, 90, 140, 200, 250, 310, 360],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '616px 278px' }}
        >
          <g transform="translate(616 278)">
            <circle cx="0" cy="0" r="12" fill="#F8F3EE" stroke={COLORS.stroke} strokeWidth="1.2" />
            <circle cx="0" cy="0" r="2.5" fill={COLORS.warmAccent} />
          </g>
        </motion.g>
      </g>
    );
  }

  return (
    <g>
      <rect x="604" y="286" width="24" height="6" rx="3" fill="#CBBDAE" />
      <circle cx="616" cy="272" r="12" fill="#F8F3EE" stroke={COLORS.stroke} strokeWidth="1.2" />
    </g>
  );
}

function WashingMachine({ status }) {
  return (
    <g>
      <rect x="344" y="352" width="44" height="44" rx="10" fill="#F8F5F0" stroke={COLORS.stroke} strokeWidth="1.2" />
      <motion.g
        animate={status === 'washing' ? { rotate: 360 } : { rotate: 0 }}
        transition={status === 'washing' ? { repeat: Infinity, duration: 1.4, ease: 'linear' } : { duration: 0.4 }}
        style={{ transformOrigin: '366px 374px' }}
      >
        <circle cx="366" cy="374" r="12" fill={status === 'done' ? COLORS.success : '#E8E2D9'} stroke={COLORS.stroke} strokeWidth="1.2" />
        <circle cx="366" cy="374" r="5" fill="#F7F2EC" />
      </motion.g>
      {status === 'done' && (
        <circle cx="366" cy="374" r="18" fill="none" stroke={COLORS.success} strokeWidth="1.5">
          <animate attributeName="opacity" values="0.95;0.15;0.95" dur="1.2s" repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

function WaterHeater({ status }) {
  return (
    <g>
      {status === 'heating' && (
        <ellipse cx="432" cy="322" rx="16" ry="10" fill={COLORS.warm} filter="url(#soft-blur)">
          <animate attributeName="opacity" values="0.25;0.6;0.25" dur="1.2s" repeatCount="indefinite" />
        </ellipse>
      )}
      <rect x="420" y="324" width="24" height="52" rx="10" fill="#F5F1EB" stroke={COLORS.stroke} strokeWidth="1" />
      {status === 'ready' && <circle cx="432" cy="366" r="4" fill={COLORS.success} />}
      {status === 'standby' && <circle cx="432" cy="366" r="3" fill="#D8CFC4" />}
    </g>
  );
}

function EntryDoor({ lockStatus }) {
  return (
    <g>
      <rect x="670" y="332" width="10" height="88" rx="5" fill="#EEE5DA" stroke={COLORS.stroke} strokeWidth="1" />
      <rect x="673" y="366" width="4" height="16" rx="2" fill={COLORS.stroke} />
      {lockStatus === 'locked' && <circle cx="675" cy="344" r="3" fill="#C8BBAA" />}
      {lockStatus === 'recognizing' && <circle cx="675" cy="344" r="4" fill={COLORS.warmAccent} opacity="0.75" />}
      {lockStatus === 'unlocking' && <circle cx="675" cy="344" r="4" fill={COLORS.success} />}
    </g>
  );
}

function BedroomFurniture() {
  return (
    <g>
      <rect x="110" y="314" width="104" height="78" rx="12" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.2" />
      <rect x="122" y="324" width="80" height="22" rx="8" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="110" y="346" width="104" height="36" rx="10" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="230" y="314" width="22" height="92" rx="6" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.1" />
      <rect x="218" y="332" width="14" height="20" rx="4" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="122" y="402" width="26" height="10" rx="4" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1" />
    </g>
  );
}

function BathroomFixtures() {
  return (
    <g>
      <rect x="316" y="320" width="20" height="72" rx="6" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.1" />
      <rect x="320" y="326" width="12" height="16" rx="4" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="310" y="404" width="42" height="8" rx="4" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="386" y="398" width="26" height="10" rx="4" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1" />
    </g>
  );
}

function EntranceFurniture() {
  return (
    <g>
      <rect x="492" y="326" width="54" height="22" rx="6" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.1" />
      <rect x="494" y="362" width="50" height="8" rx="3" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1" />
      <circle cx="508" cy="366" r="3" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1" />
      <circle cx="530" cy="366" r="3" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="580" y="332" width="44" height="72" rx="6" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.1" />
      <rect x="590" y="346" width="24" height="6" rx="2" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1" />
    </g>
  );
}

function KidsRoomFurniture() {
  return (
    <g>
      <rect x="110" y="444" width="70" height="96" rx="10" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.2" />
      <rect x="118" y="452" width="54" height="20" rx="6" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="110" y="478" width="70" height="30" rx="8" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="230" y="444" width="24" height="60" rx="6" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.1" />
      <rect x="220" y="460" width="16" height="16" rx="4" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1" />
    </g>
  );
}

function StudyFurniture() {
  return (
    <g>
      <rect x="320" y="444" width="80" height="30" rx="6" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.2" />
      <rect x="340" y="450" width="40" height="18" rx="4" fill="none" stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="350" y="480" width="20" height="16" rx="4" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1" />
      <rect x="320" y="520" width="124" height="24" rx="4" fill={COLORS.furnitureSoft} stroke={COLORS.furnitureLine} strokeWidth="1.2" />
    </g>
  );
}

function PersonMarker({ x, y, color, delay = 0 }) {
  return (
    <motion.g
      initial={false}
      animate={{ x, y }}
      transition={{
        x: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay },
        y: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay },
      }}
    >
      <circle cx="0" cy="-6" r="3" fill={color} />
      <ellipse cx="0" cy="2" rx="6" ry="7" fill={color} />
    </motion.g>
  );
}

export default function FloorPlan({ floorState }) {
  const [animatingRooms, setAnimatingRooms] = useState({});
  const lastStateRef = useRef(floorState);

  useEffect(() => {
    if (!floorState || !lastStateRef.current) {
      lastStateRef.current = floorState;
      return;
    }

    const prevDevices = lastStateRef.current.devices || {};
    const nextDevices = floorState.devices || {};
    const changedRooms = [];

    if (floorState.livingLight !== lastStateRef.current.livingLight) changedRooms.push('living');
    if (floorState.bedroomLight !== lastStateRef.current.bedroomLight) changedRooms.push('bedroom');
    if (floorState.kidsRoomLight !== lastStateRef.current.kidsRoomLight) changedRooms.push('kidsRoom');
    if (floorState.studyLight !== lastStateRef.current.studyLight) changedRooms.push('study');
    if (floorState.kitchenLight !== lastStateRef.current.kitchenLight) changedRooms.push('kitchen');
    if (floorState.entranceLight !== lastStateRef.current.entranceLight) changedRooms.push('entrance');
    if (prevDevices.robotVacuum !== nextDevices.robotVacuum || prevDevices.airPurifier !== nextDevices.airPurifier || prevDevices.tv !== nextDevices.tv) changedRooms.push('living');
    if (prevDevices.riceCooker !== nextDevices.riceCooker || prevDevices.fridge !== nextDevices.fridge) changedRooms.push('kitchen');
    if (prevDevices.washingMachine !== nextDevices.washingMachine || prevDevices.waterHeater !== nextDevices.waterHeater) changedRooms.push('bathroom');
    if (prevDevices.doorLock !== nextDevices.doorLock) changedRooms.push('entrance');

    if (changedRooms.length > 0) {
      const uniqueRooms = [...new Set(changedRooms)];
      const nextAnimating = { ...animatingRooms };
      uniqueRooms.forEach((room) => {
        nextAnimating[room] = true;
      });
      setAnimatingRooms(nextAnimating);

      const timers = uniqueRooms.map((room) =>
        window.setTimeout(() => {
          setAnimatingRooms((prev) => ({ ...prev, [room]: false }));
        }, 900),
      );

      lastStateRef.current = floorState;
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }

    lastStateRef.current = floorState;
    return undefined;
  }, [floorState]);

  if (!floorState) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '14px', color: '#D4C9B8', letterSpacing: '0.05em' }}>平面图加载中...</span>
      </div>
    );
  }

  const devices = floorState.devices || {};
  const bathroomLight =
    floorState.bathroomLight ||
    (devices.washingMachine === 'washing' || devices.washingMachine === 'done' || devices.waterHeater === 'heating' || devices.waterHeater === 'ready'
      ? 'warm'
      : 'off');
  const roomLights = {
    kitchen: floorState.kitchenLight,
    living: floorState.livingLight,
    bedroom: floorState.bedroomLight,
    kidsRoom: floorState.kidsRoomLight,
    bathroom: bathroomLight,
    entrance: floorState.entranceLight,
    study: floorState.studyLight,
  };
  const tvOn = devices.tv === 'on' || floorState.livingLight === 'cinema';

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 2rem' }}>
      <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" style={{ maxWidth: '820px', maxHeight: '620px' }}>
        <defs>
          <filter id="light-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter id="soft-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          {Object.entries(ROOMS).map(([key, room]) => (
            <radialGradient key={key} id={`light-${key}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={getLightColor(roomLights[key])} stopOpacity="1" />
              <stop offset="100%" stopColor={getLightColor(roomLights[key])} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        <rect x="0" y="0" width="800" height="600" rx="28" fill={COLORS.bg} />

        <RoomFill roomKey="kitchen" pulse={animatingRooms.kitchen} lightState={roomLights.kitchen}>
          <KitchenFixtures />
          <Fridge status={devices.fridge} />
          <RiceCooker status={devices.riceCooker} />
          {devices.fridge === 'open' && <ActiveChip x={226} y={194} text="冰箱门未关" tone="alert" />}
          {devices.fridge === 'temperatureAlert' && <ActiveChip x={214} y={194} text="冰箱温度异常" tone="alert" />}
          {devices.riceCooker === 'cooking' && <ActiveChip x={98} y={100} text="电饭锅烹饪中" />}
          {devices.riceCooker === 'done' && <ActiveChip x={108} y={100} text="米饭已煮好" tone="success" />}
        </RoomFill>

        <RoomFill roomKey="living" pulse={animatingRooms.living} lightState={roomLights.living}>
          <LivingRug />
          <Sofa />
          <Television on={tvOn} />
          <MediaConsole />
          <CoffeeTable />
          <AirPurifier status={devices.airPurifier} />
          <RobotVacuum status={devices.robotVacuum} />
          {devices.airPurifier === 'running' && <ActiveChip x={590} y={214} text="净化中" />}
          {devices.robotVacuum === 'cleaning' && <ActiveChip x={528} y={274} text="清扫中" />}
          {tvOn && <ActiveChip x={330} y={132} text="影院模式" />}
        </RoomFill>

        <RoomFill roomKey="bedroom" pulse={animatingRooms.bedroom} lightState={roomLights.bedroom}>
          <BedroomFurniture />
        </RoomFill>

        <RoomFill roomKey="bathroom" pulse={animatingRooms.bathroom} lightState={roomLights.bathroom}>
          <BathroomFixtures />
          <WashingMachine status={devices.washingMachine} />
          <WaterHeater status={devices.waterHeater} />
          {devices.washingMachine === 'washing' && <ActiveChip x={314} y={344} text="洗衣中" />}
          {devices.washingMachine === 'done' && <ActiveChip x={308} y={344} text="衣服洗好了" tone="success" />}
          {devices.waterHeater === 'heating' && <ActiveChip x={386} y={392} text="加热中" />}
          {devices.waterHeater === 'ready' && <ActiveChip x={348} y={392} text="热水已准备好" tone="success" />}
        </RoomFill>

        <RoomFill roomKey="entrance" pulse={animatingRooms.entrance} lightState={roomLights.entrance}>
          <EntryDoor lockStatus={devices.doorLock} />
          <EntranceFurniture />
          {devices.doorLock === 'recognizing' && <ActiveChip x={602} y={326} text="识别中" />}
          {devices.doorLock === 'unlocking' && <ActiveChip x={602} y={326} text="门锁已开" tone="success" />}
        </RoomFill>

        <RoomFill roomKey="kidsRoom" pulse={animatingRooms.kidsRoom} lightState={roomLights.kidsRoom}>
          <KidsRoomFurniture />
        </RoomFill>

        <RoomFill roomKey="study" pulse={animatingRooms.study} lightState={roomLights.study}>
          <StudyFurniture />
        </RoomFill>

        <g fill="#C9BCAA" opacity="0.82">
          <rect
            x="664"
            y="118"
            width="12"
            height="76"
            rx="6"
            style={{
              transformOrigin: '670px 156px',
              transform: `scaleY(${floorState.curtainOpen ? 0.25 : 1})`,
              transition: 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <rect
            x="680"
            y="118"
            width="12"
            height="76"
            rx="6"
            style={{
              transformOrigin: '686px 156px',
              transform: `scaleY(${floorState.curtainOpen ? 0.25 : 1})`,
              transition: 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </g>

        <path d="M84 84 H680 V428 H460 V568 H84 Z" fill="none" stroke={COLORS.wall} strokeWidth="3" strokeLinejoin="round" />
        <path d="M304 84 V568" stroke={COLORS.wall} strokeWidth="3" />
        <path d="M84 248 H304" stroke={COLORS.wall} strokeWidth="3" />
        <path d="M84 428 H304" stroke={COLORS.wall} strokeWidth="3" />
        <path d="M304 304 H680" stroke={COLORS.wall} strokeWidth="3" />
        <path d="M460 304 V428" stroke={COLORS.wall} strokeWidth="3" />
        <path d="M304 428 H460" stroke={COLORS.wall} strokeWidth="3" />

        <rect x="304" y="144" width="3" height="58" fill={COLORS.bg} />
        <rect x="304" y="334" width="3" height="52" fill={COLORS.bg} />
        <rect x="370" y="304" width="56" height="3" fill={COLORS.bg} />
        <rect x="538" y="304" width="62" height="3" fill={COLORS.bg} />
        <rect x="678" y="348" width="3" height="54" fill={COLORS.bg} />
        <rect x="230" y="426" width="48" height="4" fill={COLORS.bg} />
        <rect x="304" y="460" width="3" height="48" fill={COLORS.bg} />

        {(floorState.personPositions || []).map((person, index) => {
          const base = PERSON_POSITIONS[person.room] || PERSON_POSITIONS.entrance;
          return (
            <PersonMarker
              key={person.id}
              x={base.x + index * 14}
              y={base.y + (index % 2) * 8}
              delay={index * 0.04}
              color={person.color || COLORS.personDad}
            />
          );
        })}

        {floorState.anomaly && (
          <g>
            <circle cx="504" cy="210" r="12" fill={COLORS.alert} opacity="0.85" />
            <circle cx="504" cy="210" r="12" fill="none" stroke={COLORS.alert} strokeWidth="1.6">
              <animate attributeName="r" values="12;56" dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.95;0" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="504" cy="210" r="12" fill="none" stroke={COLORS.alert} strokeWidth="1.6">
              <animate attributeName="r" values="12;56" begin="0.5s" dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.95;0" begin="0.5s" dur="1s" repeatCount="indefinite" />
            </circle>
          </g>
        )}
      </svg>
    </div>
  );
}
