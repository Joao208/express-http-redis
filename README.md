```js
import { Cache, middleware, ICache } from "express-http-redis";

new Cache({
  host: process.env.HOST,
  port: process.env.PORT,
  keyPrefix: process.env.KEYPREFIX,
  password: process.env.PASSWORD,
});

app.use(middleware);
```
