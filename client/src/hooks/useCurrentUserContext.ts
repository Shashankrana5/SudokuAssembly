import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const useCurrentUserContext = () => {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw Error(
      "useCurrentUserContext needs to be wrapped around the provider",
    );
  }
  return context;
};