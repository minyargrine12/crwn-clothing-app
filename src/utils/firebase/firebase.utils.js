import { initializeApp } from "firebase/app";
import { getAuth,
   signInWithRedirect,
    signInWithPopup,
     GoogleAuthProvider,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged


} from "firebase/auth";
import {
  getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCV9-LE3_2-nWl2duKB8gK1ZrEL7BkB9qg",
    authDomain: "crwn-clothing-db-be0a9.firebaseapp.com",
    projectId: "crwn-clothing-db-be0a9",
    storageBucket: "crwn-clothing-db-be0a9.appspot.com",
    messagingSenderId: "738596203498",
    appId: "1:738596203498:web:5fc1d2ac5eab417d042093"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const googleprovider = new GoogleAuthProvider();
  googleprovider.setCustomParameters({
prompt: "select_account",
  });
  export const auth = getAuth();

  export const signInWithGooglePopup = () =>
     signInWithPopup(auth, googleprovider);

  export const  signInWithGoogleRedirect = () =>
     signInWithRedirect(auth, googleprovider);

  export const db = getFirestore();

  export const createUserDocumentFormAuth = async (
    userAuth, 
    additionlInformation = {}
  ) => {

    if ( !userAuth) return;
       const userDocRef = doc(db, 'users', userAuth.uid);
       const userSnapshot = await getDoc(userDocRef);
    
       if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionlInformation,
          });
        }catch (error){
          console.log("error creating the user ", error.message);

        }
        
       }


       return userDocRef;
       

  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
if ( !email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
  };


  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if ( !email || !password) return;
        return await signInWithEmailAndPassword(auth, email, password)
      };


      export const signOutUser = async () => await signOut(auth);



      export const onAuthStateChangedListener = (callback) =>

  onAuthStateChanged(auth, callback);

  /**
   * {
   * next: callback,
   * error:errorCallback,
   * complete: completeCallback 
   * }
   */