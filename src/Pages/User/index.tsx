import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Post from "../../Components/Home/Center/Post";
import LayoutWithHeader from "../../Layouts/LayoutWithHeader";
import { userSelector, userSlice } from "../../store/User";
import {
  addDocument,
  getListRoms,
  getUserPostByUid,
  getUserWithUid,
} from "../../utils/connectFirebase";
import { IAddFriend } from "../../types/user.type";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";

const UserPage = () => {
  const { uid } = useParams();
  const { userInfo, friendList } = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const addFriend = async (data: IAddFriend) => {
    try {
      const userRef = doc(db, "user", userInfo.id);
      let fList = friendList ? [...friendList, data] : [data];
      await updateDoc(userRef, {
        friendList: fList,
      });
      dispatch(userSlice.actions.setFriendList(fList));
      toast("Đã thêm bạn.");
    } catch (error) {
      console.log(error);
    }
  };

  // const createNewMessage = useCreateMess();

  return (
    <LayoutWithHeader>
      <div className="max-w-[1200px] h-full overflow-y-auto m-auto p-4">
        <div className="w-full h-[350px] bg-[#e3e3e3] rounded-2xl overflow-hidden">
          {/* {user.backgroundImage && (
            <img src={userInfo.backgroundImage} alt="backgroundImage" />
          )}
          {!user.backgroundImage && (
            <div className="flex w-full h-full">
              <label htmlFor="bg-img" className="">
                Thêm ảnh nền.
              </label>{" "}
              <input type="file" name="bg-img" id="" className="hidden" />
            </div>
          )} */}
          {userInfo.uid === uid && (
            <div className="flex w-full h-full">
              <label
                htmlFor="bg-img"
                className="m-auto text-2xl font-semibold text-[#65676B]"
              >
                Thêm ảnh nền.
              </label>{" "}
              <input type="file" name="bg-img" id="" className="hidden" />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between -translate-y-1/4">
          <div className="flex items-center gap-5 mb-10">
            <div className="flex p-3 rounded-full bg-inputColor">
              <img
                src={user?.photoURL}
                alt=""
                className="w-[150px] h-[150px] rounded-full m-auto"
              />
            </div>
            <p className="text-3xl font-semibold">{user?.displayName}</p>
          </div>
          <div className="flex items-center gap-5">
            {/* {!friendList.includes(uid) && userInfo.uid !== uid && (
              <button
                onClick={() =>
                  addFriend({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.photoURL,
                  })
                }
                className="bg-green-500 hover:bg-green-600 text-lg font-semibold text-white px-5 py-3 rounded-2xl"
              >
                Kết bạn
              </button>
            )} */}

            {uid !== userInfo.uid && (
              <button
                onClick={() => createNewMessage(uid as string)}
                className="bg-green-500 hover:bg-green-600 text-lg font-semibold text-white px-5 py-3 rounded-2xl"
              >
                Nhắn tin
              </button>
            )}
          </div>
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

        {(userPost?.length as number) <= 0 && (
          <div className="text-xl text-center text-[#65676B] py-10 mb-10">
            Người dùng chưa có bài viết nào.
          </div>
        )}
      </div>
    </LayoutWithHeader>
  );
};

export default UserPage;
