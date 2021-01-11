<template>
  <section v-if="user">
    <h2>{{ user.displayName }}</h2>
    <form id="status">
      <input type="text" size="80" placeholder="いまどうしてる？" required />
      <button type="submit" form="status">ツイートする</button>
    </form>
  </section>
  <hr />
  <main>
    <Status v-for="status in statuses" :status="status" />
  </main>
  <SignOutDialog v-if="user" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUser } from '~/composables/user'
import { useStatuses } from '~/composables/status'
import Status from '~/components/Status.vue'
import SignOutDialog from '~/components/SignOutDialog.vue'

export default defineComponent({
  components: {
    Status,
    SignOutDialog,
  },
  setup: () => {
    const { user } = useUser()
    const statuses = useStatuses()
    return {
      user,
      statuses,
    }
  },
})
</script>
