// storeActions.ts

import { Action } from '../reducer';

// Action creators for adding and removing users, and setting userId
export const addUser = (user: { id: string; name: string; email: string; is_active: string; created_at: string; updated_at: string }): Action => ({
  type: "ADD_USER",
  payload: user,
});

export const removeUser = (userId: string): Action => ({
  type: "REMOVE_USER",
  payload: userId,
});

export const setUserId = (userId: number): Action => ({
  type: "SET_USER_ID",
  payload: userId,
});
