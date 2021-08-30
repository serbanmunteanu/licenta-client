import React from "react";

interface ConversationProps {
  conversationId: number;
  secondUserName: string;
  updatedAt: string;
}

const Conversation: React.FC<ConversationProps> = (conversation: ConversationProps) => {
  return (
    <div className="chat_list">
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
