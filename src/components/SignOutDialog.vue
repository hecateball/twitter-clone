<template>
  <button @click="dialog.showModal">サインアウト</button>
  <dialog ref="dialog">
    <header>確認</header>
    <p>サインアウトしますか？</p>
    <menu>
      <button @click="signOut">サインアウト</button>
      <button @click="dialog.close">キャンセル</button>
    </menu>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSignOut } from '~/composables/user'

export default defineComponent({
  setup: () => {
    const dialog = ref<HTMLDialogElement>(document.createElement('dialog'))
    const router = useRouter()
    const { signOut } = useSignOut({
      onSuccess: () => {
        dialog.value.close()
        router.push({ name: 'sign-in' })
      },
    })
    return {
      dialog,
      signOut,
    }
  },
})
</script>
