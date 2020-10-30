import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersRequest,
  fetchUsersFailure,
  fetchUsersSuccess,
} from "../redux";

function UserContainer() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchUsers = useCallback(() => {
    return (dispatch) => {
      dispatch(fetchUsersRequest());
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          const users = response.data;
          dispatch(fetchUsersSuccess(users));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchUsersFailure(errorMsg));
        });
    };
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, fetchUsers]);

  return userData.loading ? (
    <h2>Loading users..</h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : (
    <div>
      <h2>User List</h2>
      <div>
        {userData &&
          userData.data &&
          userData.data.map((user) => <p key={user.id}>{user.name}</p>)}
      </div>
    </div>
  );
}

export default UserContainer;
