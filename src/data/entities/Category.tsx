export interface CategoryResponse {
    id: number;
    name: string;
    shortDescription: string;
    image: string;
    color: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    postsNumber: number;
    commentsNumber: number;
    lastPost: {
        userId: string;
        userName: string;
        text: string;
        updatedAt: Date;
    }
}