import { nanoid } from "@reduxjs/toolkit";
import { db } from "../../../../firebase/config";
import { useState } from "react";
import { FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../store/User";
import { IComment, IPosts } from "../../../../types/post.type";
import { TimeSince } from "../../../../utils/func";
import { doc, updateDoc } from "firebase/firestore";
import ImgModal from "../ImgModal";

interface ISinglePost {
  post: IPosts;
  postID: String;
  setIsUpdate: Function;
}

// interface IComments {
//   comment: IComment;
// }

const Post = ({ post, postID, setIsUpdate }: ISinglePost) => {
  const { userInfo } = useSelector(userSelector);
  const [isShowComment, setIsShowComment] = useState(false);
  const [isImageModal, setIsImageModal] = useState(false);
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    const data = {
      userName: userInfo.displayName,
      userAvatar: userInfo.photoURL,
      uid: userInfo.uid,
      content: comment,
      createAt: Date.now(),
      id: nanoid(),
    };
    try {
      const postRef = doc(db, "posts", postID.toString());
      let cmtData = post.comment ? [...post.comment, data] : [data];
      await updateDoc(postRef, {
        comment: cmtData,
      });
      setComment("");
      setIsUpdate(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-3 px-4 bg-white rounded-2xl">
      <div className="flex items-center gap-3 pb-4">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={post.userAvatar}
          alt="avatar"
        />
        <div className="flex flex-col">
          <p className="text-base font-semibold">{post.userName}</p>
          <p className="text-sm">{`${TimeSince(post.createAt)} trước.`}</p>
        </div>
      </div>

      {post.content && <div className="text-base my-3">{post.content}</div>}

      {post.image && (
        <div onClick={() => setIsImageModal(true)}>
          <img
            className="w-full max-h-96 object-cover rounded-2xl hover:cursor-pointer"
            src={post.image}
            alt="image"
          />
          {isImageModal && (
            <ImgModal url={post.image} setIsImageModal={setIsImageModal} />
          )}
        </div>
      )}

      <div className="w-full h-[1px] bg-slate-200 my-4"></div>
      <div className="flex">
        <div
          onClick={() => setIsShowComment(!isShowComment)}
          className="m-auto flex items-center gap-1 px-2 hover:cursor-pointer hover:text-green-600"
        >
          <FaComment />{" "}
          {!isShowComment && (
            <p className="font-semibold text-sm">{`(${post.comment.length})`}</p>
          )}
        </div>
      </div>
      {isShowComment && (
        <div>
          <CommentList comment={post.comment} />
          <div className="w-full flex gap-2 mt-3">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={post.userAvatar}
              alt=""
            />
            <input
              type="text"
              className="px-3 py-2 flex-1 bg-inputColor rounded-3xl outline-none text-sm"
              placeholder="Viết bình luận..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleComment();
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const CommentList = ({ comment }: any) => {
  return (
    <div className="flex flex-col gap-3">
      {comment
        ?.sort((a: IComment, b: IComment) => a.createAt - b.createAt)
        .map((item: any) => (
          <div key={item.id} className="flex gap-2">
            <div>
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={item.userAvatar}
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <div className="px-4 py-2 bg-inputColor rounded-2xl">
                <h3 className="font-semibold text-sm">{item.userName}</h3>
                <p className="text-sm">{item.content}</p>
              </div>
              <p className="text-xs px-4">{`${TimeSince(
                item.createAt
              )} trước.`}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Post;
