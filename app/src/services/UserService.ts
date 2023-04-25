import HttpService from './HttpService'

export interface User {
    name: string
}

export default new HttpService('/users')
