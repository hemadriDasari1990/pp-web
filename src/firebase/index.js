import 'firebase/storage'

import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCROwIJFiz6TcnlPxHkRaFXecpd9JjdQ_M',
  authDomain: 'netext-4031.firebaseapp.com',
  databaseURL: 'https://netext-4031.firebaseio.com',
  projectId: 'netext-4031',
  storageBucket: 'netext-4031.appspot.com',
  messagingSenderId: '588015131238',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  // const messaging = firebase.messaging()
  // messaging.requestPermission()
}

export default firebase
