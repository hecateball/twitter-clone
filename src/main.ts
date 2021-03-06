import { createApp } from 'vue'
import { router } from '~/router'
import { firebaseInit } from '~/plugins/firebase'
import { userProvider } from '~/plugins/user'
import TwitterClone from '~/TwitterClone.vue'

createApp(TwitterClone)
  .use(router)
  .use(firebaseInit, {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  })
  .use(userProvider)
  .mount('#app')
