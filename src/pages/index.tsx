import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link'


import { useRecoilState } from "recoil";
import { LoginState } from "../components/atoms";

import Signin from "../components/Signin";
import Sidebar from "../components/Sidebar";
import axios from "axios";

import Recommend from "../components/recommend";

var hasPost = false;

export default function Component() {

  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useRecoilState(LoginState);

  useEffect(() => {
    if (session && typeof session.user !== "undefined") {
    
      setUserInfo({
        email: session.user.email ?? '', 
        name: session.user.name ?? '', 
        icon: session.user.image ?? '', 
      })
      
      // ユーザーデータを取得
      if(hasPost == false && userInfo.email != '' && userInfo.name != ''){
        hasPost = true;
        axios
        .post("/login", {
          userId: userInfo.email,
          userName: userInfo.name,
        })
        .then((res) => {
          console.log(res);
        });
      }      
    }
  }, [session]);

  if (session) {
    return (
      <div>
        <Sidebar>
          <Recommend/>
        </Sidebar>
      </div>
    );
  }else{
    return <Signin />;
  }
}