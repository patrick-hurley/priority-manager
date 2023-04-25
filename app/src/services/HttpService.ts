import Api from './Api'

class HttpService {
    constructor(private path: string) {}

    getAll<T>(params?: object) {
        const controller = new AbortController()
        const response = Api.get<T[]>(this.path, {
            signal: controller.signal,
            params: { ...params },
        })
        return { response, cancel: () => controller.abort() }
    }

    create<T>(data: T) {
        return Api.post<T>(this.path, data)
    }

    update<T extends { id: number }>(data: T) {
        return Api.put<T>(`${this.path}/${data.id}`, data)
    }

    delete(id: string) {
        return Api.delete(`${this.path}/${id}`)
    }
}

export default HttpService
