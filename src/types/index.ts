import { Request } from "express";
export interface ICache {
  post(
    key: string,
    value: Object,
    expiresIn?: number | undefined
  ): Promise<void>;
  get(key: string): Promise<string>;
  delete(key: string): void;
}

export interface IInit {
  host?: string;
  port?: string;
  keyPrefix?: string;
  password?: string;
}

export interface IObj {
  [key: string]: (req: Request) => Promise<string | void>;
}
