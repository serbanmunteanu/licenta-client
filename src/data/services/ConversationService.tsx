import ServerService from "../api/ServerService";

export default class ConversationService {
  static getConversations = (ticket: string) => {
    return ServerService.get(`/conversations`, {
      headers: { Authorization: ticket },
    });
  };
}
