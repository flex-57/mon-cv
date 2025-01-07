<template>
    <div class="progress-bar">
        <div class="progress" :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Total des étapes
const totalSteps = 3

// Étape actuelle basée sur meta.step
const currentStep = computed(() => route.meta.step || 1)
</script>

<style scoped>
.progress-bar {
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;
}
.progress {
    height: 100%;
    background-color: var(--success);
    transition: width 0.3s ease-in-out;
}
</style>
