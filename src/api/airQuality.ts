import express from 'express';
import axios from "axios";
require('dotenv').config();

const router = express.Router();

router.get('/:sidoName', async (req, res) => {
    const { sidoName } = req.params;
    const apiKey = process.env.API_KEY;
    console.log(apiKey);
    const url =
        `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${ apiKey }&returnType=json&numOfRows=100&pageNo=1&sidoName=${ encodeURIComponent(sidoName) }&ver=1.0`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
