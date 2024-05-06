<script lang="ts">
    import AirQuality from './AirQuality.svelte';
</script>

<main>
    <h1>Welcome to Clean Air Tracker</h1>
    <AirQuality/>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }

    @media (max-width: 480px) {
        h1 {
            display: none;
        }
    }
</style>