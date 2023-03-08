export interface IComment {
  userName: string;
  userAvatar: string;
  uid: string;
  content: string;
  image?: any;
  createAt: number;
  id: string;
}

export interface IPost {
  userName: string;
  userAvatar: string;
  uid: string;
  content: string;
  image?: any;
  comment: any[];
  createAt: number;
}

export interface IPosts {
  userName: string;
  userAvatar: string;
  uid: string;
  content: string;
  image?: any;
  comment: any[];
  createAt: number;
  id: string;
}
