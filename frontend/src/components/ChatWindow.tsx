import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addMessage, setMessages } from "../features/chat/chatSlice";
import { fetchMessages } from "../features/chat/chatAPI";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatWindow() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const messages = useSelector((state: RootState) => state.chat.messages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (token) {
      fetchMessages(token).then(data => {
        dispatch(setMessages(data));
      });
    }
    socket.on("receiveMessage", (msg) => {
      dispatch(addMessage(msg));
    });
    return () => { socket.off("receiveMessage"); };
  }, [token, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("sendMessage", { token, content: input });
      dispatch(addMessage({ content: input, sender: user?.username || "Me" }));
      setInput("");
    }
  };

  return (
    <div style={{border: "1px solid #ccc", padding: 20, height: 400, overflow: "auto"}}>
      {messages.map((msg, i) => (
        <div key={i}><strong>{msg.sender}:</strong> {msg.content}</div>
      ))}
      <div ref={messagesEndRef} />
      <form onSubmit={e => {e.preventDefault(); sendMessage();}} style={{marginTop: 10}}>
        <input value={input} onChange={e => setInput(e.target.value)} style={{width: "80%"}} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}