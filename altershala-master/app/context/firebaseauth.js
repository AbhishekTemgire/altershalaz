import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDXkeGu3f8oUuCGZhrJThSqtMD6kJVkntc",
    authDomain: "babblr-95e34.firebaseapp.com",
    projectId: "babblr-95e34",
    storageBucket: "babblr-95e34.appspot.com",
    messagingSenderId: "905586295294",
    appId: "1:905586295294:web:75dff941aa0448ce0100af",
    measurementId: "G-JGBK8KY0CW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const imageDb = getStorage(app)


