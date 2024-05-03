import axios from "axios";
import { DataSource } from 'typeorm';
import { AirQuality } from "../entity/AirQuality.entity";
import { IAirQuality } from "../entity/IAirQuality";

export class AirQualityService {
    constructor(private dataSource: DataSource) {
    }

    async fetchAirQualityData(apiKey: string, sidoName: string) {
        const url = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${ apiKey }&returnType=json&numOfRows=100&pageNo=1&sidoName=${ encodeURIComponent(sidoName) }&ver=1.0`;
        try {
            return await axios.get(url);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('Failed to fetch data');
        }
    }

    async getAirQualityData(sidoName: string) {
        const airQualityRepository = this.dataSource.getRepository(AirQuality);
        try {
            // 시도 이름에 따라 데이터베이스에서 데이터 검색
            const data = await airQualityRepository.find({
                where: { sidoName: sidoName }
            });
            return data;
        } catch (error) {
            console.error('Error retrieving data:', error);
            throw new Error('Failed to retrieve data');
        }
    }

    async saveAirQualityData(items: IAirQuality[]) {
        const airQualityRepository = this.dataSource.getRepository(AirQuality);
        return Promise.all(items.map(async (item) => {
            const existingData = await airQualityRepository.findOneBy({
                dataTime: item.dataTime,
                stationName: item.stationName
            });

            if (!existingData) {
                const airQuality = airQualityRepository.create(item);
                await airQualityRepository.save(airQuality);
            }
        }));
    }
}
