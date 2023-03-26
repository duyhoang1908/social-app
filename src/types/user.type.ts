import { type } from "os";

export type IUser = {
  displayName: string;
  email: string;
  id: string;
  keywords: string[];
  photoURL: string;
  uid: string;
  friendList?: any[];
};

export type LocalStorageUser = Pick<IUser, "displayName" | "email" | "uid">;

export type IAddFriend = Pick<
  IUser,
  "displayName" | "email" | "uid" | "photoURL"
>;
