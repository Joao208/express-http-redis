import { Cache, cache } from "../../src/index";
import Redis from "ioredis";

jest.mock("ioredis");

describe("[cache] Test case", () => {
  it("Should test cache object", () => {
    const redisResponse = {
      set: jest.fn().mockReturnValue({
        then: jest.fn().mockReturnValue({ catch: jest.fn() }),
      }),
      get: jest.fn().mockReturnValue({
        then: jest.fn().mockReturnValue({ catch: jest.fn() }),
      }),
      on: jest.fn(),
      del: jest.fn(),
    };

    // @ts-ignore
    Redis.mockImplementation(() => redisResponse);

    new Cache({
      host: "100",
      port: "100",
      keyPrefix: "100",
      password: "100",
      keys: ["params.name"],
    });

    cache.get("user : id");
    cache.delete("user : id");
    cache.post("user : id", {});

    expect(redisResponse.get).toBeCalledTimes(3);
    expect(redisResponse.del).toBeCalledTimes(1);
    expect(redisResponse.set).toBeCalledTimes(1);
  });
});
