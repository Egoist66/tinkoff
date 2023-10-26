import { initializeApp } from "firebase/app";
import {getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore} from '@firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD34AnnTWajAa75JXrrhjac4OzkXqJnMdQ",
    authDomain: "tinkoff-app-93f85.firebaseapp.com",
    projectId: "tinkoff-app-93f85",
    storageBucket: "tinkoff-app-93f85.appspot.com",
    messagingSenderId: "920565006570",
    appId: "1:920565006570:web:d29f2d8b10f740543bd793"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const APP_CONFIG = {
    auth: getAuth(),
    db: getFirestore(),

    register (email: string, password: string){
        return createUserWithEmailAndPassword(this.auth, email, password)
    },
    login(email: string, password: string){
        signInWithEmailAndPassword(this.auth, email, password)
    },
    logout(){
        return signOut(this.auth)
    },



}
