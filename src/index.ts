import Redis from "ioredis";
import { NextFunction, Request, Response } from "express";
import { IInit, IObj, ICache, IBody } from "./types";

export const cache = {} as ICache;

export class Cache {
  constructor({ host, port, keyPrefix, password }: IInit) {
    const redis = new Redis({
      host,
      port: parseFloat(port),
      keyPrefix,
      password,
    });

    redis
      .set("test", "true")
      .then((message: string | null): void => {
        console.log("[cacheService] message: ", message);
      })
      .catch((error: string): void => console.error(error));

    redis
      .get("test")
      .then((message: string | null): void => {
        console.log("[cacheService] message: ", message);
      })
      .catch((error: string) => console.error(error));

    redis.on("error", (error: string): void => console.error(error));

    cache.set = (key, value, expiresIn = 60 * 60 * 8) => {
      return redis.set(key, JSON.stringify(value), ["NX", "EX"], expiresIn);
    };

    cache.get = async (key) => {
      const cached = await redis.get(key);

      return cached ? JSON.parse(cached) : { users: [] };
    };

    cache.invalidate = (key) => {
      return redis.del(key);
    };
  }
}

const GET = async () => {
  return cache.get("users");
};

const POST = async (body: Object) => {
  const { users } = await cache.get("users");

  cache.invalidate("users");
  cache.set("users", { users: [...users, body] });
};

const DELETE = async (body: IBody) => {
  const { UserId } = body;

  const { users } = await cache.get("users");

  const deletedUsers = users.filter(({ id }: { id: number }) => id !== UserId);

  cache.invalidate("users");
  cache.set("users", { users: deletedUsers });
};

export const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method } = req;

  const obj = {
    GET,
    POST,
    DELETE,
  } as IObj;

  if (["GET"].includes(method)) {
    const response = await obj[method](req.body);

    if (response && response.users.length) {
      return res.status(200).json(response);
    }
  }

  await obj[method](req.body);

  next();
};
