```js
import { Cache, middleware } from "express-http-redis";
import { ICache } from "express-http-redis/types";

new Cache({
  host: process.env.HOST,
  port: process.env.PORT,
  keyPrefix: process.env.KEYPREFIX,
  password: process.env.PASSWORD,
});

app.use(middleware);
```
