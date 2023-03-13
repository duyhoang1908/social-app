import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSelector } from "../store/User";
import { addDocument, getListRoms } from "../utils/connectFirebase";

const useCreateMess = async (uid: string) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector(userSelector);
  console.log("ok");
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
    if (check) await addDocument("rooms", data);
    navigate("/message");
  } catch (error) {
    console.log(error);
  }
};

export default useCreateMess;
