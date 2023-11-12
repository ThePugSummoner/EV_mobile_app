import { Alert } from 'react-native';
import { ref, set } from 'firebase/database'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth';
import { auth, db, USERS_REF} from '../firebase/Config'

export const signUp = async (name, email, password, phone, pin) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            set(ref(db, USERS_REF + userCredential.user.uid), {
                name: name,
                email: userCredential.user.email,
                phone: phone,
                pin: pin
            })
        })
    }
    catch (error) {
        console.log("Registration failed. ", error.message)
        Alert.alert("Registration failed. ", error.message)
    }
}

export const signIn = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        return true
    }
    catch (error) {
        console.log("Login failed. ", error.message)
        /* Alert.alert("Login failed. ", error.message) */
        return false
    }
   /*  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      const user = getAuth().currentUser;
      if (user) {
        navigation.navigate('Main Page', { userUid: user.uid });
      } else {
        console.error('Unexpected authentication state');
        Alert.alert('Unexpected authentication state');
      }
    })
    .catch((error) => {
      console.error('Login failed. ', error.message);
      Alert.alert('Login failed. ', error.message);
    }); */
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