import { useState, useEffect, useRef } from 'react';
import socket from './socket';
import type { Message } from './types';
import './App.css';

export default function App() {
  const [username, setUsername]   = useState<string>(localStorage.getItem('username') || '');
  const usernameRef = useRef('');
  const [joined, setJoined]       = useState<boolean>(false);
  const [messages, setMessages]   = useState<Message[]>([]);
  const [inputMsg, setInputMsg]   = useState<string>('');
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  
  useEffect(() => {
    usernameRef.current = username; // manter o ref sincronizado com o estado
  }, [username]);

  useEffect(() => {
    socket.on('connect', () => {
      setConnecting(false);
      setConnected(true);
      
      const currentUsername = usernameRef.current || localStorage.getItem('username') || 'Anónimo';
      setJoined(true);
      // addSystemMsg(`Bem-vindo, ${usernameRef.current}!`);
      if (currentUsername) {
      setJoined(true);
        // Usamos setMessages direto para evitar dependência de addSystemMsg
        setMessages(prev => [...prev, { type: 'system', 
          text: `Bem-vindo, ${currentUsername}!` }]);
        }
      });

    socket.on('disconnect', () => {
      // socket.disconnect(); 
      setConnecting(false);
      setConnected(false);
      setJoined(false);
      setMessages(prev => [...prev, { type: 'system', 
          text: 'Ligação perdida ao servidor.' }]);
    });

    socket.on('broadcast_message', (data) => {
      console.log('broadcast_message recebido:', data);
      setMessages(prev => [...prev, {
        type: 'message',
        id: data.id,
        username: data.username,
        message: data.message,
        image: data.image,
        timestamp: data.timestamp,
        own: data.id === socket.id
      }]);
    });

    socket.on('connect_error', () => {
      setConnecting(false);
      setConnected(false);
      setJoined(false);
      setMessages(prev => [...prev, { type: 'system', 
          text: 'Ligação perdida ao servidor.' }]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('broadcast_message');
      socket.off('connect_error');
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleJoin() {
    if (!username.trim()) 
      return;
    localStorage.setItem('username', username); 
    setConnecting(true);
    socket.connect();
  }

  function handleDisconnect() {
    socket.disconnect();
    setJoined(false);
    setMessages([]);
    setConnected(false);
  }

  function handleSend() {
    if (!inputMsg.trim()) return;
    socket.emit('send_message', { username, message: inputMsg.trim() });
    setInputMsg('');
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      const res  = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      console.log('upload response:', data);

      socket.emit('send_message', {
        username,
        image: `http://localhost:3000${data.url}`
      });
    } catch (err) {
      console.error('Erro no upload:', err);
    }
  }

  if (!joined) {
    return (
      <div className="login">
        <h1>💬 Chat</h1>
        <p>Socket.io + React</p>
        <input
          type="text"
          placeholder="O teu nome..."
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleJoin()}
          maxLength={20}
        />
        <button onClick={handleJoin} disabled={connecting}>
          {connecting ? 'A ligar...' : 'Entrar'}
        </button>
        {connecting && <p>A tentar ligar ao servidor...</p>}
      </div>
    );
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <span className={`dot ${connected ? 'online' : 'offline'}`} />
        <span>Chat — @{username}</span>
        <button onClick={handleDisconnect}>Desligar</button>
      </div>

      <div className="messages">
        {messages.map((msg, i) => {
          if (msg.type === 'system') {
            return <div key={i} className="msg-system">{msg.text}</div>;
          }
          return (
            <div key={i} className={`msg ${msg.own ? 'own' : 'other'}`}>
              <div className="meta">{msg.own ? 'Tu' : msg.username} · {msg.timestamp}</div>
              {msg.message && <div>{msg.message}</div>}
              {msg.image && <img src={msg.image} alt="imagem" style={{ maxWidth: '100%', borderRadius: '8px' }} />}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>


      <div className="chat-input">
        {/* input image */}
        <label htmlFor="image-upload">🖼️</label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        {/* input text  */}
        <input
          type="text"
          placeholder="Escreve uma mensagem..."
          value={inputMsg}
          onChange={e => setInputMsg(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}