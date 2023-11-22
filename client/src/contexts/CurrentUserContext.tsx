"use client";

import { createContext, useContext, useState } from "react";
import { UserType } from '../utils/Types';

interface ContextType {
  currentUser: UserType | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

export const CurrentUserContext = createContext<ContextType | null>(null);

export const CurrentUserContextProvider = ({children}:{
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<UserType | null> (null);

  return (
    <CurrentUserContext.Provider value= {{currentUser, setCurrentUser}}>
{/* All the children will have this */}
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUserContext = () => useContext(CurrentUserContext);