// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAcKRi-tAcYWt8Y2gFHAC2vFvUXR7HJHAI',
  authDomain: 'net-ve-xanh.firebaseapp.com',
  projectId: 'net-ve-xanh',
  storageBucket: 'net-ve-xanh.appspot.com',
  messagingSenderId: '293541591424',
  appId: '1:293541591424:web:7e976ef41c72896d16e965'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
