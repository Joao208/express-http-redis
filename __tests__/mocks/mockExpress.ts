import { Response, Request } from "express";

const mockExpressRes = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.on = jest.fn().mockReturnValue(res);
  return res;
};

export default {
  res: mockExpressRes(),
  next: jest.fn(),
  req: {
    body: {},
    params: {},
    headers: { authorization: "" },
    query: {},
    url: "",
  } as Request,
};
