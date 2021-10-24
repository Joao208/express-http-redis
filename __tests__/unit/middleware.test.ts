import { middleware, cache } from "../../src/index";
import mockExpress from "../mocks/mockExpress";

describe("[middleware] Test case", () => {
  it("Should pass and return next if method is not covered", async () => {
    const { req, res, next } = mockExpress;

    req.method = "DELETE";

    await middleware(req, res, next);

    expect(next).toBeCalledTimes(1);
  });

  it("Should return status 200 if already response cached", async () => {
    const { req, res, next } = mockExpress;
    const cacheResponse = { name: "User" };

    cache.get = jest.fn().mockReturnValue(cacheResponse);

    req.method = "GET";

    await middleware(req, res, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(cacheResponse);
  });

  it("Should return next if cache is empty", async () => {
    const { req, res, next } = mockExpress;

    cache.get = jest.fn().mockReturnValue(null);

    req.method = "GET";

    await middleware(req, res, next);

    expect(next).toBeCalledTimes(1);
  });
});
