<template>
  <section v-if="user">
    <h2>{{ user.displayName }}</h2>
    <form id="status">
      <input type="text" size="80" placeholder="いまどうしてる？" />
      <button type="submit" form="status">ツイートする</button>
    </form>
  </section>
  <hr />
  <main>
    <article>
      <h3>なまえ</h3>
      <small><time>じかん</time></small>
      <p>本文</p>
      <a>いいね！</a> 0
    </article>
    <hr />
    <article>
      <h3>なまえ</h3>
      <small><time>じかん</time></small>
      <p>本文</p>
      <a>いいね！</a> 0
    </article>
    <hr />
    <article>
      <h3>なまえ</h3>
      <small><time>じかん</time></small>
      <p>本文</p>
      <a>いいね！</a> 0
    </article>
    <hr />
  </main>
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
import { useUser, useSignOut } from '~/composables/user'

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
