import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World with TypeScript and Express!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
