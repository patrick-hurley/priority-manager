// export default {
//     createUser(payload: User) {
//         return Api.post('users', payload)
//     },
//     deleteUser(id: string) {
//         return Api.delete(`users/${id}`)
//     },
//     getAllUsers() {
//         return Api.get('users')
//     },
// }

import HttpService from './HttpService'

export interface User {
    name: string
}

export default new HttpService('/users')
