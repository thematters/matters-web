// mostly are MIT License code from
// https://github.com/marsidev/react-turnstile/tree/main/packages/lib/src
// after migrated to React 18, this directory can be dropped to use `@marsidev/react-turnstile` instead

export * from './lib'
export type {
  TurnstileInstance,
  TurnstileLangCode,
  TurnstileProps,
  TurnstileServerValidationErrorCode,
  TurnstileServerValidationResponse,
  TurnstileTheme,
} from './types'
export {
  DEFAULT_CONTAINER_ID as TURNSTILE_DEFAULT_CONTAINER_ID,
  DEFAULT_ONLOAD_NAME as TURNSTILE_DEFAULT_ONLOAD_NAME,
  DEFAULT_SCRIPT_ID as TURNSTILE_DEFAULT_SCRIPT_ID,
  SCRIPT_URL as TURNSTILE_SCRIPT_URL,
} from './utils'
