import { alreadyAdded, cache } from "../../src/index";

describe("[alreadyAdded] Test case", () => {
  it("Should delete key if key already exists", async () => {
    const key = "user : 1";

    cache.get = jest.fn().mockReturnValue("User");
    cache.delete = jest.fn();

    await alreadyAdded(key);

    expect(cache.get).toBeCalledWith(key);
    expect(cache.delete).toBeCalledWith(key);
  });

  it("Should dont delete key if key does not exist", async () => {
    const key = "user : 1";

    cache.get = jest.fn().mockReturnValue("");
    cache.delete = jest.fn();

    await alreadyAdded(key);

    expect(cache.get).toBeCalledWith(key);
    expect(cache.delete).not.toBeCalled();
  });
});
