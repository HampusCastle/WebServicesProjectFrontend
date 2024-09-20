// types/User.ts
export interface User {
    id: string; 
    name: string;
    email: string;
    phone: string;
    address: string;
    username: string;
    password: string;
    photoUrl?: string;
    role: string;
  }
  
  export interface NewUser {
    name: string;
    email: string;
    phone: string;
    address: string;
    username: string;
    password: string;
  }