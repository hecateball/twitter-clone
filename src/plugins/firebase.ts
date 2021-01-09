import { App, Plugin } from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


export const firebaseInit: Plugin = {
  install(app: App, options: Object) {
    if (firebase.apps.length !== 0) {
      return
    }
    firebase.initializeApp(options)
  },
}
