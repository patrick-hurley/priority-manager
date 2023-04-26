import HttpService from './HttpService'

export interface User {
    id?: string
    name: string
}

export default new HttpService('/users')
