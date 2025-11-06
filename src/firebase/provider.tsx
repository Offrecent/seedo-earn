'use client';

import React, { createContext, useContext } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

interface FirebaseContextType {
  firebaseApp: FirebaseApp | undefined;
  auth: Auth | undefined;
  firestore: Firestore | undefined;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export function FirebaseProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: FirebaseContextType;
}) {
  return (
    <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
  );
}

export const useFirebase = () => useContext(FirebaseContext);

export const useFirebaseApp = () => useContext(FirebaseContext)?.firebaseApp;
export const useAuth = () => useContext(FirebaseContext)?.auth;
export const useFirestore = () => useContext(FirebaseContext)?.firestore;
