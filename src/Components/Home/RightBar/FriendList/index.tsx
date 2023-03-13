import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSelector } from "../../../../store/User";
import { IUser } from "../../../../types/user.type";
import {
  addDocument,
  getAllUser,
  getListRoms,
} from "../../../../utils/connectFirebase";

const FriendList = () => {
  const [list, setList] = useState<IUser[]>();
  const { userInfo } = useSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUser(userInfo.uid);
        setList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userInfo.uid]);

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
    <div className="flex flex-col mt-5">
      {list &&
        list.map((user: IUser) => (
          <div
            onClick={() => createNewMessage(user.uid)}
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
        ))}
    </div>
  );
};

export default FriendList;
