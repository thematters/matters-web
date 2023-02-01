export type MessageConfig = Record<string, string>

export default async function loadI18nMessages(
  locale: string,
  defaultLocale = 'zh_Hant'
) {
  if (locale === defaultLocale) {
    return {}
  }

  try {
    return import(`@/compiled-lang/${locale.toLocaleLowerCase()}.json`).then(
      (module) => module.default
    )
  } catch (error) {
    throw new Error(
      'Could not load compiled language files. Please run "npm run i18n:compile" first"'
    )
  }
}
