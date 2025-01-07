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
