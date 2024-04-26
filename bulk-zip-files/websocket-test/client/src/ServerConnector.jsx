import { useEffect } from "react";
import {io} from "socket.io-client";
import { atom, useAtom } from "jotai";

export const socket = io("http://localhost:3001")

export const charactersAtom = atom([])


export default function ServerConnector() {
    const [characters, setCharacters] = useAtom(charactersAtom)

    const onConnect = () => {
        console.log("connected");
    }
    const onDisconnect = () => {
        console.log("disconnected");
    }
    const onCharacters = (characters) => {
        console.log("characters", characters);
        setCharacters(characters)
    }

    useEffect(() => {
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("characters", onCharacters); 

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        }
    }, []);
}
