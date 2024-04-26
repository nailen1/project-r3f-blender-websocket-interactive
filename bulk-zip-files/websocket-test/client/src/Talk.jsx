import { useAtom } from "jotai";
import { charactersAtom } from "./ServerConnector";
import "./Talk.css";
import { useRef } from "react";
import { socket } from "./ServerConnector";

export default function Talk() {
    const [characters] = useAtom(charactersAtom)
    const refInput = useRef()

    const talk = () =>{
        const talk = refInput.current.value.trim()
        if(talk.length > 0) {
            socket.emit("talk", talk)
            refInput.current.select()
        }
    }

    const keyDown = (event) => {
        event.stopPropagation();
    
        if(event.key === "Enter") {
            talk()
        }
    }


    return <>
    <div className="characters-list">
        <div>접속자</div>
        {
            characters.map((item, index) => {
                return <div className="character-name" key={index}>{item.name}</div>
            })
        }    
    </div>
    <div className="message">
        <div>메세지</div>
        <input ref={refInput} onKeyDown={keyDown}/>
    </div>
    <div>
        {
            characters.map((item, index) => {
                item.talk ? <div key={index}>{item.name} : {item.talk}</div> : null
            })
        }
    </div>
    </>
}