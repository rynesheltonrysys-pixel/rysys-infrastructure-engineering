export interface DemoItem {
  id: string;
  name: string;
  value: number;
}
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface UserPublic {
  id: string;
  email: string;
  createdAt: string;
}
export interface AuthTokenPayload {
  uid: string;
  email: string;
  iat: number;
  exp: number;
}
export interface DocVersion {
  version: number;
  content: string;
  createdAt: string;
}
export interface Doc {
  id: string;
  ownerId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  versions: DocVersion[];
  sharedWith: string[];
}
export interface Comment {
  id: string;
  docId: string;
  version: number;
  authorId: string;
  authorEmail: string;
  text: string;
  createdAt: string;
}
export interface Message {
  id: string;
  fromId: string;
  fromEmail: string;
  toId?: string;
  toEmail?: string;
  text: string;
  createdAt: string;
}