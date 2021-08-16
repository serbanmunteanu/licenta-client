export interface PostInterface {
  id: string;
  title: string;
  createdAt: string;
  userName: string;
  userId: string;
  tags: string[];
  commentsNumber: number;
  votes: number;
  views: number;
  lastComment: {
      userId: string;
      userName: string;
      text: string;
      createdAt: string;
  }
}