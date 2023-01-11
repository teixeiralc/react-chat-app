import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBeenf3_lQc5ax4ylfrxOYYdY9bcrfYqKM',
  authDomain: 'react-chat-app-7de42.firebaseapp.com',
  projectId: 'react-chat-app-7de42',
  storageBucket: 'react-chat-app-7de42.appspot.com',
  messagingSenderId: '1016900630306',
  appId: '1:1016900630306:web:c888a62dc9cb5953d8577b',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
