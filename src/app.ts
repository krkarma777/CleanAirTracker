import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Svelte 앱의 빌드된 파일 위치를 지정합니다.
const buildPath = path.join(__dirname, '..', 'svelte-app', 'public');

// Svelte 앱의 정적 파일을 제공합니다.
app.use(express.static(buildPath));

// API 경로를 설정할 수 있습니다.
app.get('/api/data', (req, res) => {
    res.json({ message: "Hello from Express API!" });
});

// 모든 GET 요청을 Svelte 앱으로 리다이렉트합니다.
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
