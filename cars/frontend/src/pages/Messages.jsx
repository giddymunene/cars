import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/messages").then((res) => setMessages(res.data));
  }, []);

  return (
    <div className="messages-page">
      <h2>User Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul className="message-list">
          {messages.map((msg) => (
            <li key={msg._id}>
              <strong>{msg.name}</strong> ({msg.email})<br />
              <p>{msg.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;
