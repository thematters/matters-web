import TRANSLATIONS_EN from '@/compiled-lang/en.json'

const TranslationsEnProvider = ({
  children,
}: {
  children: ({
    messages,
  }: {
    messages: Record<string, string>
  }) => React.ReactNode
}) => {
  return <>{children({ messages: TRANSLATIONS_EN as any })}</>
}

export default TranslationsEnProvider
