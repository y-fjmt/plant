import * as React from "react";
import { useSession, signIn, signOut } from "next-auth/react"

interface Props {
    window?: () => Window;
}

const Signin: React.FC<Props> = (props) => {
    return (
        <div className="bg-red-700 w-screen h-screen text-center">
            <p>ログインしてください</p>

            <button onClick={() => signIn()}>Sign in</button>
        </div>
    );
};

export default Signin;