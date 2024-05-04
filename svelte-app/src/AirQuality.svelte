<script lang="ts">
    import { onMount } from 'svelte';
    import SeoulGeo from "./SeoulGeo.svelte";
    import { writable } from 'svelte/store';

    // 대기질 데이터 스토어 생성
    export let airQualityData = writable([]);

    // 대기 질 데이터를 서버에서 가져오는 함수
    async function fetchAirQuality(cityName: string) {
        try {
            const response = await fetch(`http://localhost:3000/api/air-quality/${cityName}`);
            if (!response.ok) {
                throw new Error('대기 질 데이터를 불러오는 데 실패했습니다');
            }
            airQualityData.set(await response.json());
        } catch (error) {
            console.error('대기 질 데이터를 가져오는 중 에러가 발생했습니다:', error);
        }
    }

    onMount(() => {
        fetchAirQuality('서울');
    });
</script>

<svelte:head>
    <style>
        #tooltip {
            position: fixed;
            padding: 10px;
            background: white;
            border: 1px solid black;
            display: none;
            pointer-events: none;
            z-index: 1000;
        }
    </style>
</svelte:head>

<main>
    <h1>서울 시도별 대기오염 정보</h1>
    <div id="seoulMap">
        <SeoulGeo bind:airQualityData={airQualityData} />
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
</style>
