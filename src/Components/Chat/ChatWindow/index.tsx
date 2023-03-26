import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { realtimeDB } from "../../../firebase/config";
import { roomsSelector } from "../../../store/Room";
import { userSelector } from "../../../store/User";
import { ref, onValue, set } from "firebase/database";
import { nanoid } from "@reduxjs/toolkit";
import { FaSignOutAlt, FaTelegramPlane } from "react-icons/fa";
import { defaultUserAvatar } from "../../../assets/img";

interface IProps {
  setShowRoomList: Function;
}

const ChatWindow = ({ setShowRoomList }: IProps) => {
  const { roomId } = useSelector(roomsSelector);
  const { userInfo } = useSelector(userSelector);

  const messageListRef = useRef<any>();

  const [content, setContent] = useState<any[]>();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const roomRef = ref(realtimeDB, "chats/" + roomId + "/");
      try {
        await onValue(roomRef, (snapshot) => {
          let value: any[];
          value = [];
          snapshot.forEach((item) => {
            value.push({
              id: item.key,
              data: item.val(),
            });
          });
          value.sort((a, b) => a.data.createAt - b.data.createAt);
          setContent(value);
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (roomId) fetchData();
  }, [roomId]);

  useEffect(() => {
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [content]);

  const handleSendMess = async () => {
    if (message) {
      await set(ref(realtimeDB, "chats/" + roomId + "/" + nanoid()), {
        createAt: Date.now(),
        message,
        avatar: userInfo.photoURL,
        uid: userInfo.uid,
      });
      setMessage("");
    }
  };

  return (
    <div className="w-full h-full">
      {!roomId && (
        <div className="h-full w-full flex bg-inputColor">
          <div className="m-auto text-[#65676B] text-2xl font-semibold">
            Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
          </div>
        </div>
      )}

      {roomId && (
        <div className="flex flex-col h-full p-4 bg-white">
          <div className="md:hidden flex justify-end">
            <span className="p-2" onClick={() => setShowRoomList(true)}>
              <FaSignOutAlt />
            </span>
          </div>
          <div
            ref={messageListRef}
            className="flex flex-col flex-1 overflow-auto"
          >
            {content?.map((item) => (
              <div className="w-full p-4" key={item.id}>
                {item.data.uid !== userInfo.uid && (
                  <div className="flex items-center gap-3">
                    <img
                      className="w-7 h-7 object-cover rounded-full"
                      src={item.data.avatar || defaultUserAvatar}
                      alt="avtar"
                    />
                    <div className="">
                      <p className="inline-block px-3 py-2 rounded-3xl bg-green-500 text-white">
                        {item.data.message}
                      </p>
                    </div>
                  </div>
                )}

                {item.data.uid === userInfo.uid && (
                  <div className="flex items-center justify-end gap-3">
                    <div className="">
                      <p className="inline-block px-3 py-2 rounded-3xl bg-green-500 text-white">
                        {item.data.message}
                      </p>
                    </div>
                    <img
                      className="w-7 h-7 object-cover rounded-full"
                      src={item.data.avatar || defaultUserAvatar}
                      alt="avtar"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-inputColor outline-none rounded-3xl w-full py-2 px-3 flex justify-between items-center">
            <input
              className="outline-none flex-1 bg-transparent"
              type="text"
              value={message}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  handleSendMess();
                }
              }}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div
              className="text-green-500 text-2xl px-1 hover:cursor-pointer"
              onClick={handleSendMess}
            >
              <FaTelegramPlane />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
