import ServerService from "../api/ServerService"

export default class CategoryService {
    static getCategories = () => {
        return ServerService.get(`/categories`);
    }

    static getCategoryPosts = (categoryId: number) => {
        return ServerService.get(`/categories/${categoryId}/posts`);
    }
}