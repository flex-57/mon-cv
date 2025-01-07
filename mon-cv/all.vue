views/HomeView.vue:
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

views/UserForm.vue:
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

views/ExperienceForm.vue:
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

views/CVPreview.vue:
<template>
    <div class="container">
        <section class="form">sfsdfsdfsf</section>
        <section class="cv">
            <div class="preview">
                <div class="side profile">
                    <section>
                        <h2>
                            {{ capitalizeName(user.lastname) }}
                            {{ capitalizeName(user.firstname) }}
                        </h2>
                        <ul>
                            <li>{{ user.email }}</li>
                            <li>{{ user.phone }}</li>
                            <li>{{ calculateAge(user.birthdate) }} ans</li>
                        </ul>
                    </section>
                    <section>
                        <h3>Compétences Informatiques</h3>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </section>
                    <section>
                        <h3>Langues</h3>
                        <ul>
                            <li></li>
                        </ul>
                    </section>
                    <section>
                        <h3>Points Forts</h3>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </section>
                </div>
                <div class="side career">
                    <h2>
                        {{ capitalizeName(user.desiredJob) }}
                    </h2>
                    <section>
                        <h3>Expériences professionnelles</h3>
                        <div>
                            <h4>
                                {{ capitalizeName(user.job) }} | {{ user.start }} / {{ user.end }}
                            </h4>
                            <p>
                                @ {{ capitalizeName(user.company) }},
                                {{ capitalizeName(user.place) }} - {{ user.contract }}
                            </p>
                            <p class="description">{{ user.description }}</p>
                        </div>
                        <div class="experience">
                            <h4>
                                {{ capitalizeName(user.job) }} | {{ user.start }} / {{ user.end }}
                            </h4>
                            <p>
                                @ {{ capitalizeName(user.company) }},
                                {{ capitalizeName(user.place) }} - {{ user.contract }}
                            </p>
                            <p class="description">{{ user.description }}</p>
                        </div>
                    </section>
                    <section>
                        <h3>Formations & Diplômes</h3>
                        <div>
                            <h4>
                                {{ capitalizeName(user.job) }} | {{ user.start }} / {{ user.end }}
                            </h4>
                            <p>
                                @ {{ capitalizeName(user.company) }},
                                {{ capitalizeName(user.place) }} - {{ user.contract }}
                            </p>
                            <p class="description">{{ user.description }}</p>
                        </div>
                        <div class="experience">
                            <h4>
                                {{ capitalizeName(user.job) }} | {{ user.start }} / {{ user.end }}
                            </h4>
                            <p>
                                @ {{ capitalizeName(user.company) }},
                                {{ capitalizeName(user.place) }} - {{ user.contract }}
                            </p>
                            <p class="description">{{ user.description }}</p>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { capitalizeName } from '@/utils/stringUtils'
import { calculateAge } from '@/utils/calculateAgeUtils'
import { computed } from 'vue'

const userStore = useUserStore()
const user = computed(() => userStore.user)
</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 400px auto;
    padding: 0 1rem;
    height: 100%;
}
.form {
    margin: 1rem 0;
    padding: 1rem;
    border-right: 1px solid #cccccc;
}
.cv {
    display: flex;
    padding: 1rem;
    font-family: 'Calibri';
    font-size: 0.95rem;

    h2 {
        font-size: 2rem;
        line-height: 2.6rem;
        border-bottom: 2px solid;
    }

    h3,
    h4 {
        line-height: 1.4rem;
    }

    h3 {
        font-size: 1.35rem;
        text-transform: uppercase;
        border-bottom: 2px solid;
    }
    h4 {
        font-size: 1.15rem;
    }

    .description {
        white-space: pre-wrap;
        text-wrap: wrap;
    }

    .preview {
        background: #fff;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.6);
        display: grid;
        grid-template-columns: 29% auto;
        aspect-ratio: 210 / 297;
        max-height: 1050px;

        section {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }

        .side {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 0.8rem;
        }

        .profile {
            background: #2d5a75;
            color: #fff;

            ul {
                display: flex;
                flex-direction: column;
                gap: 0.3rem;
            }
        }

        .career {
            background: #f3f2eb;

            h2 {
                border: 2px solid;
                border-radius: 0.3rem;
                text-align: center;
                background: #fff;
            }

            h3 {
                color: #2d5a75;
            }
        }
    }
}
</style>

components/FormField.vue:
<template>
    <div class="form-group" v-if="type === 'textarea'">
        <label :for="id">{{ label }}</label>
        <div v-if="error" class="error">{{ error }}</div>
        <textarea
            :id="id"
            :class="{ 'is-valid': !error && inputValue, 'is-invalid': error }"
            :placeholder="placeholder"
            v-model.trim="inputValue"
            @blur="validate"
        >
        </textarea>
    </div>
    <div class="form-group" v-else-if="type === 'select'">
        <label :for="id">{{ label }}</label>
        <div v-if="error" class="error">{{ error }}</div>
        <select
            :id="id"
            :class="{ 'is-valid': !error && inputValue, 'is-invalid': error }"
            v-model="inputValue"
            @change="validate"
        >
            <option v-for="option in options" :key="option.label" :value="option.label">
                {{ option.label }}
            </option>
        </select>
    </div>
    <div class="form-group" v-else-if="type === 'checkbox'">
        <label>
            <div v-if="error" class="error">{{ error }}</div>
            <input
                type="checkbox"
                :id="id"
                :class="{ 'is-valid': !error && inputValue, 'is-invalid': error }"
                v-model="inputValue"
                @change="validate"
            />
            {{ label }}
        </label>
    </div>
    <div class="form-group" v-else>
        <label :for="id">{{ label }}</label>
        <div v-if="error" class="error">{{ error }}</div>
        <input
            :type="type"
            :id="id"
            :placeholder="placeholder"
            :class="{ 'is-valid': !error && inputValue, 'is-invalid': error }"
            v-model.trim="inputValue"
            @blur="validate"
            autocapitalize="words"
        />
    </div>
