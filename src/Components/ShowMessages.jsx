import { useParams } from "react-router-dom";
import socket from "../socket/socket.js";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const ShowMessages = () => {
  const { channelId } = useParams();
  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!channelId) return;

    const handleReceiveMessage = (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/message/getMessages/${channelId}`,
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };

    setMessages([]);
    fetchMessages();

    socket.emit("join_channel", channelId);
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.emit("leave_channel", channelId);
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [channelId]);

  return (
    <div className="flex flex-col gap-2 p-4">
      {messages.map((m) => (
        <div key={m._id} className="text-white">
          <span className="font-bold">{m.sender?.username || "Unknown"}:</span>{" "}
          {m.content}
          <p className="text-xs text-gray-400">
            {new Date(m.createdAt).toLocaleTimeString()}
          </p>
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default ShowMessages;
