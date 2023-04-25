export interface Question {
    id: string
    label: string
    order: number
    type: string
    current: boolean
    answer: string | boolean | Date
}

import HttpService from './HttpService'

export default new HttpService('/questions')
