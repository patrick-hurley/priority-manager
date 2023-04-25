import { Ref, ref } from 'vue'
import { onUnmounted } from 'vue'
import HttpService from '@/services/HttpService'

export const useData = <T>(service: HttpService) => {
    const data = ref<T[]>([]) as Ref<T[]>
    const showError = ref(false)
    const isLoading = ref(false)
    let cancelCall: () => void = () => {
        return
    }

    const execute = () => {
        const { response, cancel } = service.getAll<T>()

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

        cancelCall = cancel

        return response
    }

    // Cancel the http request
    onUnmounted(() => {
        cancelCall()
    })

    return { isLoading, showError, data, execute }
}
