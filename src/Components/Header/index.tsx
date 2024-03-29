import { useState } from "react";
import {
  FaBars,
  FaRegCommentDots,
  FaSearch,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSelector, userSlice } from "../../store/User";

const Header = () => {
  const { userInfo } = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const handleLogout = () => {
    dispatch(userSlice.actions.setUser({}));
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-5 py-3 md:py-0 gap-3">
      <Link to="/">
        <img
          src="https://doanhnghiep.quocgiakhoinghiep.vn/wp-content/uploads/2020/08/26-1.png"
          alt="logo"
          className="w-24 md:w-56"
        />
      </Link>
      <div className="w-2/3 md:w-1/3">
        <form
          className="flex bg-inputColor items-center p-2 px-3 rounded-full gap-2"
          onSubmit={() => {
            navigate(`/search/${search}`);
          }}
        >
          <span>
            <FaSearch />
          </span>
          <input
            type="text"
            className="bg-transparent flex-1 outline-none"
            placeholder="Tìm kiếm bạn bè..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="hidden md:flex gap-5 ">
        <Link
          to={`/message?uid=${userInfo.uid}`}
          className="p-4 bg-inputColor rounded-full"
        >
          <FaRegCommentDots />
        </Link>
        <Link
          to={`/user/${userInfo.uid}`}
          className="p-4 bg-inputColor rounded-full"
        >
          <FaUserAlt />
        </Link>
        <button
          onClick={handleLogout}
          className="p-4 bg-inputColor rounded-full"
        >
          <FaSignOutAlt />
        </button>
      </div>

      <div
        onClick={() => setShowMenuMobile(!showMenuMobile)}
        className="md:hidden p-1 relative"
      >
        <FaBars />
        <div
          className={`${
            showMenuMobile ? "flex flex-col" : "hidden"
          } gap-5 absolute z-50 top-10 right-0 bg-white py-2 px-5 shadow-lg`}
        >
          <Link
            to={`/message?uid=${userInfo.uid}`}
            className="p-4 bg-inputColor rounded-full"
          >
            <FaRegCommentDots />
          </Link>
          <Link
            to={`/user/${userInfo.uid}`}
            className="p-4 bg-inputColor rounded-full"
          >
            <FaUserAlt />
          </Link>
          <button
            onClick={handleLogout}
            className="p-4 bg-inputColor rounded-full"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
