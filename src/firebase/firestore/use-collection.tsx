'use client';
import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  Query,
  DocumentData,
} from 'firebase/firestore';
import { useFirestore } from '../provider';

export const useCollection = (path: string) => {
  const firestore = useFirestore();
  const [data, setData] = useState<DocumentData[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!firestore) return;

    const collectionRef = collection(firestore, path);
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, path]);

  return { data, loading, error };
};

export const useCollectionQuery = (query: Query | null) => {
  const [data, setData] = useState<DocumentData[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) {
      setData([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query]);

  return { data, loading, error };
};
