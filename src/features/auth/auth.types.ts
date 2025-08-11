export type SignupData = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;   
}

export type LoginData = {
    email: string;
    password: string;
}

export type ForgotPasswordData = {
    email: string;
}

// User profile type based on the actual API response
export type UserProfile = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    avatar_url: string | null;
    bio: string | null;
    role: string;
    status: string;
    email_verified: boolean;
    created_at: string;
    updated_at: string;
}

// API response types
export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
}

export type GetUserResponse = ApiResponse<{
    user: UserProfile;
}>

// user may edit any data from profile
export type EditUserData = {
    firstName: string;
    lastName: string;
    username: string;
    email?: string;
    bio?: string;
}