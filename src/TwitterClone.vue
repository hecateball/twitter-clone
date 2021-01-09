<template>
  <header>
    <h1>Twitter Clone</h1>
  </header>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useUser, useSignOut } from '~/composables/user'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup: () => {
    const dialog = ref<HTMLDialogElement>(undefined)
    const { user } = useUser()
    const router = useRouter()
    const { signOut } = useSignOut({
      onSuccess: () => {
        dialog.value.close()
        router.push({ name: 'sign-in' })
      },
    })
    return {
      user,
      dialog,
      signOut,
    }
  },
})
</script>
