import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../utils";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async (user) => {
      if (user === undefined || user === null) {
        setCurrentUser(null);
      } else {
        try {
          const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            setCurrentUser(doc.data());
          });

          // const docRef = doc(db, "users", user.uid);
          // const docSnap = await getDoc(docRef);
          // if (docSnap.exists()) {
          //   console.log("Document data:", docSnap.data());
          //   setCurrentUser(docSnap.data());
          // }
        } catch (error) {
          console.log(error);
        }
      }
    };
    const unSub = onAuthStateChanged(auth, (user) => {
      getCurrentUser(user);
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
