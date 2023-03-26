import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LayoutWithHeader from "../../Layouts/LayoutWithHeader";
import { userSelector } from "../../store/User";
import { IUser } from "../../types/user.type";
import {
  addDocument,
  getListRoms,
  searchUserByName,
} from "../../utils/connectFirebase";

const SearchResult = () => {
  const { name } = useParams();
  const { userInfo } = useSelector(userSelector);
  const navigate = useNavigate();
  const [listUser, setListUser] = useState<IUser[]>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchUserByName(name?.toLowerCase() as string);
        setListUser(data);
      } catch (error) {
        toast("Đã có lỗi xảy ra vui lòng thử lại sau.");
      }
    };
    fetchData();
  }, [name]);

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
    <LayoutWithHeader>
      {(listUser?.length as number) > 0 && (
        <div className="p-4 h-full">
          <div className="max-w-[1200px] h-full overflow-y-auto p-4 mx-auto bg-white rounded-2xl">
            {listUser?.map((user) => (
              <Link
                to={`/user/${user.uid}`}
                key={user.uid}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-3 pb-4">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="h-20 w-20 rounded-full"
                  />
                  <p className="text-black text-base font-semibold">
                    {user.displayName}
                  </p>
                </div>
                {userInfo.uid !== user.uid && (
                  <button
                    onClick={() => createNewMessage(user.uid)}
                    className="px-3 py-2 bg-green-500 hover:bg-green-600 text-base text-white font-semibold rounded-2xl"
                  >
                    Nhắn tin
                  </button>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
      {(listUser?.length as number) <= 0 && (
        <div className="h-full w-full flex bg-inputColor">
          <div className="m-auto text-[#65676B] text-2xl font-semibold">
            Không có kết quả phù hợp!
          </div>
        </div>
      )}
    </LayoutWithHeader>
  );
};

export default SearchResult;
