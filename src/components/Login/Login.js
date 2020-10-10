import React, { useContext } from 'react';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } }

    //Google sign-in provider
    var googleLoginProvider = new firebase.auth.GoogleAuthProvider();


    const handleGoogleLogin = () => {


        // Initialize Firebase
        // firebase.initializeApp(firebaseConfig);
        if (firebase.apps.length === 0) {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
        }

        //Authenticate with Firebase using the Google provider object.
        firebase.auth().signInWithPopup(googleLoginProvider).then(function (result) {
            var user = result.user;
            setLoggedInUser(user);
            history.replace(from);
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            //
            // ...
        });

    }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleLogin}>Login</button>
        </div>
    );
};

export default Login;