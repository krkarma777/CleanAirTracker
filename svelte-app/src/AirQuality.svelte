<script lang="ts">
    import { onMount } from 'svelte';
    let airQualityData = [];

    async function fetchAirQuality(cityName) {
        const response = await fetch(`http://localhost:3000/api/air-quality/${cityName}`);
        const data = await response.json();
        airQualityData = data.response.body.items;  // 데이터 경로 수정
    }

    onMount(() => {
        fetchAirQuality('서울'); // 예시 도시명
    });
</script>

<main>
    <h1>서울 시도별 대기오염 정보</h1>
    {#if airQualityData.length > 0}
        <ul>
            {#each airQualityData as data}
                <li>{data.stationName}: 공기 질 지수(KHAI) - {data.khaiValue}</li>
            {/each}
        </ul>
    {:else}
        <p>데이터를 불러오는 중입니다...</p>
    {/if}
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
    ul {
        list-style: none;
        padding: 0;
    }
    li {
        margin: 1rem 0;
        font-size: 1.2rem;
    }
</style>
