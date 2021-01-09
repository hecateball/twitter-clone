<template>
  <h2>新しくアカウントを作る</h2>
  <form id="sign-up" @submit.prevent="signUp">
    <div>
      <label for="name">名前</label>
      <input
        id="name"
        type="text"
        autocomplete="name"
        v-model="displayName"
        required
      />
    </div>
    <div>
      <label for="email">メールアドレス</label>
      <input
        id="email"
        type="text"
        autocomplete="email"
        v-model="email"
        required
      />
    </div>
    <div>
      <label for="password">パスワード</label>
      <input
        id="password"
        type="password"
        autocomplete="new-password"
        v-model="password"
        required
      />
    </div>
    <div>
      <input id="terms" type="checkbox" v-model="accepted" required />
      <label for="terms">利用規約に同意する</label>
    </div>
    <button type="submit" form="sign-up" :disabled="!accepted || processing">
      新規会員登録
    </button>
    <RouterLink :to="{ name: 'index' }">やめる</RouterLink>
  </form>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useSignUp } from '~/composables/user'

export default defineComponent({
  setup: () => {
    const router = useRouter()
    const { signUp, input, processing } = useSignUp({
      onSuccess: () => router.push({ name: 'index' }),
      onError: (error) => console.log(error),
    })
    return {
      signUp,
      ...toRefs(input),
      processing,
    }
  },
})
</script>
