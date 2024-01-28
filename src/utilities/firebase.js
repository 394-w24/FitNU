// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update, get} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { useState, useEffect, useCallback } from "react";

// for image uploads
import { getStorage } from 'firebase/storage';

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX309Qm4ldvUFxWjj4fKhgy3dLUvbIZaQ",
  authDomain: "fitnu-305a3.firebaseapp.com",
  databaseURL: "https://fitnu-305a3-default-rtdb.firebaseio.com",
  projectId: "fitnu-305a3",
  storageBucket: "fitnu-305a3.appspot.com",
  messagingSenderId: "1078061988604",
  appId: "1:1078061988604:web:3a16eedfd6f474837ab579",
  measurementId: "G-FV5B15CE6C",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// for image uploads
const storage = getStorage(firebase);
export { storage };

export const auth = getAuth(firebase);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(firebase);



export const signInWithGoogle = () =>
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());

const firebaseSignOut = () => {
  signOut(getAuth(firebase));
};

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser), []);

  return [user];
};

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};


// for populate the edit profile form
// useDbRead Hook
export const useDbRead = (path) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(database, path);
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData(null);
      }
      setLoading(false);
    }).catch((error) => {
      setError(error);
      setLoading(false);
    });
  }, [path]);

  return [data, loading, error];
};
