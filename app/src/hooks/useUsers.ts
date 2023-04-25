import { useData } from './useData'
import UserService, { User } from '@/services/UserService'

export const useUsers = () => {
    return useData<User>(UserService)
}
