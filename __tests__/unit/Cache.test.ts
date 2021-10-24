import { Cache, cache } from "../../src/index";
import Redis from "ioredis";

jest.mock("ioredis");

describe("[Cache] Test case", () => {
  it("Should throw an error if any parameter is not passed", () => {
    expect.assertions(1);

    try {
      new Cache({
        host: "100",
        keys: ["params.name"],
      });
    } catch (error) {
      expect(error.message).toBe(
        "Host, port, keyPrefix, keys and password must be necessary"
      );
    }
  });

  it("Should test class and set cache function params", () => {
    const redisResponse = {
      set: jest.fn().mockReturnValue({
        then: jest.fn().mockReturnValue({ catch: jest.fn() }),
      }),
      get: jest.fn().mockReturnValue({
        then: jest.fn().mockReturnValue({ catch: jest.fn() }),
      }),
      on: jest.fn(),
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

    expect(redisResponse.set).toBeCalledTimes(1);
    expect(redisResponse.get).toBeCalledTimes(1);
    expect(redisResponse.on).toBeCalledTimes(1);

    expect(cache.delete).toBeInstanceOf(Function);
    expect(cache.post).toBeInstanceOf(Function);
    expect(cache.get).toBeInstanceOf(Function);
  });
});
