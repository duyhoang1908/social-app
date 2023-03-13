import { useDispatch } from "react-redux";
import { roomSlice } from "../../../store/Room";
import { ChatRoom } from "../../../types/chat.type";

interface Props {
  listChatRoom: any;
}

const ChatSideBar = ({ listChatRoom }: Props) => {
  const dispatch = useDispatch();
  const handleSelectedRoom = (id: string) => {
    dispatch(roomSlice.actions.setRoomId(id));
  };
  return (
    <div className="px-4 py-10 h-full border-r border-[#9c9c9c]">
      {listChatRoom &&
        listChatRoom.map((room: ChatRoom) => (
          <div
            className="flex items-center gap-5 p-2 hover:bg-slate-200 hover:cursor-pointer"
            key={room.id}
            onClick={() => handleSelectedRoom(room.id)}
          >
            <img
              className="w-14 h-14 rounded-full"
              src="https://scontent.xx.fbcdn.net/v/t39.30808-1/255467711_581273429814239_3269316397525590462_n.jpg?stp=dst-jpg_p100x100&_nc_cat=108&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=J0_sbvufF8YAX9g-Kp9&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=00_AfBgQTDnwyZdVDV4zR2RezyXhtU37gQtFsVJAHcOpnkwWA&oe=63F0CB84"
              alt=""
            />
            <div>
              <h3 className="text-lg font-medium">{room.name}</h3>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatSideBar;
