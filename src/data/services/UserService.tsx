import ServerService from "../api/ServerService"
import { AuthenticationResponse } from "../entities/AuthenticationResponse";

export default class UserService {
    static authenticate = (email: string, password: string) => {
        return ServerService.post<AuthenticationResponse>(
            `/auth/login`,
            {
                email,
                password
            }
        );
    };
}