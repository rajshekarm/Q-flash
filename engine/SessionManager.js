import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', err => console.error('Redis Client Error', err));
await client.connect();

export const getSession = async (phoneNumber) => {
    const data = await client.get(`session:${phoneNumber}`);
    return data ? JSON.parse(data) : [];
};

export const updateSession = async (phoneNumber, role, content) => {
    const history = await getSession(phoneNumber);
    history.push({ role, content });
    
    // Keep last 10 messages and set 24-hour expiry to save memory
    const updatedHistory = history.slice(-10);
    await client.setEx(`session:${phoneNumber}`, 86400, JSON.stringify(updatedHistory));
};