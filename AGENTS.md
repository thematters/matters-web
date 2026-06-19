## Basic

a. Never speculate. Investigate and confirm the facts before writing any code.
b. Related Matters repositories for reference are at https://github.com/orgs/thematters/repositories
c. If a requirement is ambiguous, or the existing architecture cannot solve the problem elegantly, ask the
developer first instead of modifying core low-level modules on your own.

## Development

a. TypeScript is the primary language; write components as function components with arrow functions.
b. Do not write an if-else on a single line.
c. Write comments in English and only on the important parts. Keep them short and clear; avoid over-commenting.
d. After every change, run lint and format, including tsc type check, next lint and stylelint.
e. After every change, add or update the matching vitest unit test or playwright e2e test and make sure they pass.
f. Install non-essential packages as devDependencies to keep them out of runtime; lint, prettier, test tools
such as vitest and playwright, storybook and other design or build tooling must not appear in dependencies.

## Imports

a. Use the path aliases ~/ for src and @/ for the project root; a parent reference such as ../ is fine, but
avoid deep relative paths.
b. Import and export order is sorted automatically by simple-import-sort; do not reorder by hand.

## GraphQL and codegen

a. Types are generated into src/gql/graphql.ts; do not edit it by hand, it is ignored by eslint.
b. Before making changes, sync to the latest schema as much as possible first.
c. After changing a query or mutation, run gen:type to regenerate the types.
d. Write operations with gql and split them with fragments where it helps.

## i18n

a. Use react-intl FormattedMessage or intl.formatMessage for all copy; do not hardcode strings.
b. Every message needs a defaultMessage and an auto-generated id; the formatjs eslint rules enforce this.
c. After changing copy, run i18n to re-extract, generate and compile.

## Styling

a. Style with CSS Modules, one styles.module.css per component, referencing classes through the styles object;
avoid inline styles.
b. Follow the stylelint rules; order properties by recess-order.
c. Reuse the design system's existing CSS as much as possible; do not duplicate the same styles in
styles.module.css.

## Component structure

a. One folder per component, containing index.tsx, styles.module.css and the test file.
b. Name components in PascalCase.
c. When adding a feature, reuse existing components as much as possible; do not rebuild similar components
inside a new page.
d. Prevent a single component rerender from rerendering the whole list or page; use React mechanisms such as
memo, useMemo, useCallback and stable keys.

## Data and state

a. Fetch server data through Apollo Client useQuery and useMutation; do not fetch on your own.
b. Mind cache consistency after a change; use refetch or a cache update when needed.

## Error handling

a. Report unexpected errors to Sentry, handle errors in the UI, and never swallow them silently.
b. Do not show raw error messages to users; display a friendly message and log the details to the log or Sentry.

## Security

a. Never hardcode passwords, API keys or any sensitive information.
b. Only use the NEXT*PUBLIC* prefix for environment variables that must be exposed to the browser; never prefix
sensitive values.
c. When reporting errors to Sentry, filter or mask sensitive data so keys, tokens or personal data are not sent
with the error.

## Git

a. General feature development and fixes
a1. Branch off the develop branch and make changes on that branch.
a2. Before git push, sync with develop so conflicts are found and resolved first.
a3. When conflicts appear, do not revert on your own even if you are sure the revert is safe; ask the
developer first.
b. Hotfix
b1. If the change is based on the master branch, cherry-pick it onto the develop branch.
c. Commit message
c1. Follow Conventional Commits, such as feat:, fix: and docs:.
