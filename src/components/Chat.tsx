import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import ConversationService from "../data/services/ConversationService";
import IncomingMessage from "./IncomingMessage";
import OutcomingMessage from "./OutcomingMessage";

interface Props {
  chatId: number | null;
}

interface ConversationMessagesProps {
  id: number;
  content: string;
  userName: string;
  userId: number;
  createdAt: string;
}

const Chat: React.FC<Props> = (props: Props) => {
  const userContext = useContext(UserContext);
  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessagesProps[]
  >([]);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (props.chatId) {
      ConversationService.getConversationMessages(
        userContext.userData ? userContext.userData.token : "no-auth",
        props.chatId
      )
        .then((response) => {
          setConversationMessages(response.data);
          setHasLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.chatId]);

  if (!hasLoaded) {
    return <div>...loading</div>;
  }

  if (conversationMessages.length) {
    return (
      <div className="mesgs">
        <div className="msg_history">
          {conversationMessages.map((conversationMessage) => {
            if (conversationMessage.userId === userContext.userData?.id) {
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
        <div className="type_msg">
          <div className="input_msg_write">
            <input
              type="text"
              className="write_msg"
              placeholder="Type a message"
            />
            <button className="msg_send_btn" type="button">
              <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>no messages</div>;
  }
};

export default Chat;
