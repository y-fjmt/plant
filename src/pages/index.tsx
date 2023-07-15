import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

import Signin from "../components/Signin";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT || '';
console.log(process.env.NEXT_PUBLIC_API_ENDPOIN)

export default function Component() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session && typeof session.user !== "undefined") {
      console.log(session.user);

      // ユーザーデータを取得
      axios
        .post("/login", {
          userId: session.user.email,
          userName: session.user.name,
        })
        .then((res) => {
          console.log(res);
        });
    }
  }, [session]);

  if (session) {
    return (
      <div>
        <p>HOME</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }else{
    return <Signin />;
  }
}
