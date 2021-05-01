import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDeadO_4kcOr4FZc2cmyEP16OIw_UoIvZI",
    authDomain: "evernote-clone-f56e3.firebaseapp.com",
    projectId: "evernote-clone-f56e3",
    storageBucket: "evernote-clone-f56e3.appspot.com",
    messagingSenderId: "631801983069",
    appId: "1:631801983069:web:e33f8f25ad03d15f981db4",
    measurementId: "G-6X9C80GVKR"
};

firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const auth = firebase.auth();
export { projectFirestore, firebase, auth };
