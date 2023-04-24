import { User } from '@/services/UserService'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        activeUser: null as null | User,
    }),
    getters: {
        getActiveUser(state) {
            return state.activeUser
        },
    },
    actions: {
        setActiveUser(user: User) {
            this.activeUser = user
        },
    },
    persist: true,
})
