import { Ref, ref } from 'vue'
import HttpService from '@/services/HttpService'

export const useData = <T>(service: HttpService) => {
    const data = ref<T[]>([]) as Ref<T[]>
    const showError = ref(false)
    const isLoading = ref(false)

    const execute = () => {
        const response = service.getAll<T>()

        isLoading.value = true

        response
            .then((res) => {
                data.value = res
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
