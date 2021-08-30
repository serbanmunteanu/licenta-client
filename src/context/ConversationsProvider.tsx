import React, { useCallback, useContext, useEffect, useState } from "react";
import Conversation from "../components/ChatContact";
import ConversationService from "../data/services/ConversationService";
import { useSocket } from "./SocketContext";

interface ConversationMessageProps {
  content: string;
  userId: number;
  createdAt: string;
}

interface ConversationsProps {
  conversationId: number;
  secondUserName: string;
  updatedAt: string;
  messages: ConversationMessageProps[];
}

interface IConversationsContext {
  conversations: ConversationsProps[];
  sendMessage: (conversationId: number, message: ConversationMessageProps) => void;
  selectedConversation: ConversationsProps
}

interface ConversationProviderProps {
  token: string;
  children: JSX.Element;
}

const ConversationsContext =
  React.createContext<IConversationsContext>({} as IConversationsContext);

export function useConversations() {
  return useContext(ConversationsContext);
}

export const ConversationsProvider: React.FC<ConversationProviderProps> = ({
  token,
  children,
}) => {
  const [conversations, setConversations] = useState<ConversationsProps[]>([]);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState<number>(0)
  const { socket } = useSocket();

  const addMessageToConversation = useCallback(
    (conversationId: number, message: ConversationMessageProps) => {
      const conversationIndex = conversations.findIndex(
        (conversation) => conversation.conversationId === conversationId
      );
      const newConversations = conversations;
      newConversations[conversationIndex].messages.push(message);
      setConversations(newConversations);
    },
    [setConversations]
  );

  useEffect(() => {
    ConversationService.getConversations(token)
      .then((response) => {
        setConversations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("receive-message", addMessageToConversation);
  }, [socket, addMessageToConversation]);

  function sendMessage(conversationId: number, message: ConversationMessageProps) {
    socket?.emit("send-message", { conversationId, message });
    addMessageToConversation(conversationId, message);
  }

  const value = {
    conversations,
    sendMessage,
    selectedConversation: conversations[selectedConversationIndex]
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};