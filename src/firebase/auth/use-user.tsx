'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, DocumentData, Firestore } from 'firebase/firestore';
import { useAuth, useFirestore } from '../provider';
import { useRouter } from 'next/navigation';

export function useUser() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || !firestore) return;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        const userDocRef = doc(firestore as Firestore, 'users', firebaseUser.uid);
        const unsubscribeFirestore = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUserData(doc.data());
          } else {
            setUserData(null);
          }
          setLoading(false);
        }, () => {
          // Handle error
          setUserData(null);
          setLoading(false);
        });
        return () => unsubscribeFirestore();
      } else {
        setUser(null);
        setUserData(null);
        setLoading(false);
        // Optionally redirect to login page if not on a public route
        // This depends on your app's structure
        // router.push('/login');
      }
    });

    return () => unsubscribeAuth();
  }, [auth, firestore, router]);

  return { user, userData, loading };
}
