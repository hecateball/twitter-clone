<template>
  <section v-if="user">
    <form id="status">
      <h2>{{ user.displayName }}</h2>
      <input type="text" placeholder="いまどうしてる？" />
      <button type="submit" form="status">ツイートする</button>
    </form>
  </section>
  <main>Building...</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUser } from '~/composables/user'

export default defineComponent({
  setup: () => {
    const { user } = useUser()
    return {
      user,
    }
  },
})
</script>
