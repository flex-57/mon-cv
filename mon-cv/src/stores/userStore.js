import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref({})

    const saveUser = (userData) => {
        user.value = userData
        sessionStorage.setItem('user', JSON.stringify(userData))
    }

    const loadUser = () => {
        const storedUser = sessionStorage.getItem('user')
        if (storedUser) {
            user.value = JSON.parse(storedUser)
        } else {
            user.value = {
                personalInfo: {},
                experiences: [],
            }
        }
    }

    onMounted(() => {
        loadUser()
    })

    return {
        user,
        saveUser,
    }
})
