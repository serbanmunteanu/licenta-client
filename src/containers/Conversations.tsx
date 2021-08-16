import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import ChatContact from "../components/ChatContact";

function Conversations() {
  const [conversations, setConversations] = useState([1, 2, 3]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  useEffect(() => {
    setSelectedChat(conversations[0]);
  }, []);

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
                        onClick={() => {
                          setSelectedChat(conversation);
                        }}
                      >
                        <ChatContact />
                      </div>
                    ))
                  : ""}
              </div>
            </div>
            <Chat chatId={selectedChat} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Conversations;
