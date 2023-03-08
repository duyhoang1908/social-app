import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSlice } from "../../../store/User";

const UserBox = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleLogout = () => {
    dispatch(userSlice.actions.setUser({}));
    localStorage.removeItem("user");
    history("/login");
  };
  return (
    <div className="hidden absolute top-full right-0 min-w-[200px] rounded-2xl shadow-sm bg-white border py-2 px-4 group-hover:block">
      <div className="hover:font-semibold" onClick={handleLogout}>
        Log out
      </div>
    </div>
  );
};

export default UserBox;
