import { Layout } from '~/components'

export const EmptyLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.BackButton />} />
    {children}
  </Layout.Main>
)
