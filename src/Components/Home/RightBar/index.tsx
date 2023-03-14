import { useSelector } from "react-redux";
import { userSelector } from "../../../store/User";
import FriendList from "./FriendList";

const RightBar = () => {
  const { friendList } = useSelector(userSelector);

  return (
    <div className="bg-white h-full overflow-y-auto px-4 py-3 rounded-2xl">
      {/* <h2 className="text-lg font-semibold">Danh sách bạn bè</h2>
      {(friendList.length as number) <= 0 && (
        <div className="pt-4 pb-6">Chưa có người bạn nào, hãy kết bạn nào.</div>
      )}

      {(friendList.length as number) > 0 &&
        friendList.map((user: any) => (
          <div
            // onClick={() => createNewMessage(user.uid)}
            key={user.uid}
            className="flex gap-2 py-2 items-center hover:cursor-pointer"
          >
            <img
              className="w-8 h-8 rounded-full"
              src={user.photoURL}
              alt="avatar"
            />
            <h4 className="text-base hover:font-semibold">
              {user.displayName}
            </h4>
          </div>
        ))} */}

      <h2 className="text-lg font-semibold">Các người dùng quanh bạn</h2>
      <FriendList />
    </div>
  );
};

export default RightBar;
