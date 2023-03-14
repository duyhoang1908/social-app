export interface IUser {
  displayName: string;
  email: string;
  id: string;
  keywords: string[];
  photoURL: string;
  uid: string;
  friendList?: any[];
}

export interface LocalStorageUser {
  displayName: string;
  email: string;
  uid: string;
}

export interface IAddFriend {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
}
