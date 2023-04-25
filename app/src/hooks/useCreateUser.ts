import { ref } from 'vue'
import UserService, { User } from '@/services/UserService'

export const useCreateUser = () => {
    const data = ref<User>()
    const showError = ref(false)
    const isLoading = ref(false)

    const execute = (payload: User) => {
        const response = UserService.create<User>(payload)

        isLoading.value = true

        response
            .then((res) => {
                data.value = res.data
                isLoading.value = false
            })
            .catch(() => {
                showError.value = true
                isLoading.value = false
            })

        return response
    }

    return { isLoading, showError, data, execute }
}
