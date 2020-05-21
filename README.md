# DENO SERVER TEST PROJECT

## APP WITH NO DB CONN

Plain json manipluation

```bash
    deno run --allow-net src/no-db/config/app.ts
```

## APP WITH DB CONN

mongodb plugin

```bash

    NODE_ENV="development" deno run -A --unstable --allow-net --allow-write --allow-plugin --allow-env --allow-read src/with-db/config/app.ts
```
