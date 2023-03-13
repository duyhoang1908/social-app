import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db, realtimeDB } from "../firebase/config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { IPost } from "../types/post.type";
import { toast } from "react-toastify";

export const addDocument = async (collectionName: string, data: any) => {
  try {
    await addDoc(collection(db, collectionName), {
      ...data,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getUserWithUid = async (uid: string) => {
  let data = {};
  const q = query(collection(db, "user"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = { ...doc.data(), id: doc.id };
  });
  return data;
};

export const getListRoms = async (uid: string) => {
  let data: any[];
  data = [];
  const q = query(
    collection(db, "rooms"),
    where("members", "array-contains", uid)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), collectionID: doc.id });
  });
  return data;
};

export const getRoomData = async (roomID: string) => {
  let data: any[];
  data = [];
  const q = query(collection(db, "chat"), where("roomID", "==", roomID));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const uploadNewPost = async (data: IPost) => {
  try {
    if (!data.content && !data.image) {
      toast("Hãy thêm nội dung cho bài viết!");
    } else if (data.content && !data.image) {
      await addDocument("posts", data);
    } else {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${data.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, data.image);
      uploadTask.on(
        "state_changed",
        () => {},
        () => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            data.image = downloadURL;
            addDocument("posts", data);
          });
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async () => {
  let data: any[];
  data = [];
  const q = query(collection(db, "posts"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const getAllUser = async (uid: string) => {
  let data: any[];
  data = [];
  const q = query(collection(db, "user"), where("uid", "!=", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const searchUserByName = async (name: string) => {
  let data: any[];
  data = [];
  const q = query(
    collection(db, "user"),
    where("keywords", "array-contains", name)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const getUserPostByUid = async (uid: string) => {
  let data: any[];
  data = [];
  const q = query(collection(db, "posts"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};
