## Express Http Redis

By using this library your requests time is reduced by 80% <br>
The library intercepts the get requests and returns the response that was saved in its cache.
For use, you need the host, port, key prefix and password of Redis, and keys (Keys are one string with the path of params for lib used to create key).

Example of using keys

```js
['query.id','params.route'] // key: `${req.query.id} : ${req.params.route}`
['params.id'] // key: `${req.params.id}`
['url'] // key: `${req.url}`
```

Middleware can be used globally or in just one route, for example <br>
The problem with using middleware with global status is that the library cannot access req.params

```js
app.use(middleware)

// or

app.get("/", middleware, (req, res) => {
  return res.json("ok");
})
```

But how does the construction of keys work? <br>
The keys are built in the pattern: parameter1 : parameter2 : parameter3... <br>
But you don't need to keep building the key whenever you need to query or create a cache, you can use the `createKeyString` function exported from the library, passing only the req
An example of use

```js
cache.delete(createKeyString(req));
```

The library also exports all used interfaces, you can access it in the two ways below

```js
import { ICache, IInit, IObj } from "express-http-redis";

// or

import { ICache, IInit, IObj } from "express-http-redis/types";
```

Inside the `cache` export there are 3 methods: `delete`, `post`, `get`

```js
cache.post(createKeyString(req), {});

cache.delete(createKeyString(req));

cache.get(createKeyString(req))
```

The full use of the library looks like this:

```js
import "dotenv/config";

import express from "express";
import "express-async-errors";
import cors from "cors";
import http from "http";
import responseTime from "response-time";
import { cache, Cache, middleware, createKeyString } from "express-http-redis";

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
