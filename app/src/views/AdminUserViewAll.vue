<template>
    <div class="container">
        <h1>Users</h1>
        <div v-if="showError" data-testid="error-message">
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
import UserService from '@/services/UserService'
import { useUsers } from '../hooks/useUsers'
import { onMounted } from 'vue'

const { isLoading, showError, data: users, execute } = useUsers()

onMounted(async () => {
    await execute()
})

async function deleteUser(id: string): Promise<void> {
    try {
        await UserService.delete(id)
        execute()
    } catch (err) {
        showError.value = true
    }
}
</script>
