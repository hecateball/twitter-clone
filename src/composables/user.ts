import { inject, ref, reactive, InjectionKey, Ref } from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'

type SignUpInput = {
  displayName: string
  email: string
  password: string
  accepted: boolean
}

type SignInInput = {
  email: string
  password: string
}

export const CurrentUser: InjectionKey<Ref<firebase.User | null>> = Symbol()

export const useUser = () => {
  const user = inject(CurrentUser)
  if (user === undefined) {
    throw new Error('currentUser is not provided')
  }
  return { user }
}

export const useSignUp = (observer?: {
  onSuccess?: (credential: firebase.auth.UserCredential) => void
  onError?: Function
}) => {
  const processing = ref<boolean>(false)
  const input = reactive<SignUpInput>({
    displayName: '',
    email: '',
    password: '',
    accepted: false,
  })
  const signUp = async () => {
    if (processing.value) {
      return
    }
    processing.value = true
    try {
      const credential = await firebase
        .auth()
        .createUserWithEmailAndPassword(input.email, input.password)
      await credential.user?.updateProfile({
        displayName: input.displayName,
      })
      await credential.user?.reload()
      if (observer?.onSuccess !== undefined) {
        observer.onSuccess(credential)
      }
      processing.value = false
    } catch (error) {
      if (observer?.onError !== undefined) {
        observer.onError(error)
      }
      processing.value = false
    }
  }
  return { signUp, input, processing }
}

export const useSignIn = (observer?: {
  onSuccess?: (credential: firebase.auth.UserCredential) => void
  onError?: Function
}) => {
  const processing = ref<boolean>(false)
  const input = reactive<SignInInput>({
    email: '',
    password: '',
  })
  const signIn = async () => {
    if (processing.value) {
      return
    }
    processing.value = true
    try {
      const credential = await firebase
        .auth()
        .signInWithEmailAndPassword(input.email, input.password)
      if (observer?.onSuccess !== undefined) {
        observer.onSuccess(credential)
      }
      processing.value = false
    } catch (error) {
      if (observer?.onError !== undefined) {
        observer.onError(error)
      }
      processing.value = false
    }
  }
  return { signIn, input, processing }
}

export const useSignOut = (observer?: {
  onSuccess?: () => void
  onError?: Function
}) => {
  const processing = ref<boolean>(false)
  const signOut = async () => {
    if (processing.value) {
      return
    }
    processing.value = true
    try {
      await firebase.auth().signOut()
      if (observer?.onSuccess !== undefined) {
        observer.onSuccess()
      }
      processing.value = false
    } catch (error) {
      if (observer?.onError !== undefined) {
        observer.onError(error)
      }
      processing.value = false
    }
  }
  return { signOut, processing }
}
