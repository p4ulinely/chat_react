import { useEffect, useState, useContext, useRef } from 'react';
import { ChatContext } from './../contexts/ChatContext';
import { Msg } from './Msg';

export const Chat = () => {
    const lastMsgDiv = useRef(null)
    const [bodyMessage, setBodyMessage] = useState('')
    const {
        msgs,
        insereNovaMsg,        
        coletaMsgs,
        limpaFeedMsgs
    } = useContext(ChatContext)

    const handleSendMessageButton = (e) => {
        const msg = bodyMessage.trim()

        e.preventDefault();

        if(msg === '')
            return

        insereNovaMsg(msg)
        limpaMsg()
    }
    
    const limpaMsg = () => setBodyMessage('')

    const scrollToFeedEnd = () => {
        lastMsgDiv.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    useEffect(() => {
        coletaMsgs()
        return limpaFeedMsgs       
    }, [])
    
    useEffect(() => {
        scrollToFeedEnd();
    }, [msgs])

    return (
        <>
            <div className="Msgs-chat">
                {msgs.length < 1 
                    ? 'carregando msgs...'
                    : msgs.map((msg, i) => (
                        <Msg key={i} body={msg.body} user={msg.user} ultimaMsg={lastMsgDiv} />
                    ))
                }
            </div>
            <form>
                <input value={bodyMessage} type="text" onChange={e => setBodyMessage(e.target.value)} placeholder='digite sua msg'/>
                <button onClick={handleSendMessageButton}>enviar</button>
            </form>
        </>
    );    
}
