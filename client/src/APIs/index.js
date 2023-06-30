import { multipartApi } from './axios';

// auth
export const login = (data) => multipartApi('auth/login', 'POST', data)
export const register = (data) => multipartApi('auth/register', 'POST', data)
export const update = (data) => multipartApi('user/update-profile', 'PATCH', data)
export const updatePassword = (data) => multipartApi('user/change-password', 'PATCH', data)
export const deleteUser = (data) => multipartApi('user/delete-account', 'DELETE', data)