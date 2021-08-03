export interface AuthenticationResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    token: string;
    isActive: boolean;
    canReply: boolean;
}