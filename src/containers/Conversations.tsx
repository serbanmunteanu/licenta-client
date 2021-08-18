import React, { useContext, useEffect, useState } from "react";
import Chat from "../components/Chat";
import Conversation from "../components/ChatContact";
import { UserContext } from "../context/UserContext";
import ConversationService from "../data/services/ConversationService";

interface ConversationProps {
  id: number;
  secondUserName: string;
  updatedAt: string;
}

function Conversations() {
  const userContext = useContext(UserContext);
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  useEffect(() => {
    ConversationService.getConversations(userContext.userData ? userContext.userData.token : 'no-token')
      .then((response: any) => {
        setConversations(response.data);
        setSelectedChat(response.data.length ? response.data[0].id : null);
      })
      .catch((error: any) => {
        console.log(error);
      });
    setHasLoaded(true);
  }, []);

  return hasLoaded 
      ? <>
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
                        onClick={() => {
                          setSelectedChat(conversation.id);
                        }}
                      >
                        <Conversation
                          id={conversation.id}
                          secondUserName={conversation.secondUserName}
                          updatedAt={conversation.updatedAt}
                        />
                      </div>
                    ))
                  : ""}
              </div>
            </div>
            <Chat chatId={hasLoaded ? selectedChat : null} />
          </div>
        </div>
      </div>
    </>
    : <div>loading</div>
}

export default Conversations;
