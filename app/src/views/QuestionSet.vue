<template>
    <div class="container">
        <div v-if="showError" data-testid="show-error">
            <p>Something went wrong</p>
        </div>

        <div v-if="isLoading"><p>Loading...</p></div>

        <div v-if="questions && questions.length > 0">
            <div v-if="questionnaireComplete" data-testid="questions-complete">
                <h1>questions complete.</h1>

                <div v-for="(question, index) in questions" :key="index">
                    <div v-if="question.answer" class="answer">
                        <p>
                            <strong>{{ question.label }}</strong>
                        </p>

                        <p>Answer: {{ question.answer }}</p>
                    </div>
                </div>
                <div class="navigation">
                    <button @click="startQuestions()">Submit another</button>
                    <button
                        @click="router.push({ name: 'DashboardUser' })"
                        class="back"
                    >
                        Back
                    </button>
                </div>
            </div>

            <QuestionItem
                v-else
                v-for="(question, index) in questions"
                :key="index"
                :question="question"
                :number="index + 1"
                @answered="processAnswer"
                @goToQuestion="goToQuestion"
            />
        </div>
        <div v-else data-testid="no-results">
            <p>No questions found</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import QuestionItem from '../components/QuestionItem.vue'
import AnswerService from '@/services/AnswerService'
import { useUserStore } from '@/stores/user'
import { useQuestions } from '../hooks/useQuestions'

const userStore = useUserStore()
const router = useRouter()
const { isLoading, showError, data: questions, execute } = useQuestions()

let questionnaireComplete = ref(false)

onMounted(async () => {
    await execute()
    if (!userStore.activeUser) {
        router.push({
            name: 'SelectUser',
        })
    }
    startQuestions()
})

function startQuestions() {
    if (questions.value && questions.value.length > 0) {
        questions.value[0].current = true
    }
    questionnaireComplete.value = false
}

interface Response {
    answer: string | boolean | Date
    index: number
}

function processAnswer(response: Response): void {
    if (questions.value) {
        questions.value[response.index].answer = response.answer
        questions.value[response.index].current = false
        if (response.index === 1 && response.answer === 'No') {
            submitAnswers()
        } else if (response.index + 1 < questions.value.length) {
            questions.value[response.index + 1].current = true
        } else {
            submitAnswers()
        }
    }
}

function goToQuestion(number: number) {
    if (number > 0 && questions.value) {
        questions.value[number - 1].current = true
        questions.value[number].current = false
    } else {
        router.push({
            name: 'DashboardUser',
        })
    }
}

async function submitAnswers() {
    questionnaireComplete.value = true
    const answers = questions.value
        ?.map((x) => {
            return {
                questionId: x.id,
                answer: x.answer,
            }
        })
        .filter((x) => x.answer)
    const payload = {
        userId: userStore.activeUser?.id,
        answers,
    }

    try {
        await AnswerService.createAnswerSet(payload)
    } catch {
        showError.value = true
    }
}
</script>
