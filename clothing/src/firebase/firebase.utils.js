import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAIlh53y_KSuHsgFxQ6KVG8lFDOH_gaAsE",
    authDomain: "crwn-db-7b333.firebaseapp.com",
    projectId: "crwn-db-7b333",
    storageBucket: "crwn-db-7b333.appspot.com",
    messagingSenderId: "577772801395",
    appId: "1:577772801395:web:bcfbaa466361ff42708906",
    measurementId: "G-BLN9WCD9WY"
}; 

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

