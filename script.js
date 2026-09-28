// 화면 요소 가져오기
const logBox = document.getElementById('logBox');
const resultCard = document.getElementById('resultCard');
const cityNameEl = document.getElementById('cityName');
const cityTempEl = document.getElementById('cityTemp');
const cityExtraEl = document.getElementById('cityExtra');


// 로그 출력 함수
function log(msg) {
    const time = new Date().toLocaleTimeString();
    logBox.textContent += `\n[${time}] ${msg}`;
    logBox.scrollTop = logBox.scrollHeight;
}


// 로그 초기화
function clearLog() {
    logBox.textContent = '➤ 콘솔이 초기화되었습니다.';
}


// 버튼 클릭
document.getElementById('btnFetch').addEventListener('click', () => {

    // HTML select에서 선택한 도시 가져오기
    const cityKey = document.getElementById('citySelect').value;

    // 우리 Node.js 서버에 날씨 요청
    const url = `/weather?city=${cityKey}`;

    log(`1. fetch() 주문서 발송: ${cityKey}`);

    fetch(url)

        .then((response) => {

            log(`2. 서버 응답 도착 (HTTP 상태 코드: ${response.status})`);

            if (!response.ok) {
                throw new Error(`HTTP 에러 발생: ${response.status}`);
            }

            return response.json();
        })


        .then((data) => {

            // 받은 JSON 확인
            console.log(data);

            // OpenWeather는 data.main 안에 기온/습도가 있음
            const temp = data.main.temp;
            const humidity = data.main.humidity;
            const wind = data.wind.speed;

            log(
                `3. JSON 변환 완료! 기온: ${temp}℃ / 습도: ${humidity}% / 풍속: ${wind}m/s`
            );

            // 화면에 표시
            cityNameEl.textContent = data.name;
            cityTempEl.textContent = `${temp} ℃`;
            cityExtraEl.textContent =
                `습도: ${humidity}% | 풍속: ${wind} m/s`;

            resultCard.classList.remove('d-none');
        })


        .catch((error) => {

            log(`❌ 에러 발생: ${error.message}`);
            alert(`날씨 정보를 가져오지 못했습니다: ${error.message}`);
        })


        .finally(() => {

            log('4. fetch 요청 사이클 완료');
        });
});