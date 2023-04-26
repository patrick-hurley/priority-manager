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
import useDeleteMutation from '../hooks/useDeleteMutation'
import useQuery from '@/hooks/useQuery'
import UserService, { User } from '@/services/UserService'
import { USERS } from '../constants/QueryType'

const { isLoading, isError, data: users } = useQuery<User>(UserService, USERS)
const mutation = useDeleteMutation<User>(UserService, USERS)

async function deleteUser(id: string) {
    mutation.mutate(id)
}
</script>
