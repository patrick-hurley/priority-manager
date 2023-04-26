import { QueryType } from '@/constants/QueryType'
import HttpService from '@/services/HttpService'
import { useMutation } from '@tanstack/vue-query'
import { useQueryClient } from '@tanstack/vue-query'

const createMutation = <T>(service: HttpService, query: QueryType) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload) => service.create(payload),
        onMutate: async (payload: T) => {
            // Store original data before the update
            const previousUsers: T[] = queryClient.getQueryData([query])!

            // Optimistically update the data
            queryClient.setQueryData([query], (old: any) =>
                old ? [...old, payload] : []
            )

            // Return the original snapshot (before the optimistic change was made)
            return { previousUsers }
        },
        onError: (err, _, context) => {
            queryClient.setQueryData([query], context?.previousUsers)
        },
        onSettled: () => {
            queryClient.invalidateQueries()
        },
    })
}

export default createMutation
