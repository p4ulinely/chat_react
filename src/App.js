import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ChatProvider } from './contexts/ChatContext';
import { Chat } from './components/Chat';

const estiloMain = {
    textAlign: "center" 
}

function App() {
    const [logged, setLogged] = useState(false)

    const handleJoinChatButton = () => setLogged(true);
    const handleLeaveChatButton = () => setLogged(false);

    return (
        <div style={estiloMain}>
            <img src={logo} className="App-logo" alt="App-logo" />
            <h1>chat-app</h1>
            {!logged && <button onClick={handleJoinChatButton}>join chat</button>}
            {logged && 
                <>
                    <p align="right">
                      <button onClick={handleLeaveChatButton}>leave chat</button>
                    </p>
                    <ChatProvider>
                        <Chat />
                    </ChatProvider>
                </>
            }
        </div>
    );
}

export default App;
