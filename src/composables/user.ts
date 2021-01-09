import { inject, InjectionKey, Ref } from 'vue'
import firebase from 'firebase/app'

export const CurrentUser: InjectionKey<Ref<firebase.User | null>> = Symbol()

export const useUser = () => {
  const user = inject(CurrentUser)
  if (user === undefined) {
    throw new Error('currentUser is not provided')
  }
  return { user }
}
