import React, { useContext, useEffect, useState } from "react";
import {
  ConversationMessageProps,
  ConversationsProps,
} from "../context/ConversationsProvider";
import { useSocket } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import ConversationService from "../data/services/ConversationService";
import IncomingMessage from "./IncomingMessage";
import OutcomingMessage from "./OutcomingMessage";

interface Props {
  conversation: ConversationsProps;
}

const Chat: React.FC<Props> = (props: Props) => {
  const { userData, checkTicketValability } = useContext(UserContext);
  const { socket, sendMessage } = useSocket();
  const [text, setText] = useState<string>("");
  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessageProps[]
  >([]);

  useEffect(() => {
    checkTicketValability();
    if (userData && props.conversation) {
      ConversationService.getConversationMessages(
        userData.token,
        props.conversation?.conversationId
      )
        .then((response: any) => {
          setConversationMessages(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.conversation]);

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', ({ message}) => {
        console.log(message);
      })
    }
  },[socket])

  const handleSubmit = (event: any) => {
    if (userData) {
      event.preventDefault();
      const message = {
        conversationId: props.conversation.conversationId,
        content: text,
        userId: userData.id,
        createdAt: new Date(),
      };
      sendMessage(message);
      setConversationMessages([
        ...conversationMessages,
        {
          content: message.content,
          userId: message.userId,
          createdAt: message.createdAt,
        },
      ]);
    }
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
            onClick={(e) => handleSubmit(e)}
          >
            <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
