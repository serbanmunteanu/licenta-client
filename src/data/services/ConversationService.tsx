import ServerService from "../api/ServerService";

export default class ConversationService {
  static getConversations = (ticket: string) => {
    return ServerService.get(`/conversations`, {
      headers: { Authorization: ticket },
    });
  };

  static getConversationMessages = (ticket: string, conversationId: number) => {
    return ServerService.get(`/conversations/${conversationId}/messages`, {
      headers: { Authorization: ticket },
    });
  };
}
