import express from 'express';
import axios from "axios";
import { AirQuality } from "../entity/AirQuality.entity";
import { IAirQuality } from "../entity/IAirQuality";
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(require("../../ormconfig.json"));
AppDataSource.initialize().then(() => {
    console.log('Data Source has been initialized!')
}).catch((err) => {
    console.error('Error during Data Source initialization:', err)
});

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

router.post('/:sidoName', async (req, res) => {
    const { sidoName } = req.params;
    const apiKey = process.env.API_KEY;
    const url = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${ apiKey }&returnType=json&numOfRows=100&pageNo=1&sidoName=${ encodeURIComponent(sidoName) }&ver=1.0`;

    try {
        const response = await axios.get(url);
        const items = response.data.response.body.items;
        const airQualityRepository = AppDataSource.getRepository(AirQuality);

        await Promise.all(items.map(async (item: IAirQuality) => {
            // 이미 데이터가 있는지 확인
            const existingData = await airQualityRepository.findOneBy({
                dataTime: item.dataTime,
                stationName: item.stationName
            });

            if (!existingData) {
                // 데이터가 없으면 새로 생성
                const airQuality = airQualityRepository.create(item);
                await airQualityRepository.save(airQuality);
            }
        }));

        res.json({ message: 'Data has been successfully processed.' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
