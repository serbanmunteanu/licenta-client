import React from "react";
import Chat from "../components/Chat";
import Conversation from "../components/ChatContact";
import { useConversations } from "../context/ConversationsProvider";

function Conversations() {
  const { conversations, selectedConversation } = useConversations();

return <>
      <div className="container-fluid mx-0 px-0">
        <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div className="srch_bar">
                  <div className="stylish-input-group">
                    <input
                      type="text"
                      className="search-bar"
                      placeholder="Search"
                    />
                    <span className="input-group-addon">
                      <button type="button">
                        {" "}
                        <i className="fa fa-search" aria-hidden="true"></i>{" "}
                      </button>
                    </span>{" "}
                  </div>
                </div>
              </div>
              <div className="inbox_chat">
                {conversations
                  ? conversations.map((conversation, index) => (
                      <div
                        key={index}
                      >
                        <Conversation
                          conversationId={conversation.conversationId}
                          secondUserName={conversation.secondUserName}
                          updatedAt={conversation.updatedAt}
                          conversationIndex={index}
                        />
                      </div>
                    ))
                  : ""}
              </div>
            </div>
            <Chat conversation={selectedConversation} />
          </div>
        </div>
      </div>
    </>
}

export default Conversations;
