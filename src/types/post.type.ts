export interface IComment {
  userName: string;
  userAvatar: string;
  uid: string;
  content: string;
  image?: any;
  createAt: number;
  id: string;
}

export type IPosts = {
  userName: string;
  userAvatar: string;
  uid: string;
  content: string;
  image?: any;
  comment: any[];
  createAt: number;
  id: string;
};

export type IPost = Omit<IPosts, "id">;
