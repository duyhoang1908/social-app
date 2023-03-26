import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSelector } from "../../../store/User";
import { addDocument, getListRoms } from "../../../utils/connectFirebase";
import FriendList from "./FriendList";

const RightBar = () => {
  const { friendList, userInfo } = useSelector(userSelector);
  const navigate = useNavigate();

  const createNewMessage = async (uid: string) => {
    const data = {
      members: [userInfo.uid, uid],
      id: nanoid(),
      name: userInfo.displayName,
    };
    try {
      let check = true;
      const rooms = await getListRoms(userInfo.uid);
      console.log(rooms);
      rooms.forEach((room) => {
        if (room.members.includes(uid)) {
          check = false;
        }
      });
      console.log(check);
      if (check) await addDocument("rooms", data);
      navigate("/message");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white h-full overflow-y-auto px-4 py-3 rounded-2xl">
      <h2 className="text-lg font-semibold">Danh sách bạn bè</h2>
      {(friendList?.length as number) <= 0 && (
        <div className="pt-4 pb-6">Chưa có người bạn nào, hãy kết bạn nào.</div>
      )}

      <div className="mb-5">
        {(friendList?.length as number) > 0 &&
          friendList.map((user: any) => (
            <div
              onClick={() => createNewMessage(user.uid)}
              key={user.uid}
              className="flex gap-2 py-2 items-center hover:cursor-pointer"
            >
              <img
                className="w-8 h-8 rounded-full"
                src={user.avatar}
                alt="avatar"
              />
              <h4 className="text-base hover:font-semibold">{user.name}</h4>
            </div>
          ))}
      </div>

      <h2 className="text-lg font-semibold">Các người dùng quanh bạn</h2>
      <FriendList />
    </div>
  );
};

export default RightBar;
