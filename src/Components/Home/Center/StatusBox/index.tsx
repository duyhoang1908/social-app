import React, { useEffect, useState } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { modalSelector, modalSlide } from "../../../../store/Modal";
import { userSelector } from "../../../../store/User";
import { IPost } from "../../../../types/post.type";
import { uploadNewPost } from "../../../../utils/connectFirebase";

const StatusBox = () => {
  const { userInfo } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { statusModal } = useSelector(modalSelector);
  const handleToggleStatusModal = () => {
    dispatch(modalSlide.actions.toggleStatusModal());
  };
  return (
    <div className="flex items-center gap-4 bg-white px-6 py-6 rounded-2xl shadow-sm">
      <img className="w-10 h-10 rounded-full" src={userInfo.photoURL} alt="" />
      <div
        className="flex-1 px-3 py-2 text-base text-[#65676B] bg-inputColor rounded-3xl hover:bg-gray-200 hover:cursor-pointer"
        onClick={handleToggleStatusModal}
      >
        <span>{`${userInfo.displayName} ơi bạn đang nghĩ gì thế?`}</span>
      </div>

      {statusModal && <DeltaiStatusBox />}
    </div>
  );
};

export const DeltaiStatusBox = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(userSelector);

  const [fileImage, setFileImage] = useState(null);
  const [imgPreview, setImgPreview] = useState<any>(null);
  const [postContent, setPostContent] = useState<string>("");

  const handleSetImg = (e: any) => {
    const file = e.target.files[0];
    setFileImage(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const resetImg = () => {
    setFileImage(null);
    setImgPreview(null);
  };

  useEffect(() => {
    // if (isUpdate) {
    //   setCaption(currentPost.caption);
    // }
    return () => {
      fileImage && URL.revokeObjectURL(fileImage);
    };
  }, [fileImage]);

  const handleUploadPost = async () => {
    const data: IPost = {
      content: postContent,
      userAvatar: userInfo.photoURL,
      userName: userInfo.displayName,
      image: fileImage,
      comment: [],
      createAt: Date.now(),
      uid: userInfo.uid,
    };
    try {
      await uploadNewPost(data);
      resetImg();
      setPostContent("");
      dispatch(modalSlide.actions.toggleStatusModal());
      toast("Đăng bài thành công!");
    } catch (error) {
      toast("Đã có lỗi xảy ra");
    }
  };

  const handleToggleStatusModal = () => {
    dispatch(modalSlide.actions.toggleStatusModal());
  };
  return (
    <div className="fixed top-0 right-0 w-[100vw] h-[100vh] flex bg-[RGBA(243,243,244,0.7)] z-20">
      <div className="w-[500px] m-auto bg-white rounded-md">
        <div className="text-center relative p-5">
          <h3 className="text-2xl font-semibold">Tạo bài viết</h3>
          <div
            className="absolute top-1/2 right-5 -translate-y-1/2 p-3 rounded-full bg-inputColor hover:bg-gray-200 cursor-pointer text-lg"
            onClick={handleToggleStatusModal}
          >
            <FaTimes />
          </div>
        </div>
        <div className="flex items-center gap-3 p-4">
          <img
            className="w-10 h-10 rounded-full"
            src={userInfo.photoURL}
            alt="avatar"
          />
          <p className="font-semibold">{userInfo.displayName}</p>
        </div>
        <form className="px-4">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full outline-none border-none"
            placeholder={`${userInfo.displayName} ơi bạn đang nghĩ gì thế?`}
          ></textarea>

          <div className="py-4">
            {!imgPreview && (
              <div>
                <label
                  htmlFor="file-upload"
                  className="inline-block text-2xl text-green-600 hover:cursor-pointer"
                >
                  <FaImage />
                </label>
                <input
                  onChange={handleSetImg}
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                />
              </div>
            )}

            {imgPreview && (
              <div className="relative inline-block">
                <img className="w-20" src={imgPreview}></img>
                <div
                  className="absolute -top-1/3 -right-1/3 p-2 rounded-full bg-inputColor hover:bg-gray-200 cursor-pointer text-xs"
                  onClick={resetImg}
                >
                  <FaTimes />
                </div>
              </div>
            )}
          </div>
        </form>

        <div className="px-4 pb-4">
          <button
            className="w-full p-3 bg-green-500 hover:bg-green-600 rounded-3xl text-white font-semibold"
            onClick={handleUploadPost}
          >
            Đăng
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusBox;
