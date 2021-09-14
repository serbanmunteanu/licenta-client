import React, { useContext, useEffect, useState } from "react";
import Chat from "../components/Chat";
import Conversation from "../components/ChatContact";
import {
  ConversationsProps,
  useConversations,
} from "../context/ConversationsProvider";
import { UserContext } from "../context/UserContext";
import ConversationService from "../data/services/ConversationService";

interface Props {
  token: string;
  userId: number;
}
function Conversations(props: Props) {
  const { checkTicketValability } = useContext(UserContext);
  const [conversations, setConversations] = useState<ConversationsProps[]>([]);
  const [selectedConversationIndex, setSelectedConversationIndex] =
    useState<number>(0);

  useEffect(() => {
    checkTicketValability();
    ConversationService.getConversations(props.token)
      .then((response) => {
        setConversations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.token]);

  return (
    <>
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
                        onClick={(e) => {
                          setSelectedConversationIndex(index);
                        }}
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
            <Chat
              conversationId={
                conversations[selectedConversationIndex]?.conversationId
              }
              token={props.token}
              userId={props.userId}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Conversations;
