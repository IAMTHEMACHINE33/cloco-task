import { Router, Request, Response } from 'express';
import { db } from '../connections/postgres.connection';
const router = Router()

router.get('/heartbeat', (req: Request, res: Response) => {
    res.status(200).json({
	status: 200,
	success: true,
	message: process.hrtime.bigint().toString(),
    })
})

router.get('/check-db-connection', async (req: Request, res: Response) => {
    try {
	const client = await db.connect();
	client.release();
	res.status(200).json({success: true, connected: true})
    } catch(e) {
	res.status(500).json({success: false, connected: false})
    }
})

export default router;
