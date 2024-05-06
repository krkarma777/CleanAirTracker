<script lang="ts">
    import { onMount } from 'svelte';
    import SeoulGeo from "./SeoulGeo.svelte";
    import { writable } from 'svelte/store';

    // 대기질 데이터 스토어 생성
    export let airQualityData = writable([]);

    // 대기 질 데이터를 서버에서 가져오는 함수
    async function fetchAirQuality(cityName: string) {
        try {
            const response = await fetch(`https://cleanairtracker.kro.kr/api/air-quality/${ cityName }`);
            if (!response.ok) {
                throw new Error('대기 질 데이터를 불러오는 데 실패했습니다');
            }
            airQualityData.set(await response.json());
        } catch (error) {
            console.error('대기 질 데이터를 가져오는 중 에러가 발생했습니다:', error);
        }
    }

    let airQualityGradient = 'linear-gradient(to right, #27ae60, #2ecc71, #f1c40f, #f39c12, #e67e22, #d35400, #e74c3c, #c0392b, #8e44ad)';

    let currentDate = new Date();
    export let currentTime = writable(currentDate.toLocaleString());

    // 시간 업데이트 함수
    function updateTime() {
        const now = new Date();
        currentTime.set(now.toLocaleString());
    }

    onMount(() => {
        fetchAirQuality('서울');
        setInterval(updateTime, 1000);
    });
</script>

<main>
    <h1>서울 시도별 대기오염 정보</h1>
    <div class="center-align">
        <div class="air-quality-gradient" style="width: 50%;">
            <div class="labels">
                <span>매우 좋음</span>
                <span class="right-align">매우 나쁨</span>
            </div>
            <div class="gradient-bar" style="background: {airQualityGradient};"></div>
        </div>
    </div>
    <div class="hover-instruction">지역에 마우스를 올려 대기 질 상세 정보를 확인하세요.</div>
    <div id="seoulMap">
        <SeoulGeo bind:airQualityData={airQualityData}/>
    </div>
    <div class="center-align">
        <div class="notice">
            <strong>알림:</strong> 회색 지역은 현재 대기질 정보가 집계되지 않은 지역입니다.
        </div>
    </div>
    <p class="time-display">기준 시간: {$currentTime}</p>
</main>

<style>
    main {
        text-align: center;
        padding: 2rem;
        background-color: #f5f5f5;
        color: #333;
    }

    h1 {
        color: #4CAF50;
    }

    .air-quality-gradient {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .gradient-bar {
        width: 100%;
        height: 20px;
        border-radius: 5px;
        margin-top: 10px;
    }

    .labels {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .right-align {
        text-align: right;
    }

    .hover-instruction {
        margin-top: 10px;
        font-size: 14px;
        color: #666;
        text-align: center;
    }

    .notice {
        width: 30%;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .center-align {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
