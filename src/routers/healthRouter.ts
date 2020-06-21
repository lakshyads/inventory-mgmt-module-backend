// Initialize router
import express from 'express';

const HealthRouter = express.Router();

// Routes -----------------------------

HealthRouter.get(('/api/health'), async (req: express.Request, res: express.Response) => {
    res.status(200).send('Ok');
})

HealthRouter.get('/api/readiness', async (req: express.Request, res: express.Response) => {
    res.status(200).send('Ok');
})

// ------------------------------------
export default HealthRouter;
