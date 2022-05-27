import { getUserData } from './apiCalls';

export function updateLoggedUserData(id) {
    return getUserData(id);
}