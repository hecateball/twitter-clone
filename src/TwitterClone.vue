<template>
  <header>
    <nav>
      <h1>Twitter Clone</h1>
      <ul v-if="user">
        <li>
          <a href="#" @click.prevent="signOut">sign out</a>
        </li>
      </ul>
      <ul v-else>
        <li>
          <RouterLink :to="{ name: 'sign-in' }">sign in</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'sign-up' }">sign up</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUser, useSignOut } from '~/composables/user'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup: () => {
    const { user } = useUser()
    const router = useRouter()
    const { signOut } = useSignOut({
      onSuccess: () => router.push({ name: 'sign-in' }),
    })
    return {
      user,
      signOut,
    }
  },
})
</script>
