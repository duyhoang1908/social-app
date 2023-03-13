import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import { getUserWithUid } from "../../utils/connectFirebase";

const UserPage = () => {
  const { uid } = useParams();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (uid) {
          const data = await getUserWithUid(uid);
          setUser(data);
        }
      } catch (error) {}
    };

    fetchData();
  }, [uid]);
  return (
    <div>
      <Header />
      <div className="">
        <img src={user?.photoURL} alt="" />
        <p>{user.displayName}</p>
      </div>
    </div>
  );
};

export default UserPage;
