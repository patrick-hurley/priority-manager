<template>
    <div class="container">
        <h1>Users</h1>
        <div v-if="isError" data-testid="error-message">
            <p>Something went wrong.</p>
        </div>
        <div v-if="isLoading">
            <p>Loading...</p>
        </div>
        <div v-else>
            <ul v-if="users && users.length > 0">
                <li
                    v-for="(user, index) in users"
                    data-testid="user-item"
                    :key="index"
                >
                    {{ user.name }} -
                    <a
                        data-testid="delete-user"
                        @click.prevent="deleteUser(user.id)"
                        >delete</a
                    >
                </li>
            </ul>
            <div v-else data-testid="no-results">
                <p>No users found</p>
            </div>
        </div>

        <button class="back" @click="$router.push({ name: 'DashboardAdmin' })">
            Back
        </button>
    </div>
</template>

<script setup lang="ts">
import { useQuery, useMutation } from '@tanstack/vue-query'
import UserService, { User } from '@/services/UserService'

import { useQueryClient } from '@tanstack/vue-query'
const queryClient = useQueryClient()

const {
    isLoading,
    isError,
    data: users,
} = useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.getAll(),
})

const mutation = useMutation({
    mutationFn: (id: string) => UserService.delete(id),
    onMutate: async (id: string) => {
        // Store original data before the update
        const previousUsers: User[] = queryClient.getQueryData(['users'])!

        // Optimistically update the data
        queryClient.setQueryData(['users'], (old: any) =>
            old.filter((user: User) => user.id !== id)
        )

        // Return the original snapshot (before the optimistic change was made)
        return { previousUsers }
    },
    onError: (err, _, context) => {
        queryClient.setQueryData(['users'], context?.previousUsers)
    },
    onSettled: () => {
        queryClient.invalidateQueries()
    },
})

async function deleteUser(id: string) {
    mutation.mutate(id)
}
</script>
