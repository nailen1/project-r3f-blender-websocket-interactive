import { useRef } from "react";
import "./Login.css";
import { atom, useAtom } from "jotai";
import { socket } from "./ServerConnector";


export const userNameAtom = atom()

export default function Login() {
    const refInput = useRef()
    const [userName, setUserName] = useAtom(userNameAtom)

    const login = () => {
        const name = refInput.current.value.trim()
        if (name.length > 0) {
            setUserName(name)
            // join 이라는 이벤트 사용자가 정의.
            socket.emit("join", name)
        }
    }
    
    return <>
    <div className="login-layout">
        <div className="name">YOUR NAME</div>
        <input ref={refInput}/>
        <button onClick={login}>JOIN</button>
    </div>
    </>
}