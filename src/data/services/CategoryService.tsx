import ServerService from "../api/ServerService"

export default class CategoryService {
    static getCategories = () => {
        return ServerService.get(`/categories`);
    }
}