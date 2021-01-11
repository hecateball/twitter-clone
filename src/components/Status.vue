<template>
  <article>
    <h3>{{ status.user.displayName }}</h3>
    <small>
      <time>{{ status.createdAt }}</time>
    </small>
    <p>{{ status.text }}</p>
    <a>いいね！</a> {{ status.likes }}
  </article>
  <hr />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Status } from '~/composables/status'

export default defineComponent({
  props: {
    status: {
      type: Object as PropType<Status>,
      required: true,
    },
  },
})
</script>
