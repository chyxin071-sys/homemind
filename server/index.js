import { createServer } from 'node:http';
import { request as httpsRequest } from 'node:https';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SYSTEM_PROMPT } from '../src/data/homeMemory.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT || 8787);

function readEnvFile(fileName) {
  const filePath = path.join(projectRoot, fileName);
  if (!existsSync(filePath)) return {};

  return readFileSync(filePath, 'utf8')
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .reduce((acc, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return acc;
      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex === -1) return acc;

      const key = trimmed.slice(0, separatorIndex).trim();
      const rawValue = trimmed.slice(separatorIndex + 1).trim();
      acc[key] = rawValue.replace(/^['"]|['"]$/g, '');
      return acc;
    }, {});
}

const localEnv = {
  ...readEnvFile('.env'),
  ...readEnvFile('.env.local'),
};

function getEnvValue(key) {
  return process.env[key] || localEnv[key] || '';
}

function formatStateContext(simulatorState) {
  if (!simulatorState) return '';

  const memberLabels = { dad: '爸爸', mom: '妈妈', kid: '小孩' };
  const membersAtHome =
    Object.entries(simulatorState.members || {})
      .filter(([, isAtHome]) => Boolean(isAtHome))
      .map(([member]) => memberLabels[member] || member)
      .join('、') || '无人';

  const hours = Math.floor(simulatorState.time || 0);
  const minutes = String(Math.round(((simulatorState.time || 0) % 1) * 60)).padStart(2, '0');

  // 将附带状态的提示语调整为更加边缘和隐蔽的方式，彻底防止大模型喧宾夺主
  return `\n\n---
[系统静默状态数据：距家${simulatorState.distance}米，时间${hours}:${minutes}，在家成员：${membersAtHome}。以上状态为底层客观数据，如果与当前聊天话题无关，绝对不要在回复中提及这些状态。保持聊天的专注和连贯。]
[系统强制指令：作为智能系统，若你在此次回复中承诺执行任何物理设备控制（如开灯、关灯、启动洗衣机、调节温度、操作窗帘/电视等），你必须在回复的末尾加上对应的 [操作: xxx] 标签，否则前端UI无法联动。即使是多轮对话的后续，也不能忘记输出标签！]`;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(payload));
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const rawBody = Buffer.concat(chunks).toString('utf8');
  return rawBody ? JSON.parse(rawBody) : {};
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  if (req.url !== '/api/chat' || req.method !== 'POST') {
    sendJson(res, 404, { error: 'Not Found' });
    return;
  }

  const apiKey = getEnvValue('DEEPSEEK_API_KEY');
  const model = getEnvValue('DEEPSEEK_MODEL') || 'deepseek-chat';

  if (!apiKey || apiKey === 'your_deepseek_api_key_here') {
    sendJson(res, 500, { error: '未配置 DEEPSEEK_API_KEY，请先在 .env.local 中填写。' });
    return;
  }

  try {
    const { userMessage = '', conversationHistory = [], simulatorState = null } = await readJsonBody(req);

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: `${userMessage}${formatStateContext(simulatorState)}` },
    ];

    const postData = JSON.stringify({
      model,
      messages,
      temperature: 0.6, // 恢复正常温度，使其具有自然的人性化对话能力
      top_p: 0.8,
      presence_penalty: 0,
      max_tokens: 300,
      stream: false,
    });

    const options = {
      hostname: 'api.deepseek.com',
      port: 443,
      path: '/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(postData)
      },
      family: 4 // Force IPv4 to prevent IPv6 timeout issues in some environments
    };

    const apiReq = httpsRequest(options, (apiRes) => {
      let body = '';

      apiRes.on('data', (chunk) => {
        body += chunk;
      });

      apiRes.on('end', () => {
        try {
          const data = JSON.parse(body);

          if (apiRes.statusCode !== 200) {
            return sendJson(res, 500, { error: data.error?.message || 'DeepSeek 请求失败' });
          }

          const reply = data.choices?.[0]?.message?.content?.trim();
          if (!reply) {
            return sendJson(res, 500, { error: 'DeepSeek 未返回有效内容' });
          }

          sendJson(res, 200, { reply });
        } catch (parseError) {
          sendJson(res, 500, { error: '解析返回数据失败: ' + parseError.message });
        }
      });
    });

    apiReq.on('error', (error) => {
      console.error('DeepSeek API Request Error:', error);
      sendJson(res, 500, { error: '连接 API 失败: ' + error.message });
    });

    apiReq.write(postData);
    apiReq.end();
  } catch (error) {
    sendJson(res, 500, { error: error.message || '服务端请求失败' });
  }
});

server.listen(PORT, () => {
  console.log(`DeepSeek proxy is running at http://localhost:${PORT}`);
});
