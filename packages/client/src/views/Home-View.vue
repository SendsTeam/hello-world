<script setup lang="ts">
import MapContainer from '@/components/Map-Container.vue'
</script>

<template>
    <div class="home-container">
        <MapContainer></MapContainer>
    </div>
</template>

<style scoped>
.home-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
