import React from "react";
import { useConversations } from "../context/ConversationsProvider";

interface ConversationProps {
  conversationId: number;
  secondUserName: string;
  updatedAt: string;
  conversationIndex: number;
}

const Conversation: React.FC<ConversationProps> = (conversation: ConversationProps) => {
  const { setSelectedConversationIndex } = useConversations();

  return (
    <div className="chat_list" onClick={() => {setSelectedConversationIndex(conversation.conversationIndex)}}>
      <div className="chat_people">
        <div className="chat_img">
          {" "}
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />{" "}
        </div>
        <div className="chat_ib">
          <h5>
            {conversation.secondUserName} <span className="chat_date">{new Date(conversation.updatedAt).toLocaleString()}</span>
          </h5>
          <p>
            Test, which is a new approach to have all solutions astrology under
            one roof.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
