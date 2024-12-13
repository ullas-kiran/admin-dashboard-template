
// Define the shape of the state
export interface StoreState {
  userId: number|null;
  currentUser: { 
    id: string;
    name: string;
    email: string;
    is_active: string;
    created_at: string;
    updated_at: string;
  }[]; // Array of user objects
}


export type Action =
  | { type: "ADD_USER"; payload: { id: string; name: string; email: string; is_active: string; created_at: string; updated_at: string } }
  | { type: "REMOVE_USER"; payload: string } // Removing by id
  | { type: "SET_USER_ID"; payload: number }; // Set userId

export const storeReducer = (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, currentUser: [...state.currentUser, action.payload] };
    case "REMOVE_USER":
      return { ...state, currentUser: state.currentUser.filter(user => user.id !== action.payload) }; 
    case "SET_USER_ID":
      return { ...state, userId: action.payload }
    default:
      return state;
  }
};
