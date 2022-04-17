import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useContext, useRef } from 'react';
import { ChatContext, ChatProvider } from './contexts/ChatContext';

const estiloMain = {
    textAlign: "center" 
    
}

const Msg = ({body, user, ultimaMsg}) => {
    const estiloMsg = {
        borderStyle: 'solid',
        marginTop: '1px'
    }

    return (
        <div ref={ultimaMsg} style={estiloMsg}><b>{user.name}</b>: {body}</div>
    );
}

const Chat = () => {
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
        <div>
            <div className="Msgs-chat">
                {msgs.length < 1 
                    ? 'carregando msgs...'
                    : msgs.map((msg, i) => (
                        <Msg key={i} body={msg.body} user={msg.user} ultimaMsg={lastMsgDiv} />
                    ))
                }
            </div>
            <form>
                <input value={bodyMessage} type="text" onChange={e => setBodyMessage(e.target.value)} placeholder='type ur msg...'/>
                <button onClick={handleSendMessageButton}>enviar</button>
            </form>
        </div>
    );    
}

function App() {
    const [logged, setLogged] = useState(false)
    
    const handleJoinChatButton = () => {
        setLogged(true);
    }

    const handleLeaveChatButton = () => {
        setLogged(false);
    }

    return (
        <div style={estiloMain}>
            <img src={logo} className="App-logo" alt="App-logo" />
            <h1>chat-app</h1>
            {!logged && <button onClick={handleJoinChatButton}>join chat</button>}
            {logged && 
                <div>
                    <button onClick={handleLeaveChatButton}>leave chat</button>
                    <ChatProvider>
                        <Chat />
                    </ChatProvider>
                </div>}
        </div>
    );
}

export default App;
