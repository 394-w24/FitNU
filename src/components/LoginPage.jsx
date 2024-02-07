import "./LoginPage.css";
import { auth, database } from "../utilities/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ref, child, get, set } from "firebase/database";
import { matchableClear, seenProfilesClear } from "./ProfileHandler";

const handleUserLogin = (user, firstTimeUserCallBack) => {
    // console.log(user);
    const uid = user.uid;
    const usersRef = child(ref(database), "users");
    const eventRef = child(ref(database), "events");

    seenProfilesClear();
    matchableClear();
    get(usersRef)
        .then((snapshot) => {
            if (snapshot.exists() && snapshot.hasChild(uid)) {
                console.log(`User with user_id ${uid} exists in /users.`);

            } else {
                // new user login
                firstTimeUserCallBack(true);
                console.log(`User with user_id ${uid} does not exist in /users.`);

                const userData = {
                    name: user.displayName,
                    email: user.email,
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

    // get(eventRef)
    //     .then((snapshot) => {
    //         if (snapshot.exists() && snapshot.hasChild(uid)) {
    //             matchableClear()
    //             console.log(`User with user_id ${uid} exists in /events.`);

    //         } else {
    //             // new user login
    //             firstTimeUserCallBack(true);
    //             console.log(`User with user_id ${uid} does not exist in /events.`);

    //             const eventData = {
    //                 name: user.displayName
    //             };
    //             const newEventRef = ref(database, `events/${uid}`);
    //             set(newEventRef, eventData)
    //                 .then(() => {
    //                     console.log(`User_id ${uid} added to db with no events`);
    //                 })
    //                 .catch((err) => {
    //                     console.error("Error adding user data: ", err);
    //                 });

    //         }
    //     })
    //     .catch((error) => {
    //         console.error("Error checking for user in events:", error);
    //     });
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