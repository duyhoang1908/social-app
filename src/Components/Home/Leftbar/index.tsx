import { Link, NavLink } from "react-router-dom";
import { leftBarCategory } from "../../../utils/constant";

const LeftBar = () => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        {leftBarCategory.map((cate) => {
          return (
            <NavLink
              // style={({ isActive }) => ({
              //   backgroundColor: isActive ? "#F0F2F5" : "white",
              // })}
              key={cate.title}
              to={cate.href}
              className="p-2 text-base font-semibold"
            >
              <p>{cate.title}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default LeftBar;
