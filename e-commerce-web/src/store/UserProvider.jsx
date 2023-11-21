import { useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "./user-context.jsx";

export const UserProvider = (props) => {
  const [user, setUser] = useState({});

  const updateUser = (user) => {
    setUser(user);
  };

  const userContext = {
    user: user,
    updateUser: updateUser
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.any
};