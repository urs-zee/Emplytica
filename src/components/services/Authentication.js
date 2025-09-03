import { app } from "../../../config/firebase_config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const auth = getAuth(app);

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("Signed Out Successfully");
  } catch (err) {
    throw new Error(err.message);
  }
};
