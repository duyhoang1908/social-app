import { useEffect, useState } from "react";
import Post from "./Post";
import StatusBox from "./StatusBox";
import { getAllPost } from "../../../utils/connectFirebase";

const Center = () => {
  const [listPost, setListPost] = useState<any[]>();
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPost();
        setListPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isUpdate]);

  return (
    <div className="flex flex-col gap-10 pb-3 h-full">
      <StatusBox setIsUpdate={setIsUpdate} />
      {listPost &&
        listPost.map((post) => (
          <Post
            setIsUpdate={setIsUpdate}
            key={post.id}
            postID={post.id}
            post={post}
          />
        ))}
    </div>
  );
};
export default Center;
