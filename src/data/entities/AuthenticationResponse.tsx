export interface AuthenticationResponse {
    id: number;
    name: string;
    email: string;
    phone: string;
    token: string;
    isActive: boolean;
    isAdmin: boolean;
    canReply: boolean;
}