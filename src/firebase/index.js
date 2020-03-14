import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDvL5ptWdr_K7k3sWHavyyKfgZqxEgvUO0',
  authDomain: 'writenpost-hemadri.firebaseapp.com',
  databaseURL: 'https://writenpost-hemadri.firebaseio.com',
  projectId: 'writenpost-hemadri',
  storageBucket: 'writenpost-hemadri.appspot.com',
  messagingSenderId: '1070588863075',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  // const messaging = firebase.messaging()
  // messaging.requestPermission()
}

export default firebase
