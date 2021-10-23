## Express Http Redis

How to use:

```js
import "dotenv/config";

import express from "express";
import "express-async-errors";
import cors from "cors";
import http from "http";
import responseTime from "response-time";
import { cache, Cache, middleware, createKeyString } from "..";

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
  keys: ["params.id", "keys.number"],
});

app.post("/:id", middleware, (req, res) => {
  const users = { id: 10, name: "User" };

  cache.post(createKeyString(req), { data: users });

  return res.json("ok");
});

app.delete("/:id", middleware, (req, res) => {
  cache.delete(createKeyString(req));

  return res.json("ok");
});

app.delete("/", middleware, (req, res) => {
  cache.delete(createKeyString(req));
  return res.json("ok");
});

server.listen(port, () => {
  console.log(`We are live on ${port}`);
  console.log(`Environment: staging`);
});
```
