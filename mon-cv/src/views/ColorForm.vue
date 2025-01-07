<template>
    <div class="container" v-if="user && Object.keys(user).length > 0">
        <ProgressBar />
        <div>Choisissez vos couleurs préférées</div>
        <form @submit.prevent="next">
            <FormField
                v-for="field in fields"
                :key="field.name"
                :id="field.name"
                :label="field.label"
                :type="field.type"
                v-model:modelValue="user[field.name]"
                :rules="field.rules"
            />
            <div class="btn-nav">
                <ButtonField variant="secondary" size="lg" @click="prev">Retour</ButtonField>
                <ButtonField type="submit" size="lg" :disabled="!isValid">Continuer</ButtonField>
            </div>
        </form>
    </div>
</template>

<script setup>
import ButtonField from '@/components/FormButton.vue'
import FormField from '@/components/FormField.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import router from '@/router'
import { useUserStore } from '@/stores/userStore'
import { validationUtils } from '@/utils/validationUtils'
import { computed } from 'vue'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const rules = validationUtils.rules

const fields = [
    {
        name: 'color1',
        label: 'Couleur ',
        type: 'color-picker',
        rules: [rules.required],
    },
    {
        name: 'color2',
        label: 'Couleur 2',
        type: 'color-picker',
        rules: [rules.required],
    },
    {
        name: 'color3',
        label: 'Couleur 3',
        type: 'color-picker',
        rules: [rules.required],
    },
    {
        name: 'color4',
        label: 'Couleur 4',
        type: 'color-picker',
        rules: [rules.required],
    },
    {
        name: 'color5',
        label: 'Couleur 5',
        type: 'color-picker',
        rules: [rules.required],
    },
    {
        name: 'color6',
        label: 'Couleur 6',
        type: 'color-picker',
        rules: [rules.required],
    },
]

const isValid = computed(() =>
    fields.every((field) => !validationUtils.validateField(user.value[field.name], field.rules)),
)

const next = () => {
    if (isValid.value) {
        userStore.saveUser(user.value)
        router.push('/cv-preview')
    }
}

const prev = () => {
    userStore.saveUser(user.value)
    router.push('/experience-form')
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    max-width: 500px;
    padding: 0 2rem;
    min-width: 200px;
}
form {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;

    .form-group {
        display: grid;
        flex: 0 1 calc(25%);
    }

    .btn-nav {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
}
</style>
<style>
.vc-chrome {
    scale: 0.8;
}
</style>
