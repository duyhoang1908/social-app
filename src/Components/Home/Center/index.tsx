import { useEffect, useState } from "react";
import Post from "./Post";
import StatusBox from "./StatusBox";
import { ref as realTimeRef, onValue, update } from "firebase/database";
import { nanoid } from "@reduxjs/toolkit";
import { realtimeDB } from "../../../firebase/config";

const Center = () => {
  const [listPost, setListPost] = useState<any[]>();
  useEffect(() => {
    const fetchData = async () => {
      const postRef = realTimeRef(realtimeDB, "post/");
      let value: any[];
      try {
        await onValue(postRef, (snapshot) => {
          value = [];
          snapshot.forEach((item) => {
            value.push({
              id: item.key,
              data: item.val(),
            });
          });
          value.sort((a, b) => b.data.createAt - a.data.createAt);
          setListPost(value);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-10 py-3 h-full">
      <StatusBox />
      {listPost &&
        listPost.map((post) => (
          <Post key={post.id} postID={post.id} post={post.data} />
        ))}
    </div>
  );
};
export default Center;
