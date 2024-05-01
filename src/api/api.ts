// api.ts
import { Router } from 'express';

const router = Router();

// API 경로
router.get('/data', (req, res) => {
    res.json({ message: "Hello from Express API!" });
});

export default router;
