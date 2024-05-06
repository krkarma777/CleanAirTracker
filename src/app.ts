import express from 'express';
import path from 'path';
import https from 'https';
import fs from 'fs';
import airQuality from './api/AirQualityAPI';
import { AirQualityCron } from "./schedule/AirQualityCron";
import { AppDataSource } from "./config/AppDataSource";
import { AirQualityService } from "./servicies/AirQualityService";

require('dotenv').config();

const app = express();
const port = 443;

const airQualityService = new AirQualityService(AppDataSource);
const airQualityCron = new AirQualityCron(airQualityService);

// HTTPS 인증서 및 개인 키를 로드하기 위해 fs 모듈을 사용합니다.
const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '../src', 'config', 'private.key')), // 개인 키 파일 경로
    cert: fs.readFileSync(path.join(__dirname, '../src', 'config', 'certificate.crt')), // SSL/TLS 인증서 파일 경로
    ca: fs.readFileSync(path.join(__dirname, '../src', 'config', 'ca_bundle.crt')) // 중간 인증 기관 (Intermediate CA) 파일 경로
};

// 시작할 때 크론 작업도 시작
airQualityCron.startCronJob();

// Svelte 앱의 빌드된 파일 위치를 지정합니다.
const buildPath = path.join(__dirname, '..', 'svelte-app', 'public');

// Svelte 앱의 정적 파일을 제공합니다.
app.use(express.static(buildPath));

// API 라우터를 사용합니다.
app.use('/api/air-quality', airQuality);  // '/api' 경로에 apiRouter를 연결합니다.

// 모든 GET 요청을 Svelte 앱으로 리다이렉트합니다.
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// HTTPS 서버 시작
https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Server is running on https://localhost:${ port }`);
});
