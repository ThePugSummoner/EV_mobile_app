import { Alert } from 'react-native';
import { ref, set, get, child } from 'firebase/database'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth';
import { auth, CARS_REF, db, USERS_REF} from '../firebase/Config'

export const signUp = async (name, email, password, phone, selectedCar) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            set(ref(db, USERS_REF + userCredential.user.uid), {
                name: name,
                email: userCredential.user.email,
                phone: phone,
                car: selectedCar
            })
        })
        return true
    }
    catch (error) {
        console.log("Registration failed. ", error.message)
        Alert.alert("Registration failed. ", error.message)
        return false
    }
}

export const signIn = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        return true
    }
    catch (error) {
        console.log("Login failed. ", error.message)
        return false
    }
}

export const logOut = async() => {
    try {
        await signOut(auth)
    }
    catch (error) {
        console.log("Logout error. ", error.message)
        Alert.alert("Logout error. ", error.message)
    }
}

export const getUserData = async (userUid) => {
    try {
      const userRef = child(ref(db), `${USERS_REF}${userUid}`);
      const snapshot = await get(userRef);
  
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.error('User data not found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      return null;
    }
  };

