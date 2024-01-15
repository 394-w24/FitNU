import "./LoginPage.css";
import { auth, database } from "../utilities/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ref, child, get, set } from "firebase/database";
import { setUID } from "./ProfileHandler";

const handleUserLogin = (user, firstTimeUserCallBack) => {
    // console.log(user);
    const uid = user.uid;
    const usersRef = child(ref(database), "users");

    // commented out for now as to not cause crashes, but this is how we load user info via the uid
    setUID(uid);

    get(usersRef)
        .then((snapshot) => {
            if (snapshot.exists() && snapshot.hasChild(uid)) {
                console.log(`User with user_id ${uid} exists in /users.`);
            } else {
                // new user login
                firstTimeUserCallBack(true);
                console.log(`User with user_id ${uid} does not exist in /users.`);

                const userData = {
                    email: user.email,
                    name: user.displayName,
                    photoURL: user.photoURL,
                };

                const newUserRef = ref(database, `users/${uid}`);
                set(newUserRef, userData)
                    .then(() => {
                        console.log(`User with user_id ${uid} added to db`);
                    })
                    .catch((err) => {
                        console.error("Error adding user data: ", err);
                    });
            }
        })
        .catch((error) => {
            console.error("Error checking for user:", error);
        });
};

const signIn = (firstTimeUserCallBack) => {
    signInWithPopup(auth, new GoogleAuthProvider())
        .then((result) => {
            handleUserLogin(result.user, firstTimeUserCallBack);
        })
        .catch((error) => {
            alert(error.message);
        });
};

const SignInButton = ({ firstTimeUserCallBack }) => {
    return (
        <button
            className="btn btn-dark"
            onClick={() => {
                signIn(firstTimeUserCallBack);
            }}
        >
            Sign in
        </button>
    );
};

const LoginPage = ({ firstTimeUserCallBack }) => (
    <div className="login">
        <div className="login-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Northwestern_wildcats_CMKY_80_100_0_0.svg" />
            <h1> FitNU </h1>
            <SignInButton firstTimeUserCallBack={firstTimeUserCallBack}></SignInButton>
        </div>
    </div>
);

export default LoginPage;