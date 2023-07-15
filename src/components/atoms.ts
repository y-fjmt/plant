import { atom } from "recoil";

//count
export const LoginState = atom({
    key: "user",
    default: {
        name: '',
        email: '',
        icon: '' 
    }
});