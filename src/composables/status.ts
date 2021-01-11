import { ref, onUnmounted } from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useUser } from '~/composables/user'

export type Status = {
  user: {
    displayName: string
  }
  text: string
  likes: number
  createdAt: Date
}

export const useStatuses = () => {
  const statuses = ref<Status[]>([])
  const unsubscribe = firebase
    .firestore()
    .collectionGroup('statuses')
    .onSnapshot(async (snapshot) => {
      const values = []
      for (const status of snapshot.docs) {
        const user = await status.ref.parent.parent!.get()
        values.push({
          user: {
            displayName: user.get('displayName'),
          },
          text: status.get('text'),
          likes: status.get('likes'),
          createdAt: status
            .get('createdAt', { serverTimestamps: 'estimate' })
            .toDate()
            .toISOString(),
        })
      }
      statuses.value = values
    })
  onUnmounted(unsubscribe)
  return { statuses }
}

export const useCreateStatus = () => {
  const input = ref<string>('')
  const processing = ref<boolean>(false)
  const { user } = useUser()
  const createStatus = async () => {
    if (user.value === null) {
      return
    }
    if (processing.value) {
      return
    }
    processing.value = true
    await firebase
      .firestore()
      .collection('users')
      .doc(user.value.uid)
      .collection('statuses')
      .add({
        text: input.value,
        likes: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    input.value = ''
    processing.value = false
  }
  return {
    createStatus,
    input,
    processing,
  }
}
