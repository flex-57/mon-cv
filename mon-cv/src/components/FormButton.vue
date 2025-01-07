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
