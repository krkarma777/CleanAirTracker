<script lang="ts">
    import { onMount } from 'svelte';
    import SeoulGeo from "./SeoulGeo.svelte";
    import { writable } from 'svelte/store';

    // 대기질 데이터 스토어 생성
    export let airQualityData = writable([]);

    // 대기 질 데이터를 서버에서 가져오는 함수
    async function fetchAirQuality(cityName: string) {
        try {
            const response = await fetch(`http://localhost:3000/api/air-quality/${ cityName }`);
            if (!response.ok) {
                throw new Error('대기 질 데이터를 불러오는 데 실패했습니다');
            }
            airQualityData.set(await response.json());
        } catch (error) {
            console.error('대기 질 데이터를 가져오는 중 에러가 발생했습니다:', error);
        }
    }

    let airQualityGradient = 'linear-gradient(to right, #27ae60, #2ecc71, #f1c40f, #f39c12, #e67e22, #d35400, #e74c3c, #c0392b, #8e44ad)';

    onMount(() => {
        fetchAirQuality('서울');
    });
</script>

<main>
    <h1>서울 시도별 대기오염 정보</h1>
    <div class="air-quality-gradient">
        <div class="labels">
            <span>Very Good</span>
            <span class="right-align">Very Bad</span>
        </div>
        <div class="gradient-bar" style="background: {airQualityGradient};"></div>
    </div>
    <div id="seoulMap">
        <SeoulGeo bind:airQualityData={airQualityData}/>
    </div>
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
</style>
