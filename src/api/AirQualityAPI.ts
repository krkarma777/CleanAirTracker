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

export default router;
