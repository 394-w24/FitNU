import "./LoginPage.css";
import { signInWithGoogle } from "../utilities/firebase";

const SignInButton = () => {
    return (
        <button
            className="btn btn-dark"
            onClick={() => {
                signInWithGoogle();
            }}
        >
            Sign in
        </button>
    );
};

const LoginPage = () => (
    <div className="login">
        <div className="login-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Northwestern_wildcats_CMKY_80_100_0_0.svg" />
            <h1> FitNU </h1>
            <SignInButton></SignInButton>
        </div>
    </div>
);

export default LoginPage;