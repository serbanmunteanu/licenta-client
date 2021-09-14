import React from "react";
import { useConversations } from "../context/ConversationsProvider";

interface ConversationProps {
  conversationId: number;
  secondUserName: string;
  updatedAt: string;
  conversationIndex: number;
}

const Conversation: React.FC<ConversationProps> = (conversation: ConversationProps) => {
  return (
    <div className="chat_list" >
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
        </div>
      </div>
    </div>
  );
}

export default Conversation;
