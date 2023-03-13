import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import useFireStore from "../../hooks/useFireStore";
import LayoutWithHeader from "../../Layouts/LayoutWithHeader";

import { userSelector } from "../../store/User";
import { ChatRoom } from "../../types/chat.type";

import { getListRoms } from "../../utils/connectFirebase";

import ChatSideBar from "../../Components/Chat/ChatSideBar";
import ChatWindow from "../../Components/Chat/ChatWindow";

const Chat = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(userSelector);
  const [listRoom, setListRoom] = useState<ChatRoom[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListRoms(
        userInfo.uid || JSON.parse(localStorage.getItem("user") as any).uid
      );
      setListRoom(data);
    };
    fetchData();
  }, []);

  return (
    <LayoutWithHeader>
      <div className="flex justify-between h-full">
        <div className="w-1/3">
          <ChatSideBar listChatRoom={listRoom} />
        </div>
        <div className="w-2/3">
          <ChatWindow />
        </div>
      </div>
    </LayoutWithHeader>
  );
};

export default Chat;
