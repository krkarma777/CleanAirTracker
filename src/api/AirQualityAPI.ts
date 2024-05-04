import express from 'express';
import { AirQualityService } from '../servicies/AirQualityService';
import { AppDataSource } from "../config/AppDataSource";

require('dotenv').config();

const router = express.Router();

const airQualityService = new AirQualityService(AppDataSource);

router.get('/:sidoName', async (req, res) => {
    const { sidoName } = req.params;

    try {
        const data = await airQualityService.getAirQualityData(sidoName);
        if (data.length > 0) {
            res.json(data);
        } else {
            res.status(404).json({ message: 'No data found for the specified city.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/:sidoName', async (req, res) => {
    const { sidoName } = req.params;
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "API Key is undefined" });
    }

    try {
        const response = await airQualityService.fetchAirQualityData(apiKey, sidoName);
        const items = response.data.response.body.items;
        await airQualityService.saveAirQualityData(items);
        res.json({ message: 'Data has been successfully processed.' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
