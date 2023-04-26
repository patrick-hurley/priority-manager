import { QueryType } from '@/constants/QueryType'
import HttpService from '@/services/HttpService'
import { useQuery as baseUseQuery } from '@tanstack/vue-query'

const useQuery = <T>(
    service: HttpService,
    query: QueryType,
    enabled = true
) => {
    const { isLoading, isError, data, refetch } = baseUseQuery({
        queryKey: [query],
        queryFn: () => service.getAll<T>(),
        enabled,
    })

    return { isLoading, isError, data, refetch }
}

export default useQuery
