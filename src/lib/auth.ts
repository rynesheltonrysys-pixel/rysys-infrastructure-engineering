const AUTH_KEY = 'rysys_auth_token';
const USER_KEY = 'rysys_user_data';
export const getToken = () => localStorage.getItem(AUTH_KEY);
export const setToken = (token: string) => localStorage.setItem(AUTH_KEY, token);
export const setUser = (user: any) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = () => {
    const u = localStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
};
export const clearAuth = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
};
export const isAuthed = () => !!getToken();
export const authHeader = () => ({
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json'
});