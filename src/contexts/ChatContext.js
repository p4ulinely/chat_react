import { useState, useRef, createContext } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const urlChat = process.env.REACT_APP_URL_CHAT
    const [msgs, setMsgs] = useState([])
    const temp = useRef(null)

    const insereNovaMsg = (body) => {
        const novaMsg = {body, user: { url: '', name: 'logged dude', color: '#000000'}}
        setMsgs(prev => [...prev, novaMsg])
    }
    
    const coletaMsgs = () => {
        const msg1 = {body: 'oie caras..', user: { url: '', name: 'Dude1', color: '#000000'}}
        const msg2 = {body: 'people soh bora..', user: { url: '', name: 'Dude2', color: '#555555'}}

        temp.current = setInterval(() => {
            setMsgs(prev => [...prev, msg1, msg2]) 
            console.log('coletando msgs');
        }, 2000)
    }
    
    const limpaFeedMsgs = () => {
        setMsgs([])

        if (temp.current !== null)
            clearInterval(temp.current)

        console.log('limpou feed msgs');
    }

    return (
        <ChatContext.Provider
            value={{
                msgs,
                insereNovaMsg,
                coletaMsgs,
                limpaFeedMsgs
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}
