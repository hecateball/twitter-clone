<template>
  <h2>サインイン</h2>
  <form id="sign-in" @submit.prevent="signIn">
    <label for="email">メールアドレス</label>
    <input id="email" type="text" autocomplete="e=mail" v-model="email" />
    <label for="password">パスワード</label>
    <input
      id="password"
      type="password"
      autocomplete="current-password"
      v-model="password"
    />
    <button type="submit" form="sign-in" :disabled="processing">
      サインイン
    </button>
  </form>
  <h3>アカウントをお持ちでない方はこちら</h3>
  <RouterLink :to="{ name: 'sign-up' }">新しくアカウントを作る</RouterLink>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useSignIn } from '~/composables/user'

export default defineComponent({
  setup: () => {
    const router = useRouter()
    const { signIn, input, processing } = useSignIn({
      onSuccess: () => router.push({ name: 'index' }),
      onError: (error) => console.log(error),
    })
    return {
      signIn,
      ...toRefs(input),
      processing,
    }
  },
})
</script>
