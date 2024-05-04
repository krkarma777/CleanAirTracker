// AirQualityCron.ts
import cron from 'node-cron';
import { AirQualityService } from '../servicies/AirQualityService';

export class AirQualityCron {
    private airQualityService: AirQualityService;

    constructor(airQualityService: AirQualityService) {
        this.airQualityService = airQualityService;
    }

    public startCronJob(): void {
        // 데이터 삭제 후 크론 작업 시작
        this.airQualityService.deleteAllData().then(() => {
            console.log('All existing data has been deleted.');
        }).catch((error) => {
            console.error('Failed to delete data:', error);
        });

        // 매 10분마다 실행되는 크론 작업
        cron.schedule('*/10 * * * *', async () => {
            const apiKey = process.env.API_KEY;
            if (!apiKey) {
                console.error('API Key is undefined');
                return;
            }

            const sidoNames = ['서울']; // 시도 이름들 추가 예정
            for (const sidoName of sidoNames) {
                try {
                    const response = await this.airQualityService.fetchAirQualityData(apiKey, sidoName);
                    const items = response.data.response.body.items;
                    await this.airQualityService.saveAirQualityData(items);
                    console.log(`Data for ${ sidoName } has been successfully processed.`);
                } catch (error) {
                    console.error(`Error saving data for ${ sidoName }:`, error);
                }
            }
        });
    }
}
