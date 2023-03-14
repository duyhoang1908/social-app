import { useDispatch } from "react-redux";
import { defaultMessage } from "../../../assets/img";
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
    <div className="px-4 py-10 h-full bg-white">
      {listChatRoom &&
        listChatRoom.map((room: ChatRoom) => (
          <div
            className="flex items-center gap-5 p-2 hover:bg-slate-200 hover:cursor-pointer rounded-2xl"
            key={room.id}
            onClick={() => handleSelectedRoom(room.id)}
          >
            <img
              className="w-14 h-14 object-cover rounded-full"
              src={defaultMessage}
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
