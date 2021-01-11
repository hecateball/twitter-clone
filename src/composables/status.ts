import { ref, reactive } from 'vue'
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
  statuses.value.push({
    user: {
      displayName: 'てすとまん',
    },
    text: 'さんぷるのテキストです1',
    likes: 0,
    createdAt: new Date(),
  })
  statuses.value.push({
    user: {
      displayName: 'てすとまん',
    },
    text: 'さんぷるのテキストです2',
    likes: 0,
    createdAt: new Date(),
  })
  statuses.value.push({
    user: {
      displayName: 'てすとまん',
    },
    text: 'さんぷるのテキストです3',
    likes: 0,
    createdAt: new Date(),
  })
  return statuses
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
