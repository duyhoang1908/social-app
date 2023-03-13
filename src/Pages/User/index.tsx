import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Post from "../../Components/Home/Center/Post";
import LayoutWithHeader from "../../Layouts/LayoutWithHeader";
import { userSelector } from "../../store/User";
import {
  addDocument,
  getListRoms,
  getUserPostByUid,
  getUserWithUid,
} from "../../utils/connectFirebase";

const UserPage = () => {
  const { uid } = useParams();
  const { userInfo } = useSelector(userSelector);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const [userPost, setUserPost] = useState<any[]>();
  const [isUpdate, setIsUpdate] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (uid) {
          const data = await getUserWithUid(uid);
          const post = await getUserPostByUid(uid);
          setUser(data);
          setUserPost(post);
        }
      } catch (error) {}
    };

    fetchData();
  }, [uid]);

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
      <div className="max-w-[1200px] h-full overflow-y-auto m-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5 mb-10">
            <img
              src={user?.photoURL}
              alt=""
              className="w-[150px] h-[150px] rounded-full"
            />
            <p className="text-3xl font-semibold">{user?.displayName}</p>
          </div>
          {uid !== userInfo.uid && (
            <button
              onClick={() => createNewMessage(uid as string)}
              className="bg-green-500 hover:bg-green-600 text-lg font-semibold text-white px-5 py-3 rounded-2xl"
            >
              Nhắn tin
            </button>
          )}
        </div>

        {(userPost?.length as number) > 0 &&
          userPost?.map((post) => (
            <Post
              post={post}
              postID={post.id}
              key={post.id}
              setIsUpdate={setIsUpdate}
            ></Post>
          ))}
      </div>
    </LayoutWithHeader>
  );
};

export default UserPage;
