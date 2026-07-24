# E2E Release Evaluation

This document explains how `matters-web` Playwright tests fit into the shared Matters release-evaluation standard.

The full standard lives in `thematters/matters-release-evaluation-agent`. This repo keeps the product-specific E2E entry points and environment details.

## Core Rule

Do not treat CI success, staging success, production deployment, and production approval as the same gate.

For `matters-web`, report these separately:

- Build and unit test status.
- Playwright E2E status.
- Preview URL result.
- `matters.icu` staging acceptance result.
- Production approval state.
- `matters.town` production smoke result.

## Required Role Matrix

Every staging acceptance and production smoke must include three viewer states:

| Viewer State           | Required Checks                                                                 |
| ---------------------- | ------------------------------------------------------------------------------- |
| Logged-out visitor     | Homepage, article page, and public profile render without GraphQL auth errors.  |
| Normal logged-in user  | Homepage, article page, public profile, notifications entry, and own draft/settings pages render without GraphQL auth errors. |
| Admin or staff account | Admin-only controls render only in admin view and do not leak into normal web.   |

This matrix is required even when the feature under release targets only admins or a trusted group. Global viewer queries, navigation, and shared dropdowns can still affect normal users.

## GraphQL Permission Boundary

Frontend queries that run in normal web routes must not read `oss` fields or other admin-only schema fields. In particular:

- Do not use `viewer.oss`, `user.oss`, `article.oss`, `comment.oss`, or `moment.oss` in shared viewer initialization or normal user routes.
- Do not use `UserFeatureFlagType` as a frontend permission source outside admin-only management surfaces.
- For a normal-user UI gate, use a public-safe field or add a dedicated safe GraphQL field on the server.
- Server mutations must still perform the final permission check; frontend gating is only presentation.

Admin-only `oss` queries are allowed only when both conditions are true: the component is rendered behind `NEXT_PUBLIC_ADMIN_VIEW === 'true'`, and the viewer is checked as admin before the component is mounted.

## Existing E2E Surface

- Specs: `tests/*.spec.ts`
- Playwright config: `playwright.config.ts`
- Auth setup: `tests/sessions.setup.ts`
- GitHub Actions workflow: `.github/workflows/test_e2e.yml`

Useful commands:

```bash
npm run test:unit
npm run build
npm run test:e2e
npm run test:e2e:smoke
npm run test:e2e:staging
npm run test:e2e:mutation
npm run test:e2e:prod-smoke
```

Playwright target variables:

```bash
PLAYWRIGHT_TEST_BASE_URL=<web-url>
PLAYWRIGHT_TEST_API_URL=<graphql-url>
```

The E2E workflow already uses a Vercel preview URL as `PLAYWRIGHT_TEST_BASE_URL` and uploads the Playwright HTML report.

## GitHub Actions Profiles

`.github/workflows/test_e2e.yml` supports the existing Vercel preview webhook and manual release-evaluation runs.

The preview webhook can keep sending:

| Input                | Purpose                |
| -------------------- | ---------------------- |
| `vercel_preview_url` | Preview web URL.       |
| `pr_number`          | PR number to comment.  |
| `pr_sha`             | Commit SHA for status. |

Manual release-evaluation runs can also provide:

| Input                          | Values                                                  | Notes                                                                      |
| ------------------------------ | ------------------------------------------------------- | -------------------------------------------------------------------------- |
| `target_env`                   | `preview`, `staging`, `production`                      | Defaults to `preview`.                                                     |
| `test_profile`                 | `default`, `smoke`, `staging`, `mutation`, `prod-smoke` | Defaults to the existing full E2E behavior.                                |
| `base_url`                     | Any web URL                                             | Optional. Defaults to preview URL, `matters.icu`, or `matters.town`.       |
| `api_url`                      | Any GraphQL URL                                         | Optional. Defaults to the workflow secret, staging API, or production API. |
| `production_mutation_approved` | `true` or `false`                                       | Must be `true` before production can run anything except `prod-smoke`.     |

Production runs without explicit mutation approval are restricted to `test_profile=prod-smoke`.

## Environment Targets

| Layer      | Web URL                | GraphQL URL                                  | Default Policy                                                |
| ---------- | ---------------------- | -------------------------------------------- | ------------------------------------------------------------- |
| Preview    | Vercel preview URL     | Usually `https://server.matters.icu/graphql` | PR-level browser regression with test accounts.               |
| Staging    | `https://matters.icu`  | `https://server.matters.icu/graphql`         | Full acceptance; disposable staging mutation data is allowed. |
| Production | `https://matters.town` | `https://server.matters.town/graphql`        | Read-only smoke by default.                                   |

