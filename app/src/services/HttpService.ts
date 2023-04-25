import Api from './Api'

class HttpService {
    constructor(private path: string) {}

    async getAll<T>(params?: object) {
        console.log(this.path)
        const res = await Api.get<T[]>(this.path, {
            params: { ...params },
        })
        return res.data
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
