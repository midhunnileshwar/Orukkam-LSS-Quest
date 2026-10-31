import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, PhoneAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'dummy_api_key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'orukkam-50e33.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'orukkam-50e33',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'orukkam-50e33.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '557560406011',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:557560406011:web:5a2db9e32f485c1154f55e',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-1JLEV82JX8',
};

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
} catch (e) {
  console.warn('Firebase init fallback:', e);
}

const PhoneAuthProviderInstance = PhoneAuthProvider;

export { auth, db, googleProvider, PhoneAuthProviderInstance as PhoneAuthProvider };
