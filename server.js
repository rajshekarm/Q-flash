import express from 'express';
import bodyParser from 'body-parser';
import twilio from 'twilio';
import { getSession, updateSession } from './engine/SessionManager.js';
import { processQuery } from './engine/QueryEngine.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', async (req, res) => {
    const { Body, From } = req.body;
    const twiml = new twilio.twiml.MessagingResponse();

    try {
        // 1. Fetch History from Redis
        const history = await getSession(From);

        // 2. Generate AI Response (Using your LLM logic)
        const aiReply = await processQuery(Body, history);

        // 3. Persist State across the cluster
        await updateSession(From, "user", Body);
        await updateSession(From, "assistant", aiReply);

        twiml.message(aiReply);
    } catch (error) {
        console.error("Query Engine Error:", error);
        twiml.message("Sorry, I'm having trouble processing that right now.");
    }

    res.type('text/xml').send(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));