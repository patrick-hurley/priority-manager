import { useData } from './useData'
import QuestionService, { Question } from '@/services/QuestionService'

export const useQuestions = () => {
    return useData<Question>(QuestionService)
}
