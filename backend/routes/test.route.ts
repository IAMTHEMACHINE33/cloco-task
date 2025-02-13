import { Router, Request, Response } from 'express';
const router = Router()

router.get('/heartbeat', (req: Request, res: Response) => {
    res.status(200).json({
	status: 200,
	success: true,
	message: process.hrtime.bigint().toString(),
    })
})

export default router;
