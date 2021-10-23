import "dotenv/config";

import express from "express";
import "express-async-errors";
import cors from "cors";
import http from "http";
import responseTime from "response-time";
import { cache, Cache, middleware } from "..";

const port = 5000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(
  responseTime((req, res, time) => {
    console.log(`${req.method} ${req.url} ${time}`);
  })
);

new Cache({
  host: process.env.HOST,
  port: process.env.PORT,
  keyPrefix: process.env.KEYPREFIX,
  password: process.env.PASSWORD,
});

app.use(middleware);

app.all("/", (req, res) => {
  const users = [{ id: 10, name: "User" }];

  cache.post(req.url, { data: users });
  return res.json("ok");
});

server.listen(port, () => {
  console.log(`We are live on ${port}`);
  console.log(`Environment: staging`);
});
