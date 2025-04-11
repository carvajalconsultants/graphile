import "graphile-config";
import "graphile-build";
import "graphile-build-pg";

/**
 * A Graphile plugin that simplifies the naming of order-by-related column enums in GraphQL.
 * This plugin makes the generated GraphQL enum names more concise and readable by removing
 * redundant table prefixes from related column ordering enums.
 *
 * For example, it transforms:
 * - USER_BY_UPDATED_BY_ID__ROW_ID_ASC → UPDATED_BY__ROW_ID_ASC
 * - ACCOUNT_BY_ACCOUNT_ID__NAME_ASC → ACCOUNT__NAME_ASC
 *
 * This makes the GraphQL schema more maintainable and the generated queries more readable
 * while preserving the full ordering functionality.
 */
export const RelatedOrderByInflectorPlugin: GraphileConfig.Plugin = {
  name: "RelatedOrderByInflectorPlugin",
  version: "0.0.1",

  inflection: {
    replace: {
      orderByRelatedColumnEnum: (previous, options, details) => {
        // Get the original enum name using the previous function
        const enumValue = previous!(details);

        return enumValue.replace(/^.*?_BY_([^_]+(?:_[^_]+)*)_ID(__.*)$/, "$1$2");
      },
    },
  },
};
