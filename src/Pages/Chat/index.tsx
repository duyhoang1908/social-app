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
  const { userInfo } = useSelector(userSelector);
  const [listRoom, setListRoom] = useState<ChatRoom[]>();
  const [showRoomList, setShowRoomList] = useState(true);

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
      <div className="flex justify-between h-full md:gap-5 py-3">
        <div
          className={`${
            showRoomList ? "w-full md:w-1/3" : "hidden md:  w-1/3"
          } rounded-2xl overflow-hidden`}
        >
          <ChatSideBar
            listChatRoom={listRoom}
            setShowRoomList={setShowRoomList}
          />
        </div>
        <div className="flex-1 rounded-2xl overflow-hidden">
          <ChatWindow setShowRoomList={setShowRoomList} />
        </div>
      </div>
    </LayoutWithHeader>
  );
};

export default Chat;
