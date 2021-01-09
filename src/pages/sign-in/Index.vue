<template>
  <section>
    <form id="sign-in" @submit.prevent="signIn">
      <h2>Sign In</h2>
      <label for="email">Email</label>
      <input id="email" type="text" autocomplete="e=mail" v-model="email" />
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        autocomplete="current-password"
        v-model="password"
      />
      <button type="submit" form="sign-in" :disabled="processing">
        Sign In
      </button>
    </form>
  </section>
  <section>
    <RouterLink :to="{ name: 'sign-up' }">新しくアカウントを作る</RouterLink>
  </section>
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
