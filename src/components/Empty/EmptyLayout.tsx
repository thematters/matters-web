import { Layout } from '~/components'

export const EmptyLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.BackButton />} />
    {children}
  </Layout.Main>
)
