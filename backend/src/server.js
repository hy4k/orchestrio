import express from 'express';
import http from 'http';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import BetterSqlite3 from 'better-sqlite3';
import { randomUUID } from 'crypto';

const PORT = 3001;
const app = express();
const db = new BetterSqlite3('./data/orchestrio.db');

app.use(cors());
app.use(express.json());

// DB Init
db.exec(CREATE TABLE IF NOT EXISTS agents (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, platform TEXT, host TEXT NOT NULL,
    status TEXT DEFAULT 'unknown', lastHeartbeat TEXT, tags TEXT
));

// API Routes
app.get('/api/agents', (req, res) => {
    res.json(db.prepare('SELECT * FROM agents').all());
});

app.post('/api/agents', (req, res) => {
    const { name, platform, host, tags } = req.body;
    const id = randomUUID();
    db.prepare('INSERT INTO agents (id, name, platform, host, tags) VALUES (?, ?, ?, ?, ?)')
      .run(id, name, platform, host, JSON.stringify(tags || []));
    res.status(201).json({ id });
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const broadcastAgents = () => {
    const agents = db.prepare('SELECT * FROM agents').all();
    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(JSON.stringify({ type: 'agent-update', payload: agents }));
        }
    });
};

setInterval(broadcastAgents, 5000); // Broadcast status every 5 seconds

server.listen(PORT, () => console.log(Backend running on port ));
