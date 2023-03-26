import { nanoid } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Post from "../../Components/Home/Center/Post";
import BackgroundImage from "../../Components/UserPage/BackgroundImage";
import { db } from "../../firebase/config";
import LayoutWithHeader from "../../Layouts/LayoutWithHeader";
import { userSelector, userSlice } from "../../store/User";
import {
  addDocument,
  getListRoms,
  getUserPostByUid,
  getUserWithUid,
} from "../../utils/connectFirebase";

const UserPage = () => {
  const { uid } = useParams();
  const { userInfo, friendList } = useSelector(userSelector);
  console.log(friendList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState<any>();
  const [userPost, setUserPost] = useState<any[]>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

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

    const checkFreind = () => {
      if (friendList) {
        let check = friendList.some((item: any) => item.uid === uid);
        setIsFriend(check);
      }
    };
    checkFreind();
    fetchData();
  }, [uid, isUpdate]);

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

  const addFriend = async () => {
    const data = {
      name: user.displayName,
      avatar: user.photoURL,
      uid: user.uid,
    };
    try {
      const userRef = doc(db, "user", userInfo.id);
      let fList = friendList?.length > 0 ? [...friendList, data] : [data];
      await updateDoc(userRef, {
        friendList: fList,
      });
      dispatch(userSlice.actions.setFriendList(fList));
      toast("Đã thêm bạn.");
    } catch (error) {
      toast("Đã có lỗi xảy ra");
      console.log(error);
    }
  };

  const deleteFriend = async () => {
    try {
      const newFlist = friendList.filter((item: any) => item.uid !== user.uid);
      const userRef = doc(db, "user", userInfo.id);
      await updateDoc(userRef, {
        friendList: newFlist,
      });
      dispatch(userSlice.actions.setFriendList(newFlist));
      toast("Đã hủy kết bạn.");
    } catch (error) {
      toast("Đã có lỗi xảy ra");
      console.log(error);
    }
  };

  return (
    <LayoutWithHeader>
      <div className="max-w-[1200px] h-full overflow-y-auto m-auto p-4">
        <BackgroundImage
          url={user?.backgroundImage || ""}
          uid={uid}
          id={user?.id || ""}
          setIsUpdate={setIsUpdate}
        />
        <div className="flex items-center justify-between -translate-y-[20%] md:-translate-y-1/4">
          <div className="flex items-center gap-3 md:gap-5 mb-10">
            <div className="flex p-3 rounded-full bg-inputColor">
              <img
                src={user?.photoURL}
                alt=""
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full m-auto"
              />
            </div>
            <p className="text-lg md:text-3xl font-semibold">
              {user?.displayName}
            </p>
          </div>
          <div className="flex items-center gap-5">
            {!isFriend && userInfo.uid !== uid && (
              <button
                onClick={addFriend}
                className="bg-green-500 hover:bg-green-600 text-lg font-semibold text-white px-5 py-3 rounded-2xl"
              >
                Kết bạn
              </button>
            )}

            {isFriend && userInfo.uid !== uid && (
              <button
                onClick={deleteFriend}
                className="bg-green-500 hover:bg-green-600 text-lg font-semibold text-white px-5 py-3 rounded-2xl"
              >
                Hủy kết bạn
              </button>
            )}

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

        {(userPost?.length as number) > 0 && (
          <div className="flex flex-col gap-10 pb-3 h-full">
            {userPost?.map((post) => (
              <Post
                post={post}
                postID={post.id}
                key={post.id}
                setIsUpdate={setIsUpdate}
              ></Post>
            ))}
          </div>
        )}

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
