import React, { useState, useEffect } from 'react';
import AgentCard from './components/AgentCard';

function App() {
    const [agents, setAgents] = useState([
        { id: 1, name: 'Email-Ops-Primary', platform: 'VPS', host: 'http://123.45.67.89:8000', status: 'online', tags: '["email-ops", "primary"]', lastHeartbeat: new Date().toISOString() },
        { id: 2, name: 'Scraper-Node-Alpha', platform: 'Local Machine', host: 'http://192.168.1.101:8000', status: 'offline', tags: '["scraping", "alpha"]', lastHeartbeat: '1 hour ago' },
        { id: 3, name: 'Calendar-Sync', platform: 'VPS', host: 'http://98.76.54.32:8000', status: 'error', tags: '["calendar"]', lastHeartbeat: '2 minutes ago' },
    ]);

    return (
        <div className="container mx-auto p-8">
            <header className="flex justify-between items-center border-b-2 border-dark-card pb-4 mb-8">
                <h1 className="text-teal-accent text-3xl font-bold" style={{ textShadow: '0 0 5px rgba(0, 169, 157, 0.5)' }}>ORCHESTRIO HQ</h1>
                <div className="flex gap-6 text-right">
                    <div className="text-sm"><span className="text-2xl font-bold block">{agents.length}</span>AGENTS</div>
                    <div className="text-sm"><span className="text-2xl font-bold block">{agents.filter(a => a.status === 'online').length}</span>ONLINE</div>
                </div>
            </header>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
            </main>
        </div>
    );
}

export default App;
