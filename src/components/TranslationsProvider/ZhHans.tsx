import TRANSLATIONS_ZH_HANS from '@/compiled-lang/zh-Hans.json'

const TranslationsZhHansProvider = ({
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
        messages: TRANSLATIONS_ZH_HANS as unknown as Record<string, string>,
      })}
    </>
  )
}

export default TranslationsZhHansProvider
