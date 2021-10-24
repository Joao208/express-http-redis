import { createKeyString, Cache } from "../../src/index";
import mockExpress from "../mocks/mockExpress";
import Redis from "ioredis";

jest.mock("ioredis");

describe("[createKeyString] Test case", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it("Should return empty string if keys don't passed", () => {
    const { req } = mockExpress;

    req.params.name = "user";
    req.query.id = "1";

    // @ts-ignore
    Redis.mockImplementation(() => ({
      set: jest.fn().mockReturnValue({
        then: jest.fn().mockReturnValue({ catch: jest.fn() }),
      }),
      get: jest.fn().mockReturnValue({
        then: jest.fn().mockReturnValue({ catch: jest.fn() }),
      }),
      on: jest.fn(),
    }));

    new Cache({
      host: "100",
      port: "100",
      keyPrefix: "100",
      password: "100",
      keys: [],
    });

    const response = createKeyString(req);

    expect(response).toBe("");
  });

  it("Should return empty string if keys don't passed", () => {
    const { req } = mockExpress;

    req.url = "/user";

    // @ts-ignore
    Redis.mockImplementation(() => ({
      set: jest.fn().mockReturnValue({
        then: jest.fn().mockReturnValue({ catch: jest.fn() }),
      }),
      get: jest.fn().mockReturnValue({
        then: jest.fn().mockReturnValue({ catch: jest.fn() }),
      }),
      on: jest.fn(),
    }));

    new Cache({
      host: "100",
      port: "100",
      keyPrefix: "100",
      password: "100",
      keys: ["url"],
    });

    const response = createKeyString(req);

    expect(response).toBe("/user");
  });

  it("Should create an key string", () => {
    const { req } = mockExpress;

    req.params.name = "user";
    req.query.id = "1";

    // @ts-ignore
    Redis.mockImplementation(() => ({
      set: jest.fn().mockReturnValue({
        then: jest.fn().mockReturnValue({ catch: jest.fn() }),
      }),
      get: jest.fn().mockReturnValue({
        then: jest.fn().mockReturnValue({ catch: jest.fn() }),
      }),
      on: jest.fn(),
    }));

    new Cache({
      host: "100",
      port: "100",
      keyPrefix: "100",
      password: "100",
      keys: ["params.name", "query.id"],
    });

    const response = createKeyString(req);

    expect(response).toBe("/user : user : 1");
  });
});
