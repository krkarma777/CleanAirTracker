// airQuality.ts
import { Router } from 'express';
require('dotenv').config();

const router = Router();

// API 경로
router.get('/:name', (req, res) => {
    let name = req.params.name;

    res.json({ message: "Hello from Express API!" });
});

export default router;
