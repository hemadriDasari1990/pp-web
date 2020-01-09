import firebase from 'firebase';

const askForPermissionToReceiveNotifications = async () => {
  try {

    const messaging = firebase.messaging();

    await messaging.requestPermission();
    const token = await messaging.getToken();

    return token;
  } catch (error) {
  }
}

export default askForPermissionToReceiveNotifications;