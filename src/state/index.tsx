import  { createContext, ReactNode, useReducer } from "react";
import { storeReducer, StoreState } from "./reducer"; 
import { addUser, removeUser, setUserId } from "./action"; 

// Create context with initial undefined state
export const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<any>;
} | undefined>(undefined);

// Initial state
const initialState: StoreState = {
  userId: null,
  currentUser: [],
};


export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);


  const value = { state, dispatch };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
