export interface IUser {
  displayName: string;
  email: string;
  id: string;
  keywords: string[];
  photoURL: string;
  uid: string;
}

export interface LocalStorageUser {
  displayName: string;
  email: string;
  uid: string;
}
