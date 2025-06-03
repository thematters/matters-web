import TRANSLATIONS_ZH_HANT from '@/compiled-lang/zh-Hant.json'

const TranslationsZhHantProvider = ({
  children,
}: {
  children: ({
    messages,
  }: {
    messages: Record<string, string>
  }) => React.ReactNode
}) => {
  return (
    <>
      {children({
        messages: TRANSLATIONS_ZH_HANT as unknown as Record<string, string>,
      })}
    </>
  )
}

export default TranslationsZhHantProvider
