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
            v-model.trim="inputValue"
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
                v-model.trim="inputValue"
                @change="validate"
            />
            {{ label }}
        </label>
    </div>
    <div class="form-group" v-else-if="type === 'color-picker'">
        <label :for="id">{{ label }}</label>
        <div v-if="error" class="error">{{ error }}</div>
        <ColorPicker
            :id="id"
            :class="{ 'is-valid': !error && inputValue, 'is-invalid': error }"
            v-model.trim="inputValue"
        />
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
import { Chrome as ColorPicker } from '@ckpack/vue-color'
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
        type: [String, Number, Object],
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
