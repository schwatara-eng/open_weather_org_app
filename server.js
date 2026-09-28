// .env 파일 읽기
require('dotenv').config();

// Express 불러오기
const express = require('express');

const app = express();
const PORT = 3000;

// .env에서 OpenWeather API 키 가져오기
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;


// HTML, JS 같은 파일을 브라우저에 제공
app.use(express.static(__dirname));


// 브라우저에서 /weather 요청을 받음
app.get('/weather', (req, res) => {

    // script.js에서 보낸 도시 이름
    const city = req.query.city;

    // OpenWeather에 보낼 주소
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=kr&appid=${OPENWEATHER_API_KEY}`;

    // OpenWeather에 요청
    fetch(url)

        .then((response) => {

            if (!response.ok) {
                throw new Error(`OpenWeather 오류: ${response.status}`);
            }

            return response.json();
        })

        .then((data) => {

            // 받은 데이터를 브라우저로 전달
            res.json(data);
        })

        .catch((error) => {

            console.error(error);

            res.status(500).json({
                error: '날씨 정보를 가져오지 못했습니다.'
            });
        });
});


// 서버 시작
app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});