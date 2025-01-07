<template>
    <div class="container">
        <h1>Bienvenue sur l'outil de création de CV</h1>
        <p>Créez un CV professionnel en quelques étapes simples.</p>
        <FormButton size="lg" @click="router.push('/user-form')">Commencer</FormButton>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import FormButton from '@/components/FormButton.vue'

const router = useRouter()

sessionStorage.setItem('user', '')
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    max-width: 1000px;
    padding: 3rem 2rem;
    min-width: 200px;
}
</style>
