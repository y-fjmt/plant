import { useRecoilState } from "recoil";
import { LoginState } from "../components/atoms";

import NotifyList from "../components/NotifyList";
import Sidebar from "../components/Sidebar";

export default function NotifyPage() {

  return (
    <div>
        <Sidebar>
            <div className="">
                <NotifyList />
            </div>
        </Sidebar>
    </div>
  );
}