# CCI Graphile Preset

Establishes a standard config for Graphile across our applications.

Install the preset with:

```
yarn add postgraphile@beta @graphile-contrib/pg-order-by-related@beta @graphile/simplify-inflection@beta @carvajalconsultants/graphile
```

Now your graphile.config.ts file should look something like:

```
import "postgraphile"; // To import the TypeScript types

import { makePgService } from "postgraphile/adaptors/pg";
import { GraphileCarvajalPreset } from "@carvajalconsultants/graphile"

import type { GraphileConfig } from "graphile-config";

const preset: GraphileConfig.Preset = {
  extends: [GraphileCarvajalPreset],

  grafserv: {
    port: 5678,
    graphiql: true,
    watch: true,
    graphqlPath: "/api/graphql",
    eventStreamPath: "/api/graphql",
  },

  /**
   * Database connection configuration that specifies which schemas contain
   * our business logic and data models.
   */
  pgServices: [
    makePgService({
      connectionString: process.env.POSTGRES_CONNECTION_STRING,

      schemas: ["app_public"],
    }),
  ],
};

export default preset;
```
