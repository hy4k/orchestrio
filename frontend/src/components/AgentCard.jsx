import React from 'react';

const StatusBadge = ({ status }) => {
    const statusConfig = {
        online: { color: 'bg-status-online', shadow: 'shadow-[0_0_5px_#28a745]' },
        offline: { color: 'bg-status-offline', shadow: '' },
        error: { color: 'bg-status-error', shadow: '' },
    };
    const config = statusConfig[status] || { color: 'bg-gray-500', shadow: '' };

    return (
        <div className='flex items-center gap-2 bg-black/20 px-2 py-1 rounded'>
            <div className={w-2.5 h-2.5 rounded-full  }></div>
            <span className="text-sm capitalize">{status}</span>
        </div>
    );
};

const AgentCard = ({ agent }) => {
    const tags = JSON.parse(agent.tags || '[]');
    return (
        <div className='bg-dark-card border border-[#333] rounded-lg p-6 shadow-lg hover:shadow-[0_6px_20px_rgba(0,169,157,0.2)] hover:-translate-y-1 transition-all duration-200'>
            <div className='flex justify-between items-start mb-4'>
                <div>
                    <h2 className='text-lg font-bold text-light-text'>{agent.name}</h2>
                    <p className='text-xs text-medium-text'>{agent.platform}</p>
                </div>
                <StatusBadge status={agent.status} />
            </div>
            <div>
                <p className='text-xs text-medium-text'>Host</p>
                <p className='text-sm font-mono break-all mb-4'>{agent.host}</p>
                <p className='text-xs text-medium-text'>Last Heartbeat</p>
                <p className='text-sm'>{agent.status === 'online' ? 'Just now' : agent.lastHeartbeat}</p>
            </div>
            {tags.length > 0 && (
                <div className='flex flex-wrap gap-2 mt-4'>
                    {tags.map(tag => <span key={tag} className='text-xs bg-[#333] text-teal-accent px-2 py-1 rounded-full'>{tag}</span>)}
                </div>
            )}
        </div>
    );
};

export default AgentCard;
