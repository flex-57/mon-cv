<template>
    <div class="container" v-if="user && Object.keys(user).length > 0">
        <ProgressBar />
        <div>Commençons par vos informations personnelles</div>
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
        name: 'firstname',
        label: 'Prénom',
        type: 'text',
        rules: [rules.required, rules.minLength(2)],
    },
    {
        name: 'lastname',
        label: 'Nom',
        type: 'text',
        rules: [rules.required, rules.minLength(2)],
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        rules: [rules.required, rules.email],
    },
    {
        name: 'phone',
        label: 'Numéro de téléphone',
        type: 'tel',
        rules: [rules.required, rules.phone],
    },
    {
        name: 'birthdate',
        label: 'Date de naissance',
        type: 'date',
        rules: [rules.required, rules.date],
    },
    {
        name: 'desiredJob',
        label: 'Poste recherché',
        type: 'text',
        rules: [rules.required, rules.minLength(3)],
    },
]

const isValid = computed(() =>
    fields.every((field) => !validationUtils.validateField(user.value[field.name], field.rules)),
)

const next = () => {
    if (isValid.value) {
        userStore.saveUser(user.value)
        router.push('/experience-form')
    }
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

    *:nth-child(1),
    *:nth-child(2) {
        flex: 1 1 calc(50% - 1.5rem);
    }

    .btn-nav {
        display: flex;
        width: 100%;

        .form-group {
            display: flex;
            flex-direction: row-reverse;
        }
    }
}
</style>
