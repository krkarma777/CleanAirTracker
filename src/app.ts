// app.ts
import express from 'express';
import path from 'path';
import apiRouter from './api/api';  // api.ts에서 정의된 라우터를 가져옵니다.

const app = express();
const port = 3000;

// Svelte 앱의 빌드된 파일 위치를 지정합니다.
const buildPath = path.join(__dirname, '..', 'svelte-app', 'public');

// Svelte 앱의 정적 파일을 제공합니다.
app.use(express.static(buildPath));

// API 라우터를 사용합니다.
app.use('/api', apiRouter);  // '/api' 경로에 apiRouter를 연결합니다.

// 모든 GET 요청을 Svelte 앱으로 리다이렉트합니다.
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