</template>

<script setup>
import { validationUtils } from '@/utils/validationUtils'
import { ref, watch } from 'vue'

const error = ref('')

const props = defineProps({
    type: {
        type: String,
        default: 'text',
    },
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    modelValue: {
        type: [String, Number],
        default: '',
    },
    rules: {
        type: Array,
        default: () => [],
    },
    options: {
        type: Array,
        default: () => [],
    },
})

const inputValue = ref(props.modelValue)

const emit = defineEmits(['update:modelValue'])

const validate = () => {
    error.value = validationUtils.validateField(inputValue.value, props.rules)
}

watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue)
    // validate()
})
</script>

<style scoped>
.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    width: 100%;
}
input,
textarea,
select {
    padding: 0.5rem 1rem;
    border: 1px solid #000;
    border-radius: 0.5rem;
    outline: none;
    transition: all 0.5s;
}

.is-valid {
    border: 1px solid var(--success);
    background: var(--success-light);
}

.is-invalid {
    border: 1px solid var(--danger);
    background: var(--danger-light);
}
.error {
    color: var(--danger);
    font-size: 0.9rem;
}
</style>

components/FormButton.vue:
<template>
    <div class="form-group">
        <button
            :type="type"
            :class="['btn', variantClass, sizeClass, { disabled: disabled }]"
            :disabled="disabled"
        >
            <slot>Envoyer</slot>
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const variantClass = computed(() => `btn-${props.variant}`)
const sizeClass = computed(() => `btn-${props.size}`)

const props = defineProps({
    type: {
        type: String,
        default: 'button', // 'button', 'submit', 'reset'
    },
    variant: {
        type: String,
        default: 'primary', // 'primary', 'secondary', 'success', 'danger'
    },
    size: {
        type: String,
        default: 'md', // 'sm', 'md', 'lg'
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})
</script>

<style scoped>
.btn {
    display: inline-block;
    border: none;
    border-radius: 0.5rem;
    color: #fff;
    cursor: pointer;
    transition: background 0.3s ease;

    &:disabled,
    &:disabled:hover {
        background: #e0e0e0;
        color: #aaa;
        cursor: not-allowed;
    }
    &:focus {
        transform: scale(0.98);
    }
}

.btn-primary {
    background: var(--primary);

    &:hover {
        background: var(--primary-hover);
    }
}

.btn-secondary {
    background: var(--secondary);

    &:hover {
        background: var(--secondary-hover);
    }
}

.btn-success {
    background: var(--success);

    &:hover {
        background: var(--success-hover);
    }
}

.btn-danger {
    background: var(--danger);

    &:hover {
        background: var(--danger-hover);
    }
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
}
.btn-md {
    padding: 0.5rem 1rem;
    font-size: 1rem;
}
.btn-lg {
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
}
</style>

utils/validationUtils.js:
export const validationUtils = {
    rules: {
        required: (value) => (value ? '' : 'Ce champ est requis.'),

        minLength: (length) => (value) =>
            value && value.length >= length
                ? ''
                : `Ce champ doit contenir au minimum ${length} caractères.`,
        maxLength: (length) => (value) =>
            value && value.length <= length
                ? ''
                : `Ce champ doit contenir au maximum ${length} caractères.`,

        email: (value) =>
            /^(?!\.)("?(?!")[\w&'*+._%-]+(?:\.[\w&'*+._%-]+)*"?)@((?:[a-z0-9-]+\.)+[a-z]{2,})$/i.test(
                value,
            )
                ? ''
                : "L'email n'est pas valide.",

        phone: (value) =>
            /^(?:\+33|0)\s?[1-9](?:[\s.-]?\d{2}){4}$/.test(value)
                ? ''
                : "Le numéro de téléphone n'est pas valide.",

        date: (value) => {
            const today = new Date()
            const birthDate = new Date(value)

            if (isNaN(birthDate.getTime())) {
                return "La date n'est pas valide."
            }

            if (birthDate > today) {
                return 'La date ne peut pas être dans le futur.'
            }
        },
    },

    validateField(value, rules) {
        console.log(value)
        return rules.map((rule) => rule(value)).find((error) => error !== '')
    },
}

routeur/index.js:
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserForm from '@/views/UserForm.vue'
import ExperienceForm from '@/views/ExperienceForm.vue'
import CVPreview from '@/views/CVPreview.vue'
import ColorForm from '@/views/ColorForm.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/user-form',
            name: 'user-form',
            component: UserForm,
        },
        {
            path: '/experience-form',
            name: 'experience-form',
            component: ExperienceForm,
        },
        {
            path: '/color-form',
            name: 'color-form',
            component: ColorForm,
        },
        {
            path: '/cv-preview',
            name: 'cv-preview',
            component: CVPreview,
        },
    ],
})

export default router

