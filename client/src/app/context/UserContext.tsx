"use client";

import { createContext, useContext, useState } from "react";
// import { UserType } from '../utils/Types';

type UserType = {
    username: string,
    // firstName: string,
    // lastName: string,
    // email: string
}

interface ContextType {
  currentUser: UserType;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType>>;
}

export const UserContext = createContext<ContextType | null>(null);

export const UserContextProvider = ({children}:{
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<UserType> ({username: ""});

  return (
    <UserContext.Provider value= {{currentUser, setCurrentUser}}>
{/* All the children will have this */}
      {children}
    </UserContext.Provider>
  )
}