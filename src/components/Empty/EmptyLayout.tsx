import { Layout } from '~/components'

export const EmptyLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <Layout.Main>
    <Layout.Header />
    {children}
  </Layout.Main>
)
