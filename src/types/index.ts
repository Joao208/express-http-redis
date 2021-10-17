import { Request } from "express";
export interface ICache {
  set(key: string, value: Object, expiresIn?: number | undefined): void;
  get(key: string): Promise<string>;
  invalidate(key: string): void;
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
