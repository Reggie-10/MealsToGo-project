import { auth, signInWithEmailAndPassword  } from "../firebase/firebase";;
export const loginRequest = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};