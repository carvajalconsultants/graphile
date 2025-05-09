import { PgOrderByRelatedPlugin } from "@graphile-contrib/pg-order-by-related";
import { PgSimplifyInflectionPreset } from "@graphile/simplify-inflection";
import { PostGraphileAmberPreset } from "postgraphile/presets/amber";

import { RelatedOrderByInflectorPlugin } from "./RelatedOrderByInflectorPlugin";

import type { GraphileConfig } from "graphile-config";

/**
 * PostGraphile configuration preset that sets up a standard configuration for CCI applications.
 *
 * This configuration enables:
 * - Simplified database schema naming
 * - Order-by-related column enums
 * - Disable null returns in custom query functions
 * - Disable simple lists because we use pagination
 * - Disable delete, insert, update for all tables
 * - Enable cursor pagination for all custom queries
 */
export const GraphileCarvajalPreset: GraphileConfig.Preset = {
  extends: [PostGraphileAmberPreset, PgSimplifyInflectionPreset],
  plugins: [PgOrderByRelatedPlugin, RelatedOrderByInflectorPlugin],

  grafast: {
    explain: false,
  },

  gather: {
    /**
     * Makes all function arguments required unless they have a DEFAULT.
     */
    pgStrictFunctions: true
  },

  schema: {
    /**
     * Enforces strict null handling in database functions for better data reliability
     * This prevents unexpected null values from propagating through the system
     */
    pgForbidSetofFunctionsToReturnNull: true,

    /**
     * This alters the default behavior for all tables, queries, etc.
     *
     * Enable cursor pagination for all custom queries.
     * Enable sorting for all custom queries.
     * Disable simple lists because use pagination.
     */
    defaultBehavior: "-connection +order -list -delete -insert -update -single",
  },
};
