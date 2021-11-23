export interface User {
    username: string;
    password: string;
    nickname: string;
    gender: string;
    age: string;
}

export interface Login {
    username: string;
    password: string;
}

export interface UserLoginInfo {
    _id: string;
    nickname: string;
    username: string;
}