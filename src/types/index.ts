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
  keys?: Array<String>;
}

export interface IObj {
  [key: string]: (req: Request) => Promise<string | void>;
}

export interface IRequest extends Request {
  [key: string]: any;
}
