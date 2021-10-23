import Redis from "ioredis";
import { NextFunction, Request, Response } from "express";
import { ICache, IInit, IObj } from "./types";

export * from "./types";

export const cache = {} as ICache;

const alreadyAdded = async (key: string): Promise<void> => {
  if (await cache.get(key)) cache.delete(key);
};

export class Cache {
  constructor({ host, port, keyPrefix, password }: IInit) {
    if (!(host && port && keyPrefix && password)) {
      throw new Error("Host, port, keyPrefix and password must be necessary");
    }

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

    cache.post = async (key, value, expiresIn = 60 * 60 * 8) => {
      await alreadyAdded(key);

      redis.set(key, JSON.stringify(value), ["NX", "EX"], expiresIn);
    };

    cache.get = async (key) => {
      const cached = await redis.get(key);

      return cached ? JSON.parse(cached) : null;
    };

    cache.delete = (key) => {
      return redis.del(key);
    };
  }
}

const GET = async (req: Request) => {
  const model = req.url.split("?")[0]?.replace("/", "");

  const { query } = req;
  const { id } = query;

  return cache.get(`${model} : ${id}`);
};

export const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method } = req;

  const obj = {
    GET,
  } as IObj;

  if (!obj[method]) return next();

  if (["GET"].includes(method)) {
    const response = await obj[method](req);

    if (response) {
      return res
        .status(200)
        .json(typeof response === "string" ? JSON.parse(response) : response);
    }
  }

  await obj[method](req);

  return next();
};