Production tests must not create articles, update settings, run admin actions, touch payments, change moderation state, or send outbound federation unless explicit human approval is recorded.

Production smoke should assert visible page state, not network quiescence. Public production pages may keep analytics, ads, or other long-running requests open, so `networkidle` alone is not a reliable health signal.

## Recommended Tag Model

Existing specs are tagged so they can be selected as automated release gates across preview, staging, and production.

| Tag               | Meaning                                        | Production Default             |
| ----------------- | ---------------------------------------------- | ------------------------------ |
| `@smoke`          | Read-only core route and rendering checks.     | Allowed.                       |
| `@auth-smoke`     | Login/session checks using safe test accounts. | Approval required.             |
| `@regression`     | Broader user journeys.                         | Usually not run on production. |
| `@mutation`       | Creates or edits content/settings.             | Not allowed by default.        |
| `@admin`          | Staff/admin permission checks.                 | Not allowed by default.        |
| `@payment`        | Payment/support flow.                          | Not allowed by default.        |
| `@feature:<name>` | Feature-specific checks.                       | Depends on other tags.         |

Current first pass:

| File                               | Suggested Tags                                      | Notes                                                              |
| ---------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------ |
| `tests/homepage.spec.ts`           | `@smoke`, `@regression`                             | Keep production smoke to critical page/feed rendering only; sidebar shuffle and other volatile controls belong in regression. |
| `tests/authentication.spec.ts`     | `@auth-smoke`, `@mutation` for OTP/account creation | Account creation must not run on production by default.            |
| `tests/commentArticle.spec.ts`     | `@mutation`                                         | Staging only by default.                                           |
| `tests/supportArticle.spec.ts`     | `@payment`, `@mutation`                             | Needs payment test boundary and approval.                          |
| `tests/mutateUser.spec.ts`         | `@mutation`                                         | Staging only by default.                                           |
| `tests/switchBetweenUsers.spec.ts` | `@auth-smoke`, `@regression`, `@mutation`           | Sends comments, so production is blocked by default.               |
| `tests/mutateArticle.spec.ts`      | `@mutation`                                         | Currently ignored by Playwright config, but tagged for future use. |

## Tagged Scripts

These scripts select tagged test profiles:

```json
{
  "test:e2e:smoke": "playwright test --grep @smoke --no-deps",
  "test:e2e:staging": "playwright test --grep \"@smoke|@auth-smoke|@regression\"",
  "test:e2e:mutation": "playwright test --grep @mutation",
  "test:e2e:prod-smoke": "playwright test --grep @smoke --grep-invert \"@mutation|@admin|@payment\" --no-deps"
}
```

Do not add production mutation scripts unless the workflow also enforces an explicit approval flag.

`--no-deps` is intentional for read-only smoke profiles. The default Chromium project depends on `tests/sessions.setup.ts`, and that setup logs in and updates test account language through `PLAYWRIGHT_TEST_API_URL`. Production read-only smoke must avoid that setup unless explicit production account mutation approval exists.

## Example Runs

Preview:

```bash
PLAYWRIGHT_TEST_BASE_URL=<vercel-preview-url> \
PLAYWRIGHT_TEST_API_URL=https://server.matters.icu/graphql \
npm run test:e2e
```

Staging:

```bash
PLAYWRIGHT_TEST_BASE_URL=https://matters.icu \
PLAYWRIGHT_TEST_API_URL=https://server.matters.icu/graphql \
npm run test:e2e
```

Production read-only smoke after tags are implemented:

```bash
PLAYWRIGHT_TEST_BASE_URL=https://matters.town \
PLAYWRIGHT_TEST_API_URL=https://server.matters.town/graphql \
npm run test:e2e:prod-smoke
```

## Required Release Report Evidence

Every release evaluation should record:

- Target web URL.
- Target GraphQL URL.
- Branch, PR, or commit under test.
- Commands run.
- Playwright report path or URL.
- Browser-visible evidence for UI changes.
- Created staging data IDs or URLs, if any.
- Blockers classified as code, environment, credential, data, deploy, external platform, or approval.
- Whether production approval has been requested or granted.

## Stop Conditions

Stop and report a blocker when:

- Preview cannot load.
- Required GraphQL fields or mutations are missing.
- The Playwright base URL points to production while the selected test creates or edits data.
- Test accounts or credentials are missing.
- A production-risk action is required but no explicit approval exists.
