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
```

Playwright target variables:

```bash
PLAYWRIGHT_TEST_BASE_URL=<web-url>
PLAYWRIGHT_TEST_API_URL=<graphql-url>
```

The E2E workflow already uses a Vercel preview URL as `PLAYWRIGHT_TEST_BASE_URL` and uploads the Playwright HTML report.

## Environment Targets

| Layer | Web URL | GraphQL URL | Default Policy |
| --- | --- | --- | --- |
| Preview | Vercel preview URL | Usually `https://server.matters.icu/graphql` | PR-level browser regression with test accounts. |
| Staging | `https://matters.icu` | `https://server.matters.icu/graphql` | Full acceptance; disposable staging mutation data is allowed. |
| Production | `https://matters.town` | `https://server.matters.town/graphql` | Read-only smoke by default. |

Production tests must not create articles, update settings, run admin actions, touch payments, change moderation state, or send outbound federation unless explicit human approval is recorded.

## Recommended Tag Model

Existing specs should be tagged before they are used as an automated release gate across staging and production.

| Tag | Meaning | Production Default |
| --- | --- | --- |
| `@smoke` | Read-only core route and rendering checks. | Allowed. |
| `@auth-smoke` | Login/session checks using safe test accounts. | Approval required. |
| `@regression` | Broader user journeys. | Usually not run on production. |
| `@mutation` | Creates or edits content/settings. | Not allowed by default. |
| `@admin` | Staff/admin permission checks. | Not allowed by default. |
| `@payment` | Payment/support flow. | Not allowed by default. |
| `@feature:<name>` | Feature-specific checks. | Depends on other tags. |

Suggested first pass:

| File | Suggested Tags | Notes |
| --- | --- | --- |
| `tests/homepage.spec.ts` | `@smoke` | Good production read-only candidate. |
| `tests/authentication.spec.ts` | `@auth-smoke`, `@mutation` for OTP/account creation | Account creation must not run on production by default. |
| `tests/commentArticle.spec.ts` | `@mutation` | Staging only by default. |
| `tests/supportArticle.spec.ts` | `@payment`, `@mutation` | Needs payment test boundary and approval. |
| `tests/mutateUser.spec.ts` | `@mutation` | Staging only by default. |
| `tests/switchBetweenUsers.spec.ts` | `@auth-smoke`, `@regression` | Production only with approved test accounts. |

## Proposed Scripts

These are the intended next scripts once tags are added:

```json
{
  "test:e2e:smoke": "playwright test --grep @smoke",
  "test:e2e:staging": "playwright test --grep \"@smoke|@auth-smoke|@regression\"",
  "test:e2e:mutation": "playwright test --grep @mutation",
  "test:e2e:prod-smoke": "playwright test --grep @smoke --grep-invert \"@mutation|@admin|@payment\""
}
```

Do not add production mutation scripts unless the workflow also enforces an explicit approval flag.

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
