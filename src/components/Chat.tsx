import React, { useContext, useEffect, useRef, useState } from "react";
import { ConversationMessageProps } from "../context/ConversationsProvider";
import { useSocket } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import ConversationService from "../data/services/ConversationService";
import IncomingMessage from "./IncomingMessage";
import OutcomingMessage from "./OutcomingMessage";

interface Props {
  conversationId: number | null;
  token: string;
  userId: number;
}

const Chat: React.FC<Props> = (props: Props) => {
  const { userData, checkTicketValability } = useContext(UserContext);
  const [text, setText] = useState<string>("");
  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessageProps[]
  >([]);
  const { socket } = useSocket();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    checkTicketValability();
    if (props.conversationId) {
      ConversationService.getConversationMessages(
        props.token,
        props.conversationId
      )
        .then((response) => {
          setConversationMessages(response.data);
          if (socket) {
            socket.emit("join-room", { conversationId: props.conversationId });
          }
          scrollToBottom();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.conversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (message) => {
        onReceiveMessage(message);
      });
    }
  }, [socket, conversationMessages]);

  const onReceiveMessage = (message: any) => {
    console.log(message);
    addMesage(message);
    scrollToBottom();
  };

  const sendMessage = (message: any) => {
    if (socket) {
      socket.emit("send-message", { message });
      setText("");
    }
  };

  const addMesage = (message: any) => {
    const newMessages = [
      ...conversationMessages,
      {
        content: message.content,
        userId: message.userId,
        createdAt: message.createdAt,
      },
    ];
    setConversationMessages(newMessages);
  };

  return (
    <div className="mesgs">
      {conversationMessages.length ? (
        <div className="msg_history">
          {conversationMessages.map((conversationMessage) => {
            if (conversationMessage.userId === userData?.id) {
              return (
                <OutcomingMessage
                  date={conversationMessage.createdAt}
                  content={conversationMessage.content}
                />
              );
            } else {
              return (
                <IncomingMessage
                  date={conversationMessage.createdAt}
                  content={conversationMessage.content}
                />
              );
            }
          })}
          <div ref={messagesEndRef}>{""}</div>
        </div>
      ) : (
        <div className="msg_history">Start conversation now</div>
      )}
      <div className="type_msg">
        <div className="input_msg_write">
          <input
            type="text"
            className="write_msg"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="msg_send_btn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              sendMessage({
                conversationId: props.conversationId,
                content: text,
                userId: props.userId,
              });
            }}
          >
            <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
