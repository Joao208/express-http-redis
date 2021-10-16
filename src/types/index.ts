export interface ICache {
  set(key: string, value: Object, expiresIn?: number | undefined): void;
  get(key: string): Promise<IGet>;
  invalidate(key: string): void;
}

export interface IUser {
  id: number;
  name: string;
}

export interface IGet {
  users: Array<IUser>;
}

export interface IBody extends IUser {
  UserId?: number;
}

export interface IInit {
  host: string;
  port: string;
  keyPrefix: string;
  password: string;
}

export interface IObj {
  [key: string]: (body: IBody) => Promise<IGet | void>;
}
