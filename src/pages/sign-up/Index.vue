<template>
  <section>
    <form id="sign-up" @submit.prevent="signUp">
      <h2>Sign Up</h2>
      <label for="name">Display Name</label>
      <input id="name" type="text" autocomplete="name" v-model="displayName" />
      <label for="email">Email</label>
      <input id="email" type="text" autocomplete="email" v-model="email" />
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        autocomplete="new-password"
        v-model="password"
      />
      <button type="submit" form="sign-up" :disabled="processing">
        Sign Up
      </button>
    </form>
  </section>
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
