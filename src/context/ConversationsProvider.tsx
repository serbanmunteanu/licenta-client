import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import ConversationService from "../data/services/ConversationService";

export interface ConversationMessageProps {
  content: string;
  userId: number;
  createdAt: Date;
  sentimentScore: number;
}

export interface ConversationsProps {
  conversationId: number;
  secondUserName: string;
  updatedAt: string;
}

interface IConversationsContext {
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
  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessageProps[]
  >([]);


  return (
    <ConversationsContext.Provider value={{}}>
      {children}
    </ConversationsContext.Provider>
  );
};
