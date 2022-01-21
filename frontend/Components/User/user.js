import { Fragment, useEffect, useState } from "react";
import { loadUser } from "./action_creator";
import { getUser } from "./selector";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

function User() {
  const [User, setUser] = useState([]);
  const dispatch = useDispatch();
  const { data, loading, loaded } = useSelector(getUser, shallowEqual);

  function loadUserList() {
    dispatch(loadUser());
  }

  useEffect(
    function insideEffect() {
      if (!loading && loaded) {
        setUser(data);
      }
    },
    [data, loading, loaded]
  );

  return (
    <Fragment>
      <br />
      <button onClick={loadUserList}>Load User</button>
      <br />
      {loading && <div>Loading...</div>}
      {loaded &&
        User.map(function mapUserIntoVisualComponents(user) {
          return <div key={user.id}>{JSON.stringify(user)}</div>;
        })}
    </Fragment>
  );
}

export default User;
