import { useState } from "react";
import { FaRegCommentDots, FaSearch, FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSelector } from "../../store/User";
import UserBox from "./UserBox";

const Header = () => {
  const { userInfo } = useSelector(userSelector);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <div className="flex justify-between items-center px-5">
      <Link to="/">
        <img
          src="https://doanhnghiep.quocgiakhoinghiep.vn/wp-content/uploads/2020/08/26-1.png"
          alt="logo"
          className="w-56"
        />
      </Link>
      <div className="w-1/3">
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="flex gap-5">
        <Link
          to={`/message?uid=${userInfo.uid}`}
          className="p-4 bg-inputColor rounded-full"
        >
          <FaRegCommentDots />
        </Link>
        <Link
          to={`/user/${userInfo.uid}`}
          className="p-4 bg-inputColor rounded-full relative group"
        >
          <FaUserAlt />
          <UserBox />
        </Link>
      </div>
    </div>
  );
};

export default Header;
