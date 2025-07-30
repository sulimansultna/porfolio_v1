
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeApp as initializeAdminApp, getApps as getAdminApps, cert } from 'firebase-admin/app';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';

// Firebase Client Configuration (for frontend)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase Client App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Firebase Admin Configuration (for backend API routes)
let adminApp;
let adminDb;
let adminAuth;

if (typeof window === 'undefined') { // Only initialize admin SDK on the server
  if (!getAdminApps().length) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
      adminApp = initializeAdminApp({
        credential: cert(serviceAccount),
      });
    } catch (error) {
      console.error("Failed to parse Firebase service account key:", error);
    }
  } else {
    adminApp = getAdminApps()[0];
  }

  if (adminApp) {
    adminDb = getAdminFirestore(adminApp);
    adminAuth = getAdminAuth(adminApp);
  }
}

export { app, db, auth, storage, adminDb, adminAuth };
