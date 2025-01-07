<template>
    <div class="container">
        <ProgressBar />
        <form @submit.prevent="next">
            <FormField
                v-for="field in fields"
                :key="field.name"
                :id="field.name"
                :label="field.label"
                :type="field.type"
                v-model:modelValue="user[field.name]"
                :rules="field.rules"
                :options="field.options"
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
        name: 'job',
        label: 'Emploi',
        type: 'text',
        rules: [rules.required],
    },
    {
        name: 'company',
        label: 'Entreprise',
        type: 'text',
        rules: [rules.required, rules.minLength(2)],
    },
    {
        name: 'place',
        label: 'Lieu',
        type: 'text',
        rules: [rules.required, rules.minLength(2)],
    },
    {
        name: 'contract',
        label: 'Type de contrat',
        type: 'select',
        rules: [rules.required],
        options: [
            { label: 'CDI' },
            { label: 'CDD' },
            { label: 'Apprentissage' },
            { label: 'Stage' },
        ],
    },

    {
        name: 'start',
        label: 'Date début',
        type: 'date',
        rules: [rules.required, rules.date],
    },
    {
        name: 'end',
        label: 'Date fin',
        type: 'date',
        rules: [rules.required, rules.date],
    },
    {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        rules: [],
    },
]

const isValid = computed(() =>
    fields.every((field) => !validationUtils.validateField(user.value[field.name], field.rules)),
)

const next = () => {
    if (isValid.value) {
        userStore.saveUser(user.value)
        router.push('/color-form')
    }
}

const prev = () => {
    userStore.saveUser(user.value)
    router.push('/user-form')
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    max-width: 1000px;
    padding: 0 2rem;
    min-width: 200px;
}
form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
    gap: 1.5rem;

    .btn-nav {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
}
</style>
