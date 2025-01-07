<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <div class="app-container">
        <header>
            <h1>Mon CV</h1>
            <nav>
                <ul>
                    <li><a href="">Accueil</a></li>
                    <li><a href="">Connexion</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <RouterView />
        </main>
        <footer>&copy; 2024 -&nbsp;<b>flex57</b></footer>
    </div>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}
</style>
